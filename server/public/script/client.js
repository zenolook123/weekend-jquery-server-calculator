$(document).ready(onReady)
operatorSelected = event.target.id
let functionUsed = undefined
let total = undefined
function onReady() {
    $('#add').on('click', setOperator)
    $('#subtract').on('click', setOperator)
    $('#multiply').on('click', setOperator)
    $('#divide').on('click', setOperator)
    $('#submit').on('click',calculate)
    $('#clear').on('click', clearItem)
}
function setOperator(event){
    operatorSelected = event.target.id
    console.log("operator set")
}
function calculate(){
    console.log("operator is", operatorSelected)
    const number1 = $("#input-1").val();
    const number2 = $("#input-2").val();

    
    $.ajax({
        method: 'POST',
        // The URL should match the server route where the request will be handled
        url: '/mathoperation',
        data: {
            doMath: {
                numberinput: number1,
                numberinput2: number2,
                operation: operatorSelected,
                total:0
            }
        }
    }).then(function(response) {
        console.log("Success!", response);
        $("#input-1").val('');
        $("#input-2").val('');
        refreshAndRender()
    }).catch(function(error) {
        alert("Something went wrong. Please try again later.");
        console.log(error);
    });
}

function refreshAndRender() {
    $.ajax({
        method: 'GET',
        url: '/mathoperation' 
    }).then(function(response){
        $("#number-history").empty()
        $("#calculated-number").empty()
        for (item of response) {
            $("#number-history").append(`<li>${item}</li>`)
        }
            $("#calculated-number").append(item)
  
    }).catch(function(error) {
        alert(`request failed`, error)
    }
    )
}

function clearItem(){
 $("#input-1").val('')
 $("#input-2").val('')
}
//End of render function



// Create a user interface where the user can input two values 
// (2 input elements) and the select type of mathematical operation.
//  When the submit (`=` button) is clicked, capture this input, 
//  bundle it up in an object, and send this object to the server via a POST. 
//  There should also be a 'C' button that will clear the user input fields.

// Build out the server-side logic to compute the numbers as appropriate. 
// The server should be able to handle Addition, Subtraction, Multiplication, 
// and Division. Once the calculation is complete, send back the OK. 
// You should do a GET request after the POST to get the actual calculation.
