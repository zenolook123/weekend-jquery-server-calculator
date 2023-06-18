$(document).ready(onReady)
operatorSelected = event.target.id

function onReady() {
    operatorSelected = 0
    pageRefresh()

    $('#add').on('click', setOperator)
    $('#subtract').on('click', setOperator)
    $('#multiply').on('click', setOperator)
    $('#divide').on('click', setOperator)
    $('#submit').on('click',calculate)
    $('#clear').on('click', clearItem)
    $('#clear-history').on('click', clearHistory)
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
        const number1 = $("#input-1").val();
        const number2 = $("#input-2").val();
       
        if (operatorSelected == "add"){
            operatorSelected = '+'
        }
        if (operatorSelected == "subtract"){
            operatorSelected = '-'
        }
        if (operatorSelected == "multiply"){
            operatorSelected = '*'
        }
        if (operatorSelected == "divide"){
            operatorSelected = '/'
        }

        if (operatorSelected != 0 && number1 != "" && number2 != '') {
                $("#calculated-number").empty()
                $("#calculated-number").append(response[response.length - 1])
                $("#number-history").append(`<li>${number1} ${operatorSelected} ${number2} = ${response[response.length - 1]}</li>`)
                postToCompletedCalculations(number1,number2,operatorSelected,response[response.length - 1])
                console.log("Function Pushed to Page")
                $("#input-1").val('');
                $("#input-2").val(''); 
        } 
    }).catch(function(error) {
        alert(`request failed`, error)
    }
    )
}

function postToCompletedCalculations(number1,number2,operatorSelected,final) {
    $.ajax({
        method: 'POST',
        // The URL should match the server route where the request will be handled
        url: '/completedEquationsHistory',
        data: {
            completedEquation: {
                numberinput: number1,
                numberinput2: number2,
                operation: operatorSelected,
                total:final
            }
        }
    }).then(function(response) {
        console.log("Success Pushed To completed equations!", response);
    }).catch(function(error) {
        alert("Something went wrong. Please try again later.");
        console.log(error);
    });
}
function pageRefresh() {
    $.ajax({
        method: 'GET',
        url: '/completedEquationsHistory' 
    }).then(function(response){
       for (object of response) {
        console.log(object)
        $("#number-history").append(`<li>${object.numberinput} ${object.operation} ${object.numberinput2} = ${object.total}</li>`)
       }
       $("#calculated-number").append('Type in the inputs above and get calculating!')
    }).catch(function(error) {
        alert(`request failed`, error)
    }
    )
}

function clearHistory() {
    $.ajax({
        url: '/completedEquationsHistory',
        type: 'DELETE',
        success: function(result) {
            console.log("Success deleting history")
        }
    });
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
