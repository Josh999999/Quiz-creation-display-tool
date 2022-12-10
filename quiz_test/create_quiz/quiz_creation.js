//MAIN - Runtime events (UPDATES, DELETES, CREATES of questions, options, etc):
//------------------------------------------------------------------------------------------------


//Create a counter to keep track of the number of questions and create a 
//unique identifier for selecting them.
var question_counter = 1;

//Get document pointer to the neccesary points:
const create_quiz = document.getElementById('create_quiz_container');
const create_questions = document.getElementById('quiz_questions_container');
const question_counter_input = document.getElementById('hidden_counter');
const question_counter2 = question_counter_input.value;


//Data retrieval functions:
//Get all inputs from the choice form and divide them by containers:
const get_inputs = () => {
    return document.querySelectorAll(".quiz_question_choice_container");
}

const questions = () => {
    return document.querySelectorAll(".quiz_question");
}

//Get all text inputs from the page:
const get_text_inputs = () => {
    return document.querySelectorAll("#create_quiz_container input[type='text']");
}


//add a question to the form
function add_question(){
    question_counter++;
    const new_question = "<div class='quiz_question' id='" + question_counter.toString() + 
    "'> <label class='quiz_questions_input_label'>Question " + question_counter.toString() + 
    "</label><input type='text' class='question_question_input'><div class='quiz_question_choice_container'><div class='quiz_question_choice'><input type='text' class='question_choice_input'><input type='button' class='remove_choice' value='delete'" + 
    "onclick='delete_choice(event)'><input type = 'checkbox' class='quiz_isAnser_input 1' onchange='marking_answer(event)'></div><div class='quiz_question_choice'><input type='text' class='question_choice_input'><input type='button' class='remove_choice'" + 
    "value='delete' onclick='delete_choice(event)'><input type = 'checkbox' class='quiz_isAnser_input 1' onchange='marking_answer(event)'></div><input type='button' class='add_choice' value='New option' onclick='add_option(event)'></div><input type='button'" + 
    "class='remove_question' value='delete' onclick='delete_question(event)'></div>"
    create_questions.innerHTML = create_questions.innerHTML + new_question;
}


//add an option to the question:
//No more than 6 options are needed
function add_option(event){
    //Find the number of choices:
    const new_option = "<div class='quiz_question_choice'><input type='text' class='question_choice_input'> " +
    "<input type='button' class='remove_choice' value='delete' onclick='delete_choice(event)'>" +
    "<input type='checkbox' class='quiz_isAnser_input 1' onchange='marking_answer(event)'>" +
    "</div> <input type='button' class='add_choice' value='New option' onclick='add_option(event)'>"

    //Get the the questions choice containers and add the new option:
    const choices_question_container = event.target.parentNode;
    //Make sure that there aren't more than 4 options:
    if(choices_question_container.getElementsByClassName('quiz_question_choice').length == 4){
        alert("You can't have more than 4 options");
        return;
    }

    //Remove the add_option button:
    let add_choice_btn = choices_question_container.parentNode.querySelector(".add_choice");
    choices_question_container.removeChild(add_choice_btn);

    //Add the new option:
    choices_question_container.innerHTML = choices_question_container.innerHTML + new_option;
    return;
}


//Update the questions when once is removed:
function delete_questions_update(){
    i = 0;
    Array.from(document.getElementsByClassName("quiz_question")).forEach(element => {
        i++;
        element.id = i;
        element.getElementsByClassName("quiz_questions_input_label")[0].innerHTML = "Question " + i.toString();
    });

    //Make sure that the counter is equal to i
    //i should be equal to the number of questions on the page
    question_counter = i;
}


//delete a question from the form:
function delete_question(event){
    //Make sure there is at least one question:
    if(create_questions.getElementsByClassName("quiz_question").length <= 1){
        alert("You must have at least one question for this question")
        return;
    } 

    question_counter--;
    //Delete the question from the document:
    const choices_question_container_uppper = event.target.parentNode;
    console.log(choices_question_container_uppper);
    create_questions.removeChild(choices_question_container_uppper);

    //Update the question numbers:
    delete_questions_update();
    return;
}


//delete a choice from the form:
function delete_choice(event){
    console.log(event);
    //Make sure there are enough choices left to delete one.
    const choices_question_container_uppper = event.target.parentNode;
    const choices_question_container = choices_question_container_uppper.parentNode;

    if(choices_question_container.getElementsByClassName('quiz_question_choice').length < 3){
        alert("You must have at least two choices for this question")
        return;
    }

    //Delete the choice from the document:
    choices_question_container.removeChild(choices_question_container_uppper);
}







//Functionality to validate the form:
//------------------------------------------------------------------------------------------------

//Validate all text inputs to make sure they're not null or empty:
function validate_form_text(){
    //Set return variable as you can't return from a forEach loop:
    let return1 = true;
    let error_alert = "";
    //Make sure all the text inputs aren't empty:
    Array.from(get_text_inputs()).forEach((element) => {
        if(element.value == "" || element.value == null && element.id != "hidden_counter"){
            error_alert = "All inputs need to be filled out";
            return1 = false;
        }
    });

    //If there was an error alert the error message:
    if(!return1){
        alert(error_alert);
    }
    return return1;
}


