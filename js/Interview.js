const topics = ["Physics", "Chemistry", "Mathematics"];

let questions = [
    // Physics questions
    { 
        question: "What is the formula for the gravitational force between two objects?",
        options: [
            "F = ma",
            "F = G * m1 * m2 / r^2",
            "F = k * q1 * q2 / r^2",
            "F = -k * x"
        ],
        answer: "F = G * m1 * m2 / r^2",
        topic: "Physics"
    },
    { 
        question: "Which of the following is a unit of electric charge?",
        options: [
            "Volt",
            "Ampere",
            "Ohm",
            "Coulomb"
        ],
        answer: "Coulomb",
        topic: "Physics"
    },
    { 
        question: "What is the SI unit of power?",
        options: [
            "Joule",
            "Watt",
            "Newton",
            "Pascal"
        ],
        answer: "Watt",
        topic: "Physics"
    },
    { 
        question: "What is the formula for kinetic energy?",
        options: [
            "1/2 * mv^2",
            "mgh",
            "F * d",
            "1/2 * kx^2"
        ],
        answer: "1/2 * mv^2",
        topic: "Physics"
    },
    { 
        question: "What is the first law of thermodynamics?",
        options: [
            "Energy cannot be created or destroyed",
            "Energy cannot be transferred as heat",
            "Entropy always increases",
            "Energy and mass are equivalent"
        ],
        answer: "Energy cannot be created or destroyed",
        topic: "Physics"
    },
    // Chemistry questions
    { 
        question: "Which of the following elements has the highest electronegativity?",
        options: [
            "Sodium",
            "Chlorine",
            "Fluorine",
            "Carbon"
        ],
        answer: "Fluorine",
        topic: "Chemistry"
    },
    { 
        question: "What is the formula for the compound formed between sodium and chlorine?",
        options: [
            "NaCl",
            "NaCl2",
            "Na2Cl",
            "Na2Cl3"
        ],
        answer: "NaCl",
        topic: "Chemistry"
    },
    { 
        question: "What is Avogadro's number?",
        options: [
            "6.022 x 10^23",
            "3.14159",
            "9.8",
            "2.718"
        ],
        answer: "6.022 x 10^23",
        topic: "Chemistry"
    },
    { 
        question: "Which gas is known as laughing gas?",
        options: [
            "Oxygen",
            "Nitrous Oxide",
            "Carbon Dioxide",
            "Methane"
        ],
        answer: "Nitrous Oxide",
        topic: "Chemistry"
    },
    { 
        question: "What is the pH of a neutral solution?",
        options: [
            "7",
            "0",
            "14",
            "1"
        ],
        answer: "7",
        topic: "Chemistry"
    },
    // Mathematics questions
    { 
        question: "What is the derivative of sin(x) with respect to x?",
        options: [
            "cos(x)",
            "-sin(x)",
            "tan(x)",
            "cot(x)"
        ],
        answer: "cos(x)",
        topic: "Mathematics"
    },
    { 
        question: "What is the integral of x^2 with respect to x?",
        options: [
            "x^3",
            "2x",
            "x^3 / 3",
            "2x^2"
        ],
        answer: "x^3 / 3",
        topic: "Mathematics"
    },
    { 
        question: "What is the value of pi (π) correct to 2 decimal places?",
        options: [
            "3.14",
            "3.16",
            "3.12",
            "3.18"
        ],
        answer: "3.14",
        topic: "Mathematics"
    },
    { 
        question: "What is the sum of the angles of a triangle?",
        options: [
            "180 degrees",
            "90 degrees",
            "360 degrees",
            "270 degrees"
        ],
        answer: "180 degrees",
        topic: "Mathematics"
    },
    { 
        question: "What is the value of √16?",
        options: [
            "2",
            "4",
            "8",
            "16"
        ],
        answer: "4",
        topic: "Mathematics"
    }
    // Add more questions as needed for each topic
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledQuestions = shuffle(questions).slice(0, 30);

let currentQuestionIndex = 0;
let score = 0;
let incorrectQuestions = [];

questions = shuffledQuestions;

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results-container');

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    startButton.style.display = 'none';
    showQuestion();
    questionContainer.style.display = 'block';
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', selectOption);
        optionsContainer.appendChild(button);
    });
}

function selectOption(e) {
    const selectedOption = e.target.textContent;
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score++;
    } else {
        incorrectQuestions.push({ question: question.question, topic: question.topic });
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    const scorePercentage = (score / questions.length) * 100;
    document.getElementById('score').textContent = `You scored: ${score}/${questions.length} (${scorePercentage.toFixed(2)}%)`;

    if (score === questions.length) {
        document.getElementById('feedback').textContent = 'Congratulations! You answered all questions correctly. Keep up the good work!';
    } else {
        const incorrectTopics = Array.from(new Set(incorrectQuestions.map(q => q.topic))).join(', ');
        let incorrectQuestionsHtml = '<div class="table-container"><table>';
        incorrectQuestionsHtml += '<tr><th>Question</th><th>Topic</th></tr>';
        incorrectQuestions.forEach(q => {
            incorrectQuestionsHtml += `<tr><td>${q.question}</td><td>${q.topic}</td></tr>`;
        });
        incorrectQuestionsHtml += '</table></div>';
        document.getElementById('feedback').innerHTML = `You missed questions in the following topics: ${incorrectTopics}${incorrectQuestionsHtml}`;
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function restartQuiz() {
    const shuffledQuestions = shuffle(questions).slice(0, 30);
    currentQuestionIndex = 0;
    score = 0;
    incorrectQuestions = [];
    questions = shuffledQuestions;
    startButton.style.display = 'block';
    resultsContainer.style.display = 'none';
}

