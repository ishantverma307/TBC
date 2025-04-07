document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startQuiz");
    const nameInput = document.getElementById("playerName");
    const quizSection = document.getElementById("quizSection");
    const nameInputSection = document.getElementById("nameInputSection");
    const questionElement = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
    const nextButton = document.getElementById("nextBtn");
    const leaderboardSection = document.getElementById("leaderboardSection");
    const leaderboardList = document.getElementById("leaderboard");

    let playerName = "";
    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: "What is the name of Jon Snow’s direwolf?",
            answers: ["Ghost", "Nymeria", "Summer", "Shaggydog"],
            correct: 0
        },
        {
            question: "Who was responsible for poisoning King Joffrey?",
            answers: ["Olenna Tyrell", "Tyrion Lannister", "Petyr Baelish", "Sansa Stark"],
            correct: 0
        },
        {
            question: "What is the motto of House Stark?",
            answers: ["Winter is Coming", "Fire and Blood", "Hear Me Roar", "Ours is the Fury"],
            correct: 0
        },
        {
            question: "Who was known as the ‘Mad King’?",
            answers: ["Aerys II Targaryen", "Robert Baratheon", "Rhaegar Targaryen", "Viserys Targaryen"],
            correct: 0
        },
        {
            question: "What is the name of Arya Stark’s sword?",
            answers: ["Needle", "Oathkeeper", "Ice", "Longclaw"],
            correct: 0
        },
        {
            question: "Which metal is used to kill White Walkers?",
            answers: ["Valyrian steel", "Iron", "Gold", "Obsidian"],
            correct: 3
        },
        {
            question: "Who sits on the Iron Throne at the end of the series?",
            answers: ["Bran Stark", "Jon Snow", "Daenerys Targaryen", "Sansa Stark"],
            correct: 0
        },
        {
            question: "What was the real name of King Joffrey’s father?",
            answers: ["Jaime Lannister", "Robert Baratheon", "Tywin Lannister", "Stannis Baratheon"],
            correct: 0
        },
        {
            question: "What does ‘Dracarys’ mean in Valyrian?",
            answers: ["Dragonfire", "Victory", "Freedom", "Revenge"],
            correct: 0
        },
        {
            question: "Who was the Three-Eyed Raven before Bran Stark?",
            answers: ["Brynden Rivers", "Benjen Stark", "Eddard Stark", "Maester Aemon"],
            correct: 0
        }
    ];

    function startQuiz() {
        playerName = nameInput.value.trim();
        if (playerName === "") {
            alert("Please enter your name!");
            return;
        }
        nameInputSection.classList.add("hidden");
        quizSection.classList.remove("hidden");
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersContainer.innerHTML = "";
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("answer-btn");
            button.onclick = () => selectAnswer(index);
            answersContainer.appendChild(button);
        });
    }

    function selectAnswer(index) {
        const correctAnswer = questions[currentQuestionIndex].correct;
        if (index === correctAnswer) {
            score++;
        }
        currentQuestionIndex++;
        nextButton.classList.remove("hidden");
    }

    function nextQuestion() {
        nextButton.classList.add("hidden");
        loadQuestion();
    }

    function endQuiz() {
        quizSection.classList.add("hidden");
        leaderboardSection.classList.remove("hidden");
        saveScore();
        displayLeaderboard();
    }

    function saveScore() {
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name: playerName, score: score });
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }

    function displayLeaderboard() {
        leaderboardList.innerHTML = "";
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.forEach(entry => {
            let li = document.createElement("li");
            li.textContent = `${entry.name}: ${entry.score}`;
            leaderboardList.appendChild(li);
        });
    }

    startButton.addEventListener("click", startQuiz);
    nextButton.addEventListener("click", nextQuestion);
});
