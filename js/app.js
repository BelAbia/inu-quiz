const startButton = document.getElementById("start-button");

const welcomeScreen = document.querySelector(".welcome-screen");
const quizScreen = document.querySelector(".quiz-screen");

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const answersContainer = document.querySelector(".answers");

const resultScreen = document.querySelector(".result-screen");
const resultName = document.querySelector(".result-name");
const resultImage = document.querySelector(".result-image");
const resultDescription = document.querySelector(".result-description");

const restartButton = document.querySelector(".restart-button");

let questions = [];
let characters = [];
let currentQuestionIndex = 0;

let scores = {
    inuyasha: 0,
    kagome: 0,
    sango: 0,
    miroku: 0,
    sesshomaru: 0
};

async function loadQuestions() {
    const response = await fetch("data/questions.json");
    questions = await response.json();

    displayQuestion(0);
}

startButton.addEventListener("click", async function(){
    welcomeScreen.style.display = "none";
    quizScreen.style.display = "block";

    await loadCharacters();
    await loadQuestions();
});

function displayQuestion(questionIndex) {
    const question = questions[questionIndex];

    questionNumber.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
    questionText.textContent = question.question;

    answersContainer.innerHTML = "";

    question.answers.forEach(function (answer){
        const button = document.createElement("button");

        button.classList.add("answer-button");
        button.textContent = answer.text;

        button.addEventListener("click", function(){
            calculateScore(answer);

            currentQuestionIndex++;

            if(currentQuestionIndex < questions.length){
                displayQuestion(currentQuestionIndex);
            } else {
                displayResult();
            }
        });

        answersContainer.appendChild(button);
    });
}

async function loadCharacters() {
    const response = await fetch("data/characters.json")
    characters = await response.json();
    
}

function calculateScore(answer){
    for (const character in answer.points){
        scores[character] += answer.points[character];
    }
}

function getWinningCHaracter(){
    let winnigId = null;
    let highestScore = -1;

    for (const characterId in scores){
        if(scores[characterId] > highestScore){
            highestScore = scores[characterId];
            winnigId = characterId;
        }
    }

    return characters.find(character => {
        return character.id === winnigId;
    });
}

function displayResult(){
    const winner = getWinningCHaracter();

    resultName.textContent = winner.name;
    resultDescription.textContent = winner.description;
    resultImage.src = winner.image;
    resultImage.alt = winner.name;

    quizScreen.style.display = "none";
    resultScreen.style.display = "flex";
}

function restartQuiz() {
    scores = {
    inuyasha: 0,
    kagome: 0,
    sango: 0,
    miroku: 0,
    sesshomaru: 0 };

    currentQuestionIndex = 0;
    
    resultScreen.style.display = "none";
    welcomeScreen.style.display = "flex";
}

restartButton.addEventListener("click", restartQuiz);