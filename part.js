$(document).ready(function() {
  const date = new Date();
  const Month = date.getMonth() + 1;
  const Year = date.getFullYear();

  $('form').on('DOMSubtreeModified', '.t-input-block_inited-date-picker', function() {

    $('.today').prevAll('tbody tr>td').addClass('pastDay');
    $('.today').parent('tr').prevAll('tr').addClass('pastDay');

    var picM = $('select.dp-select-month option:selected').val();
    var picD = $('select.dp-select-year option:selec2ted').val();
    if (picM < Month && (picD <= Year || picD < Year)) {
      $('.cal-month tr').addClass('pastDay');
    }
  })
})

