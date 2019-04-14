[[ -z "${WMY_USER}" ]] && WMY_USER=$1 || WMY_USER="$WMY_USER"
[[ -z "${WMY_HOST}" ]] && WMY_HOST=$2 || WMY_HOST="$WMY_HOST"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/../"

echo "Syncing files to $WMY_USER@$WMY_HOST";
rsync -r --exclude="node_modules/" --exclude="./docs" --rsync-path="mkdir -p ~/water-my-yard && rsync" $DIR $WMY_USER@$WMY_HOST:~/water-my-yard
echo "Installing Water My Yard";
ssh $WMY_USER@$WMY_HOST "~/water-my-yard/scripts/install.sh"