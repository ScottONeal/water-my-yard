which node &> /dev/null

if [ $? -ne 0 ]; then
  echo "Node.js is not installed checking for nvm"
  exit 1;
fi

echo "Checking for pgpio"
dpkg -s pigpio &>/dev/null
if [ $? -ne 0 ]; then
  echo "pigpio is not installed. please install by running: apt-get install pigpio"
  exit 1
fi

cd $HOME/water-my-yard
echo "Installing npm dependencies"
#npm install 1>/dev/null

echo "Checking for pm2"
which pm2 &>/dev/null

if [ $? -ne 0 ]; then
  echo "pm2 is not installed. installing.."
  npm install -g pm2
fi

pm2 describe water-my-yard &>/dev/null

if [ $? -ne 0 ]; then
  pm2 start server.js --name=water-my-yard
else
  pm2 reload water-my-yard
fi
