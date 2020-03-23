$(document).ready(function() {
  const date = new Date();
  const Month = date.getMonth() + 1;
  const Year = date.getFullYear();

  //  $('form').on('DOMSubtreeModified', '.t-input-block_inited-date-picker', function() {
  $('.today').prevAll('tbody tr>td').addClass('pastDay');
  $('.today').parent('tr').prevAll('tr').addClass('pastDay');

  $('.today').nextAll('tbody tr>td').addClass('pastDay');
  $('.today').parent('tr').next().nextAll('tr').addClass('pastDay');

  $('.today').addClass('pastDay');

  const current = $('.today').text();
  $.each($('.today').parent('tr'), function(i, it) {
    var $this = $(this);
    var $items = $this.find("td");

    $.each($items, function(index, item) {
      var $this = $(this);

      if ($(this).text() === current) {
        var $thisTd = $(this);
        console.log('10')
        $this.removeClass('pastDay')
        $this.each(function() {
          $(this).addClass('pastDay')
        });
        removeClassNextTwoDays($thisTd);
      }
    })
  });
  if ($('.today').is(':last-child')) {
    markNextElements($('.today').parent('tr').next(), 2);
  } else if ($('.today').next().is(':last-child')) {
    markNextElements($('.today').parent('tr').next(), 1);
  } else if ($('.today').next().next().is(':last-child')) {
    markNextElements($('.today').parent('tr').next(), 0);
  } else {
    markNextElements($('.today').parent('tr').next(), 0);
  }

  var picM = $('select.dp-select-month option:selected').val();
  var picD = $('select.dp-select-year option:selec2ted').val();
  if (picM < Month && (picD <= Year || picD < Year)) {
    $('.cal-month tr').addClass('pastDay');
  }
});
//})

function markNextElements(tr, count) {
  $.each(tr, function(i, it) {
    var $this = $(this);
    var $items = $this.find("td").slice(count);

    $.each($items, function(index, item) {
      $(this).addClass('pastDay');
    })
  });
}

function removeClassNextTwoDays(neededTd) {
  if (neededTd.is(':last-child')) {
    $last = neededTd.closest('tr').next('tr').find('td:first-child');
    $last.removeClass('pastDay');

    if ($last.is(':last-child')) {
      $last.closest('tr').next('tr').find('td:first-child').removeClass('pastDay');
    } else {
      $last.closest('td').next('td').removeClass('pastDay');
    }
  } else {
    $last = neededTd.closest('td').next('td');

    $last.removeClass('pastDay');
    if ($last.is(':last-child')) {
      $last.closest('tr').next('tr').find('td:first-child').removeClass('pastDay');
    } else {
      $last.closest('td').next('td').removeClass('pastDay');
    }
  }
}

