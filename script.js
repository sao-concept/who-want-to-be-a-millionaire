// Sample questions and answers with corresponding rewards
const questions = [
    {
        question: "Which establishment sponsored this Tech programme?",
        choices: ["TechPort", "Solar Lamp", "FairShop", "Femtech"],
        correctAnswer: "FairShop",
        reward: 1000000
    },

    {
        question: "Which area is FairShop located?",
        choices: ["Taiwo", "Fate", "Post-Office", "Offa-Garage"],
        correctAnswer: "Fate",
        reward: 2000000
    },

    {
        question: "Who is the first woman to drive a Car in Nigeria?",
        choices: ["Mrs. Olufunmilayo R. Kuti", "Alhaja Aisha Buhari", "Mrs Oluremi Tinubu", "Mrs Aisha Yesufu"],
        correctAnswer: "Mrs. Olufunmilayo R. Kuti",
        reward: 3000000
    },

    {
        question: "When did Nigeria gain her independence?",
        choices: ["31st October 1963", "1st September 1970", "3rd January 1963", "1st October 1960"],
        correctAnswer: "1st October 1960",
        reward: 4000000
    },

    {
        question: "Who is the first woman to own a Car in Nigeria?",
        choices: ["Mrs Efunroye Tinubu", "Mrs Patient Ojukwu", "Mrs Patient Jonathan", "Mrs Oluremi Tinubu"],
        correctAnswer: "Mrs Efunroye Tinubu",
        reward: 5000000
    },

    {
        question: "Who coined the name 'Nigeria'?",
        choices: ["Journalist John Canon", "Journalist Mathew Ojo", "Journalist Kunle Bello", "Journalist Flora Shaw"],
        correctAnswer: "Journalist Flora Shaw",
        reward: 6000000
    },

    {
        question: "What is 'Nigeria' called formerly?",
        choices: ["Ninja Republic", "Niger Area", "Africa Giant", "Abuja"],
        correctAnswer: "Niger Area",
        reward: 7000000
    },

    {
        question: "Who was killed by Letter Bomb in Nigeria?",
        choices: ["Pa Awolowo", "Sir Ahmodu Bello", "Fela Kuti", "Dele Giwa"],
        correctAnswer: "Dele Giwa",
        reward: 8000000
    },

    {
        question: "Who was the first Nigeria President?",
        choices: ["Dr. Nnamdi B. Azikiwe", "Sir Ahmodu Bello", "Pa Obafemi Awolowo", "M.Gen. Obasanjo O."],
        correctAnswer: "Dr. Nnamdi B. Azikiwe",
        reward: 9000000
    },

    {
        question: "Who stopped the killing of Twins in Calabar?",
        choices: ["Jane Mike", "Efunsetan Aniwura", "Mary Slessor", "Mother Theresa"],
        correctAnswer: "Mary Slessor",
        reward: 10000000
    },

    {
        question: "How many Local Government Areas (LGAs) is here in Nigeria?",
        choices: ["774", "850", "23", "36"],
        correctAnswer: "774",
        reward: 11000000
    },

    {
        question: "What is an electronic device that accept data, process it, and give desired result?",
        choices: ["Machine", "AI", "Computer", "Television"],
        correctAnswer: "Computer",
        reward: 12000000
    },

    {
        question: "What system of government is practice in Nigeria?",
        choices: ["Millitary", "Palamentary", "Arnachy", "Democracy"],
        correctAnswer: "Democracy",
        reward: 13000000
    },

    {
        question: "Who designed the Nigeria Flag?",
        choices: ["Pa Taiwo Akinkumi", "M.Gen. Buhari M.", "M.Gen. R.M. Mohammed", "Dr Nnamdi Azikiwe"],
        correctAnswer: "Pa Taiwo Akinkumi",
        reward: 14000000
    },

    {
        question: "Who was the youngest Head of State in Nigeria?",
        choices: ["M.Gen. Aguyi Irosin", "M.Gen. Obasanjo O.", "M.Gen. Yakubu Gowon", "Dr Nnamdi Azikiwe"],
        correctAnswer: "M.Gen. Yakubu Gowon",
        reward: 15000000
    },

    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let totalEarnings = 0;
let fiftyFiftyUsed = false;
let askTheAudienceUsed = false;

// DOM elements
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const nextQuestionButton = document.getElementById("next-question");
const fiftyFiftyButton = document.getElementById("fifty-fifty");
const walkAwayButton = document.getElementById("walk-away");
const askTheAudienceButton = document.getElementById("ask-the-audience");

// DOM elements for the reward ladder
const rewardLadderElement = document.getElementById("reward-ladder");
const rewardListElement = document.getElementById("reward-list");

// Function to update the reward ladder
function updateRewardLadder() {
    rewardListElement.innerHTML = ""; // Clear existing content

    // Create and append list items for each question
    questions.forEach((question, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${index + 1} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; N${question.reward}`;
        rewardListElement.appendChild(listItem);
    });

    // Highlight the current question in the reward ladder
    const currentRewardListItem = rewardListElement.children[currentQuestionIndex];
    if (currentRewardListItem) {
        currentRewardListItem.classList.add("current-question");
    }
}

// Function to display the current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear previous choices
    choicesElement.innerHTML = "";

    // Display answer choices
    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.onclick = () => checkAnswer(choice, currentQuestion.reward);
        choicesElement.appendChild(document.createElement("li").appendChild(choiceButton));
    });

    // Hide feedback and result elements
    feedbackElement.textContent = "";
    feedbackElement.style.display = "none";
    resultElement.style.display = "none";

    // Show next question button
    nextQuestionButton.style.display = "none";

    // Enable lifeline buttons for the current question
    fiftyFiftyButton.disabled = fiftyFiftyUsed;
    askTheAudienceButton.disabled = askTheAudienceUsed;
}

// Function to check the selected answer
function checkAnswer(selectedChoice, reward) {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestionIndex >= 0 && currentQuestionIndex <= 4) {
        // Questions 1-5: Participant cannot proceed if the answer is incorrect
        if (selectedChoice === currentQuestion.correctAnswer) {
            feedbackElement.textContent = `Correct! You've earned N${reward}.`;
            score += reward;
            totalEarnings += reward;
            updateRewardLadder(); // Update the reward ladder after a correct answer
        } else {
            feedbackElement.textContent = `Wrong! The correct answer is: ${currentQuestion.correctAnswer}. You've lost N${reward}.`;
            totalEarnings = 0; // Reset total earnings to 0 for questions 1-5
            endGame();
            return;
        }
    } else {
        // Questions 6 onward: Participant can proceed even if the answer is incorrect
        if (selectedChoice === currentQuestion.correctAnswer) {
            feedbackElement.textContent = `Correct! You've earned N${reward}.`;
            score += reward;
            totalEarnings += reward;
            updateRewardLadder(); // Update the reward ladder after a correct answer
        } else {
            feedbackElement.textContent = `Wrong! The correct answer is: ${currentQuestion.correctAnswer}. You've lost N${reward}.`;
            totalEarnings = calculateLastEarnedReward(); // Reverse back to the last earned reward prior to the failed question
        }
    }

    // Display feedback
    feedbackElement.style.display = "block";

    // Disable further clicks on answer choices
    const choiceButtons = document.querySelectorAll("#choices button");
    choiceButtons.forEach(button => (button.disabled = true));

    // Disable lifeline buttons after use
    fiftyFiftyButton.disabled = true;
    askTheAudienceButton.disabled = true;

    // Show next question button
    nextQuestionButton.style.display = "block";
}

// Function to calculate the last earned reward prior to the failed question
function calculateLastEarnedReward() {
    let lastEarnedReward = 0;

    // Iterate through the questions up to the current index and find the last earned reward
    for (let i = 0; i < currentQuestionIndex; i++) {
        lastEarnedReward = questions[i].reward;
    }

    return lastEarnedReward;
}

// Function to end the game
function endGame() {
    // Display final result
    resultElement.style.display = "block";
    scoreElement.textContent = `Sorry! You're out. Your total earnings: N${totalEarnings}`;
}



// Function to handle the '50/50' lifeline
function useFiftyFifty() {
    const currentQuestion = questions[currentQuestionIndex];

    // Identify incorrect choices
    const incorrectChoices = currentQuestion.choices.filter(choice => choice !== currentQuestion.correctAnswer);

    // Randomly select one incorrect choice to keep
    const correctIndex = Math.floor(Math.random() * 2);
    const correctChoice = incorrectChoices[correctIndex];

    // Remove two incorrect choices
    const remainingChoices = currentQuestion.choices.filter(choice => choice === currentQuestion.correctAnswer || choice === correctChoice);

    // Update displayed choices
    const choiceButtons = document.querySelectorAll("#choices button");
    choiceButtons.forEach((button, index) => {
        if (remainingChoices.includes(button.textContent)) {
            button.disabled = false;
            // added this line to disable the fiftyFiftyButton when used
            fiftyFiftyButton.style.display = "none";
        } else {
            button.style.display = "none";
        }
    });

    // Disable the '50/50' lifeline button after use
    fiftyFiftyButton.disabled = true;
    fiftyFiftyUsed = true;
}

// Function to handle the 'Ask the Audience' lifeline
function askTheAudience() {
    const currentQuestion = questions[currentQuestionIndex];

    // Generate a random distribution for audience poll
    const audienceDistribution = [];
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        audienceDistribution.push(Math.floor(Math.random() * 30) + 10); // Random values between 10 and 40
    }

    // Ensure the correct answer has the highest percentage (95% or above)
    const correctAnswerIndex = currentQuestion.choices.indexOf(currentQuestion.correctAnswer);
    audienceDistribution[correctAnswerIndex] = Math.max(90, Math.floor(Math.random() * 40) + 59);

    // Sort choices based on audience distribution
    const sortedChoices = currentQuestion.choices.slice().sort((a, b, c, d) => {
        const indexA = currentQuestion.choices.indexOf(a);
        const indexB = currentQuestion.choices.indexOf(b);
        const indexC = currentQuestion.choices.indexOf(c);
        const indexD = currentQuestion.choices.indexOf(d);
        return audienceDistribution[indexB] - audienceDistribution[indexA] - audienceDistribution[indexC] - audienceDistribution[indexD];
    });

    // Create a bar chart pop-up
    const chartContainer = document.createElement("div");
    chartContainer.className = "chart-container";

    // Display a bar chart for audience poll
    sortedChoices.forEach((choice, index) => {
        const bar = document.createElement("div");
        const percentage = audienceDistribution[index];
        bar.style.width = `${percentage}%`;
        bar.textContent = `${choice}: ${percentage}%`;
        chartContainer.appendChild(bar);
    });

    // Append the chart container to the body
    document.body.appendChild(chartContainer);

    // Disable the 'Ask the Audience' lifeline button after use
    askTheAudienceButton.disabled = true;
    askTheAudienceButton.style.display = "none";
    askTheAudienceUsed = true;

    // Close the chart pop-up after a short delay (e.g., 5 seconds)
    setTimeout(() => {
        document.body.removeChild(chartContainer);
    }, 5000);
}


// Function to handle the 'Walk Away' feature
function walkAway() {
    // Display final result
    resultElement.style.display = "block";
    scoreElement.textContent = `Your total earnings: N${totalEarnings}`;
}

// Function to move to the next question
function nextQuestion() {
    // Increment the question index
    currentQuestionIndex++;

    // Check if quiz is finished
    if (currentQuestionIndex < questions.length) {
        // Enable all answer choices and display the next question
        const choiceButtons = document.querySelectorAll("#choices button");
        choiceButtons.forEach(button => {
            button.disabled = false;
            button.style.display = "inline-block";
        });

        // Enable lifeline buttons for the next question
        fiftyFiftyButton.disabled = fiftyFiftyUsed;
        askTheAudienceButton.disabled = askTheAudienceUsed;

        // Display the next question
        displayQuestion();
    } else {
        // Display final result
        resultElement.style.display = "block";
        scoreElement.textContent = `Your total earnings: N${totalEarnings}`;
    }
}

// Initial display
displayQuestion();