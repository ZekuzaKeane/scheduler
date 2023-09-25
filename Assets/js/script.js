// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var saveButton = $('.saveBtn');
  var timeBlock = $('.time-block');
  var notif = $('#currentDay');
  var saveNotif = $('<h3>');

  $(document).ready(function() { 

  saveButton.click(function () {
    saveNotif.remove();
    var ID = $(this).parent().attr('id');
    var text = $(this).siblings('textarea');
    var textContent = text.val();
    localStorage.removeItem(ID);
    localStorage.setItem(ID, textContent);
    saveNotif.text('Appointment saved!');
    notif.append(saveNotif);
  })

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var testTime = dayjs().hour();
  function classChecker() {
    timeBlock.each(function() {
      notif.text(dayjs().format('dddd-MMMM-DD'))


      var ID = parseInt($(this).attr('id'));
      if (ID == testTime) {
        $(this).removeClass('past present future').addClass('present');

      }
      else if (ID < testTime) {
        $(this).removeClass('past present future').addClass('past');
      }
      else {
        $(this).removeClass('past present future').addClass('future');
      }
    })
  }

  setInterval(classChecker, 1000);
  
  


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  timeBlock.each(function() {
    var ID = $(this).attr('id');
    var textContent = localStorage.getItem(ID);
    var textArea = $(this).children('textarea');
    if (textContent) {
      textArea.text(textContent);
    }
  })

  // TODO: Add code to display the current date in the header of the page.

})