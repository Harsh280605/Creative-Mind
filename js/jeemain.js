const topics = ["Inorganic Chemistry", "Organic Chemistry", "Physics", "Mathematics", "Physical Chemistry", "Biology"];

// Sample questions (you can add more)
let questions = [
    { 
        question: "What is the chemical symbol for gold?", 
        options: ["Au", "Ag", "Fe", "Hg"], 
        answer: "Au", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "What is the chemical formula for water?", 
        options: ["H2O", "CO2", "O2", "CH4"], 
        answer: "H2O", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "Which of the following is an alkali metal?", 
        options: ["Sodium", "Iron", "Copper", "Gold"], 
        answer: "Sodium", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "Which functional group is present in aldehydes?", 
        options: ["-OH", "-CHO", "-COOH", "-NH2"], 
        answer: "-CHO", 
        topic: "Organic Chemistry" 
    },
    { 
        question: "Which process involves the conversion of glucose to ethanol?", 
        options: ["Fermentation", "Photosynthesis", "Respiration", "Oxidation"], 
        answer: "Fermentation", 
        topic: "Organic Chemistry" 
    },
    { 
        question: "What is the SI unit of electric charge?", 
        options: ["Ampere", "Volt", "Coulomb", "Ohm"], 
        answer: "Coulomb", 
        topic: "Physics" 
    },
    { 
        question: "Which law states that the pressure of a given mass of gas is inversely proportional to its volume at constant temperature?", 
        options: ["Boyle's Law", "Charles's Law", "Avogadro's Law", "Gay-Lussac's Law"], 
        answer: "Boyle's Law", 
        topic: "Physics" 
    },
    { 
        question: "What is the value of π (pi) rounded to two decimal places?", 
        options: ["3.14", "3.16", "3.18", "3.20"], 
        answer: "3.14", 
        topic: "Mathematics" 
    },
    { 
        question: "What is the derivative of x^2 with respect to x?", 
        options: ["2x", "x^2", "2", "1"], 
        answer: "2x", 
        topic: "Mathematics" 
    },
    { 
        question: "Which gas is known as laughing gas?", 
        options: ["Carbon dioxide", "Oxygen", "Nitrous oxide", "Hydrogen"], 
        answer: "Nitrous oxide", 
        topic: "Physical Chemistry" 
    },
    { 
        question: "What is the process of conversion of a liquid into a vapor at any temperature below its boiling point called?", 
        options: ["Evaporation", "Condensation", "Sublimation", "Boiling"], 
        answer: "Evaporation", 
        topic: "Physical Chemistry" 
    },
    { 
        question: "Which organelle is known as the powerhouse of the cell?", 
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Lysosome"], 
        answer: "Mitochondrion", 
        topic: "Biology" 
    },
    { 
        question: "Which of the following is a plant hormone?", 
        options: ["Adrenaline", "Gibberellin", "Insulin", "Testosterone"], 
        answer: "Gibberellin", 
        topic: "Biology" 
    },
    // Additional questions for each topic
    { 
        question: "What is the chemical symbol for sodium?", 
        options: ["Na", "Ne", "Ni", "No"], 
        answer: "Na", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "What is the structural formula of ethanol?", 
        options: ["CH3OH", "C2H5OH", "CH3COOH", "CH4"], 
        answer: "C2H5OH", 
        topic: "Organic Chemistry" 
    },
    { 
        question: "What is the SI unit of force?", 
        options: ["Watt", "Joule", "Newton", "Kilogram"], 
        answer: "Newton", 
        topic: "Physics" 
    },
    { 
        question: "Which theorem states that for a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides?", 
        options: ["Pythagoras's Theorem", "Fermat's Last Theorem", "Euler's Theorem", "Bayes' Theorem"], 
        answer: "Pythagoras's Theorem", 
        topic: "Mathematics" 
    },
    { 
        question: "Which gas is most abundant in Earth's atmosphere?", 
        options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Argon"], 
        answer: "Nitrogen", 
        topic: "Physical Chemistry" 
    },
    { 
        question: "Which organelle is responsible for protein synthesis in a cell?", 
        options: ["Golgi Apparatus", "Endoplasmic Reticulum", "Ribosome", "Lysosome"], 
        answer: "Ribosome", 
        topic: "Biology" 
    },
    // Additional questions relevant to JEE mains
    { 
        question: "What is the unit of specific heat capacity?", 
        options: ["J/kg", "J/(kg·K)", "J", "J/m"], 
        answer: "J/(kg·K)", 
        topic: "Physics" 
    },
    { 
        question: "Which metal is used in galvanization?", 
        options: ["Aluminium", "Zinc", "Copper", "Iron"], 
        answer: "Zinc", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "Which of the following is a quadratic equation?", 
        options: ["x^3 + 2x - 5 = 0", "2x + 3 = 0", "x^2 - 4x + 3 = 0", "3x^2 + 5x + 1 = 0"], 
        answer: "x^2 - 4x + 3 = 0", 
        topic: "Mathematics" 
    },
    { 
        question: "Which hormone regulates blood sugar levels?", 
        options: ["Glucagon", "Insulin", "Adrenaline", "Testosterone"], 
        answer: "Insulin", 
        topic: "Biology" 
    },
    { 
        question: "What is the chemical name of baking soda?", 
        options: ["Sodium bicarbonate", "Calcium carbonate", "Potassium chloride", "Magnesium sulfate"], 
        answer: "Sodium bicarbonate", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "Which of the following is a vector quantity?", 
        options: ["Speed", "Distance", "Acceleration", "Energy"], 
        answer: "Acceleration", 
        topic: "Physics" 
    }
];


// Shuffle function to randomly shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Randomly select 10 questions
const shuffledQuestions = shuffle(questions).slice(0, 10);

let currentQuestionIndex = 0;
let score = 0;
let incorrectQuestions = [];

// Update the 'questions' variable to use shuffled questions
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
    // Reshuffle the questions for the next quiz
    const shuffledQuestions = shuffle(questions).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    incorrectQuestions = [];
    questions = shuffledQuestions;
    startButton.style.display = 'block';
    resultsContainer.style.display = 'none';
}
