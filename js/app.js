const startButton = document.getElementById("start-button");

const welcomeScreen = document.querySelector(".welcome-screen");
const quizScreen = document.querySelector(".quiz-screen");

startButton.addEventListener("click", function(){
    console.log("test!!!");

    welcomeScreen.style.display = "none";
    quizScreen.style.display = "block";
});