//Create an event so when an answer gets clicked it gets marked and unmarked:
function marking_answer(event){
    //Toggle the answers value between 1 and -1
    //-1 marks an input as an answer
    let class_intval = parseInt(event.target.classList[1]) * -1;
    event.target.classList.replace(event.target.classList[1], class_intval.toString());
}


//Validate the questions to make sure that they have a declared answer and that all:
//choices aren't selected for answer
function validate_form_answer(){
    //Set return variable as you can't return from a forEach loop:
    let return1 = true;
    let error_alert = "";
    //Get the choices sections for each question:
    Array.from(get_inputs()).forEach((element) =>{
        //Go through each questions choices:
        //Select all checkboxes where class = 1;
        const selectMarked = element.getElementsByClassName("-1");
        //If there are no -1's, no choices have been selected as answer:
        if(selectMarked.length < 1){
            error_alert = "You need to have at least one answer selected";
            return1 = false;
        }

        //Select the needed elements for checking the opostite condidtions:
        let selectMarked2 = element.querySelectorAll("input[type='checkbox']");
        //select all checkboxes:
        const select = element.querySelectorAll("quiz_isAnser_input");

        //check to make sure they aren't all the answer to the questions:
        if(selectMarked2.length == select.length){
            error_alert = "All choices can't be correct";
            return1 = false;
        }
    });

    //If there was an error alert the error message:
    if(!return1){
        alert(error_alert);
    }
    return return1;
}








//Final section checking the form and creating the JSON object:
//------------------------------------------------------------------------------------------------

function createXMLHttpRequestObject(quiz_name, JSON_quiz){
    //New solution
    //Use the JS DOM manipulation tools to create a hidden form object with the JSON put into a hiddeninput
    //inside of the form. Then submit the form (the php will most likely see it this way)
    //Furthermore set and event listener so that when the form is submitted it will delete it's self.
    
    //Create the form elememt:
    var JSON_form = document.createElement("form");
    //Set the forms attributes:
    JSON_form.setAttribute("action", "updateJSON.php");
    JSON_form.setAttribute("method", "POST");

    //Create the inputs for the quiz name and the JSON_quiz object:
    let quiz_name_input = document.createElement("input");
    let JSON_quiz_input = document.createElement("input");
    //Set the name and value attributes for these inputs:
    quiz_name_input.setAttribute("name", "JSON_quiz_name");
    JSON_quiz_input.setAttribute("name", "JSON_quiz");
    quiz_name_input.setAttribute("value", quiz_name);
    JSON_quiz_input.setAttribute("value", JSON_quiz);

    //Append the inputs to the form:
    JSON_form.appendChild(quiz_name_input);
    JSON_form.appendChild(JSON_quiz_input)
    console.log(JSON_form);

    //Append the form to the body:
    document.body.appendChild(JSON_form);

    //Create event listener to delete the form once is has been submitted:
    JSON_form.addEventListener("submit", () => {
        document.body.removeChild(JSON_form);
    });

    return JSON_form;
}


//Create a dictionary to reduce the need of an if condition:
const check_isAnswerDict = {
    "1": false,
    "-1": true
};

//Check if a text input has been declared as an answer:
function check_isAnswer(answerSelect){
    //Make sure the integers class attribute is a string:
    let isAnswer = check_isAnswerDict[answerSelect.classList[1]];
    return isAnswer;
}


//Function to compile the JSON object from the javascript object:
function JSON_compiler(){
    let new_quiz = [];
    Array.from(questions()).forEach(question => {
        //Get the questions and if they are correct or not (true / false):
        let cur_answers = []
        Array.from(question.querySelectorAll(".quiz_question_choice")).forEach(answer => {
            cur_answers.push({text: answer.getElementsByClassName("question_choice_input")[0].value, correct: check_isAnswer(answer.getElementsByClassName("quiz_isAnser_input")[0])});
        });

        let question_question = question.getElementsByClassName("question_question_input")[0].value;

        //Build the current questions
        let cur_question = {
            question: question_question,
            answers:cur_answers
        };

        //Put it into the object:
        new_quiz.push(cur_question);
    });

    //Convert the object to JSON and return it:
    let JSON_new_quiz = JSON.stringify(new_quiz);
    return JSON_new_quiz;
}



//Function to run the validation and JSON creation before form submit:
//Form only submits if the validation and JSON POST / UPDATE is successful
function form_submit(){
    //validate the form:
    //NULL checker:
    let error_check_array = [validate_form_text(), validate_form_answer()];
    console.log(error_check_array);
    if(error_check_array.includes(false)){
        //Don't submit the form:
        return;
    }

    //go to the JSON compiler function - returns the compiled object:
    let JSON_quiz = JSON_compiler();

    //Code to send the JSON to the PHP (server):
    //Use a XMLHttpRequest - use the 'createXMLHttpRequestObject':
    //Get the quiz name:
    let quiz_name = document.getElementById("quiz_name_input").value;
    let JSON_request = createXMLHttpRequestObject(quiz_name, JSON_quiz);

    //Send the object to the PHP (server):
    JSON_request.submit();
}