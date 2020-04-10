$(document).ready(function() {
  const date = new Date();
  const Month = date.getMonth() + 1;
  const Year = date.getFullYear();

  $('form').on('DOMSubtreeModified', '.t-input-block_inited-date-picker', function() {
    $('.today').prevAll('tbody tr>td').addClass('pastDay');
    $('.today').parent('tr').prevAll('tr').addClass('pastDay');

    $('.today').addClass('pastDay');

    const foundValue = ['17', '18', '19'];
    // after one week
     findDateAndDoAction($('.today').parent('tr').next('tr').next('tr'), foundValue, (td) => {
      td.addClass('pastDay');
    });
    // next week
    findDateAndDoAction($('.today').parent('tr').next('tr'), foundValue, (td) => {
      td.addClass('pastDay');
    });
    // this week
    findDateAndDoAction($('.today').parent('tr'), foundValue, (td) => {
      td.addClass('pastDay');
    });
    
    var picM = $('select.dp-select-month option:selected').val();
    var picD = $('select.dp-select-year option:selec2ted').val();
    if (picM < Month && (picD <= Year || picD < Year)) {
      $('.cal-month tr').addClass('pastDay');
    }
  });
})

function findDateAndDoAction(parent, foundValues, callback) {
  $.each(parent, function(i, it) {
    var $this = $(this);
    var $items = $this.find("td");

    $.each($items, function(index, item) {
    
      var $this = $(this);
			console.log($(this).text())
      if (foundValues.includes($(this).text())) {
        var $thisTd = $(this);
        callback($thisTd)
      }
    })
  });
}

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

function hideAllnextWeeks() {
  $('.today').nextAll('tbody tr>td').addClass('pastDay');
  $('.today').parent('tr').next().nextAll('tr').addClass('pastDay');
}

function hideNextAfterTodayElements() {
  if ($('.today').is(':last-child')) {
    markNextElements($('.today').parent('tr').next(), 2);
  } else if ($('.today').next().is(':last-child')) {
    markNextElements($('.today').parent('tr').next(), 1);
  } else if ($('.today').next().next().is(':last-child')) {
    markNextElements($('.today').parent('tr').next(), 0);
  } else {
    markNextElements($('.today').parent('tr').next(), 0);
  }
}

