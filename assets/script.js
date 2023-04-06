// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentHour = dayjs().format('hh');
var currentPeriod = dayjs().format('A');  
var currentDay = dayjs().format('MMM-D-YYYY'); 
var hoursContainerEl = document.querySelector('.container-fluid.px-5'); 

console.log(currentDay); 

var displayHour = function (hour, period, status) {
  var hourID="hour-"+hour+period;
  var hourContainerEl = document.createElement('div');
  hourContainerEl.setAttribute("id", hourID); 
  hourContainerEl.classList = 'row time-block ' + status;

  var hourEl = document.createElement('div');
  hourEl.classList = 'col-2 col-md-1 hour text-center py-3';
  hourEl.textContent = hour+period; 

  hourContainerEl.appendChild(hourEl);

  var textAreaEl = document.createElement("textarea");
  textAreaEl.classList = "col-8 col-md-10 description";
  textAreaEl.rows = 3; 
  textAreaEl.textContent = localStorage.getItem(hourID);

  hourContainerEl.appendChild(textAreaEl);

  var saveButtonEL = document.createElement('button');
  saveButtonEL.classList = "btn saveBtn col-2 col-md-1";
  saveButtonEL.id = "save";
  saveButtonEL.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';
  
  hourContainerEl.appendChild(saveButtonEL);
  return hourContainerEl;
}

for (let x =0; x < 2; x++){
  for (let i = 1; i < 13; i++){
    var period = 'PM'; 
    if (x === 0 && i !== 12){
      period = 'AM'
    } else if ( x === 1 && i === 12){
      period = "AM"
    }
    
    var currentStatus = 'future'; 
    if (currentPeriod === 'PM' && period ==='AM' && i !== 12 ){
      currentStatus = 'past'; 
    } else if (currentPeriod === period ) {
      if (currentHour > i ){  
        currentStatus = 'past'; 
      } else if (currentHour == i) {
        currentStatus = 'present'; 
      } else if (currentHour != i && i === 12 ){
        currentStatus = 'past'; 
      }
    
    } 
    
    display = displayHour(i, period, currentStatus);
    hoursContainerEl.appendChild(display);
  }
}
var saveInput = function (event) {

   const hourID = $(this).parent().attr('id');
   const description = $(this).prev().val(); 
   localStorage.setItem(hourID, description);  
 };

$(function () {         
  $('.saveBtn').on('click', saveInput); 
});

$(function() {
  $('#currentDay').text(currentDay); 
})
