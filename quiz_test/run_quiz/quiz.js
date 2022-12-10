//Workflow of quiz

//Find the hidden JSON:
const str_JSON = document.getElementById("hidden_questions").innerText;
const questions = JSON.parse(str_JSON);

/*
//Example of how the questions should be formatted in questions.json:
const questions = [
    {
        question: "What is your name?",
        answers:[
            {text: '4', correct: true},
            {text: '5', correct: false},
            {text: '22', correct: false}
        ]
    }
];
*/

//Get question num from the count variable - current_questions_index
var results = [
    /*Example Question:
    {
        question_num: 0,
        answer: ""
    }
    */
]

//Test1 - Appending an object-array:
/*test results arrayObj:
question_num = 0;
answer = "yes";
results.push(
    {
        question_num: question_num,
        answer: answer
    }
);
console.log(results);
*/


//MAIN -----------------------------------------:
//Quiz code - code for the actual quiz program:

const start_button = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const showScoreButton = document.getElementById('show-score-btn');
nextButton.addEventListener('click', () => {
    current_questions_index++;
    setNextQuestion();
})

showScoreButton.addEventListener('click', () => {
    showScore();
});

start_button.addEventListener("click", start_game, true);

const question_container = document.getElementById('questions-container');
const controlls_container = document.getElementById('controlls');
const container = document.getElementById('container');

let shuffled_questions = null;
let current_questions_index = null;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');


function start_game(){
    //Remove the answer section:
    results = [];
    document.querySelectorAll(".answer_div").forEach(answer_div => {
        answer_div.parentNode.removeChild(answer_div);
    });
    document.querySelectorAll("br").forEach(br => {
        br.parentNode.removeChild(br);
    });
    var total_score = document.getElementById('total_score');
    if (typeof total_score !== "undefined" && total_score != null){
       total_score.parentNode.removeChild(total_score);
    }

    console.log("Start");
    showScoreButton.classList.add("hide");
    start_button.classList.add("hide");
    shuffled_questions = questions.sort(() => Math.random() - .5);
    current_questions_index = 0;
    question_container.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffled_questions[current_questions_index]);
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

//Create function to display the users score
function showScore(){
    question_container.classList.add("hide");
    showScoreButton.classList.add("hide");
    
    //Loop through all the questions and display the results:
    let total_score = document.createElement('h4');
    total_score.value = 0;
    total_score.id = "total_score";
    let i = 0;
    shuffled_questions.forEach(question => {
        let question_div = document.createElement('div');
        question_div.classList.add("answer_div");
        let question_title = document.createElement('h3');
        question_title.innerText = "Question " + i + " - " + question.question;
        let question_answer = document.createElement('h4');
        question_answer.innerText = "This answer was: " + results[i].answer;
        let question_result = document.createElement('h4');
        question_result.innerText = (function() {
            if(results[i].correct == true){
                total_score.value++;
                return "You got this question: Correct! :)";
            }
            else{
                return "You got this question: Incorrect :(";
            }
        })();
        question_div.appendChild(question_title);
        question_div.appendChild(question_answer);
        question_div.appendChild(question_result);
        container.appendChild(question_div);
        [1,2].forEach(i => {
            container.appendChild(document.createElement('br'));
        });
        i++;
    });
    container.appendChild(total_score);
    total_score.innerText = "Total Score: " + total_score.value;
    start_button.classList.remove("hide");
}

function selectAnswer(event){
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if(shuffled_questions.length > current_questions_index + 1){
        nextButton.classList.remove("hide");
    }
    else{
        start_button.innerText = "Restart";
        question_container.classList.add("hide");
        start_button.classList.remove("hide");
        showScoreButton.classList.remove("hide");
    }

    let answer2 = false;
    shuffled_questions[current_questions_index].answers.forEach(answer => {
        if(answer.correct == true){
            answer2 = answer.text;
        }
    });

    results.push(
        {
            question: current_questions_index,
            answer: answer2,
            correct: Boolean(correct)
        }
    )
    console.log(results);
}

function setStatusClass(body, correct){
    clearStatusClass(body);
    if(correct){
        body.classList.add("correct");
    }
    else{
        body.classList.add("wrong");
    }
}

function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");
}