$(document).ready(() => {

const setActivatedSprinkler = (sprinkler) => {
  const card = $(`#sprinkler-${sprinkler.id}`);

  card.find('.header > i').addClass('blue');
  $(`#${sprinkler.id}`).attr('active', true).addClass('blue').text('Deactivate');
}

const setDeactivatedSprinkler = (sprinkler) => {
  const card = $(`#sprinkler-${sprinkler.id}`);

  card.removeClass('blue');
  card.find('.header > i').removeClass('blue');
  $(`#${sprinkler.id}`).attr('active', false).removeClass('blue').text('Activate');
}

$('.sprinkler-toggle').click(function() {
  const active = $(this).attr('active') === "true";
  const id     = $(this).attr('id');

  if ( active ) {
    $.getJSON(`/api/sprinkler/${id}/deactivate`)
      .done(setDeactivatedSprinkler)
      .reject(console.error);
  }
  else {
    $.getJSON(`/api/sprinkler/${id}/activate`)
      .done(setActivatedSprinkler)
      .reject(console.error);
  }
});

let currentId;
let currentNameEl;
$('#change-name-save').click(function() {
  const name = $('#change-name-value').val();

  if ( !name ) return;

  $.ajax({
    method: 'PUT',
    url: `/api/sprinkler/${currentId}`,
    data: { name }
  })
  .done(() => currentNameEl.text(name));
});

$('.sprinkler-name')
  .on('click', function() {
    currentNameEl = $(this);
    currentId     = $(this).attr('id');
    $('#change-name-value').val($(this).text());
  })
  .popup({
    on: 'click',
    popup: $('#popup-name-change'),
    position: 'bottom center',
  });
});