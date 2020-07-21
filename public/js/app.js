/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

// ----------------------------------------------
// JQUERY 
// ----------------------------------------------

// $(document).ready(function(){
//   // Hide template on load
//   console.log('I worked');
//   $("#helloWorld").hide();
//   });

// $(function() {
//   let container = $('#editTemplate');
//       container.hide();
// });

// $('#detailsButton').click(function() {
//   $('#helloWorld').toggle();
// });

// let $button = $('#detailsButton');
// $button.on('click', hideFunction(event)
// );

// function hideFunction(event){
//   event.preventDefault();
//   $('#editTemplate').toggle(display);
//   }
