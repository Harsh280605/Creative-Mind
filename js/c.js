const topics = ["Inorganic Chemistry", "Organic Chemistry", "Physics", "Mathematics", "Physical Chemistry", "Biology"];

let questions = [
    { 
        question: "Which of the following statements about Gold is correct?", 
        options: [
            "Gold is a transition metal with atomic number 79.",
            "Gold is the most reactive metal.",
            "Gold does not react with any acid except aqua regia.",
            "Gold is a gas at room temperature."
        ], 
        answer: "Gold is a transition metal with atomic number 79.", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "What is the hybridization of sulfur in sulfuric acid (H2SO4)?", 
        options: [
            "sp3",
            "sp2",
            "sp",
            "Not hybridized"
        ], 
        answer: "sp3", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "Which of the following elements is not present in the human body?", 
        options: [
            "Sodium",
            "Chlorine",
            "Copper",
            "Neon"
        ], 
        answer: "Neon", 
        topic: "Inorganic Chemistry" 
    },
    { 
        question: "Which functional group is present in acetic acid (CH3COOH)?", 
        options: [
            "-OH",
            "-COOH",
            "-CHO",
            "-C=C-"
        ], 
        answer: "-COOH", 
        topic: "Organic Chemistry" 
    },
    { 
        question: "What is the major product obtained from the reaction of ethene with bromine in the presence of CCl4?", 
        options: [
            "1,2-dibromoethane",
            "1,1-dibromoethane",
            "Bromine",
            "Bromide ion"
        ], 
        answer: "1,2-dibromoethane", 
        topic: "Organic Chemistry" 
    },
    { 
        question: "What is the speed of a particle with a de Broglie wavelength of 1 nm, if its mass is 1 kg?", 
        options: [
            "1 m/s",
            "10 m/s",
            "100 m/s",
            "1000 m/s"
        ], 
        answer: "100 m/s", 
        topic: "Physics" 
    },
    { 
        question: "What is the magnetic field inside a solenoid with 1000 turns/m when a current of 2 A flows through it?", 
        options: [
            "2 mT",
            "20 mT",
            "0.2 mT",
            "200 mT"
        ], 
        answer: "2 mT", 
        topic: "Physics" 
    },
    { 
        question: "Which of the following is a valid solution to the differential equation dy/dx = y?", 
        options: [
            "y = e^x",
            "y = x^2",
            "y = sin(x)",
            "y = 1/x"
        ], 
        answer: "y = e^x", 
        topic: "Mathematics" 
    },
    { 
        question: "What is the limit of (sin(x) - x) as x approaches 0?", 
        options: [
            "0",
            "1",
            "π",
            "∞"
        ], 
        answer: "0", 
        topic: "Mathematics" 
    },
    { 
        question: "Which gas law describes the behavior of real gases most accurately?", 
        options: [
            "Boyle's Law",
            "Charles's Law",
            "Ideal Gas Law",
            "van der Waals Equation"
        ], 
        answer: "van der Waals Equation", 
        topic: "Physical Chemistry" 
    },
    { 
        question: "Which of the following statements about enzyme kinetics is correct?", 
        options: [
            "Enzyme activity is always inhibited by competitive inhibitors.",
            "Enzyme activity increases with substrate concentration until saturation is reached.",
            "Enzymes denature at high temperatures.",
            "Enzyme activity is unaffected by pH."
        ], 
        answer: "Enzyme activity increases with substrate concentration until saturation is reached.", 
        topic: "Biology" 
    },
    { 
        question: "Which organelle is responsible for the breakdown of fatty acids and detoxification of alcohol in the liver?", 
        options: [
            "Nucleus",
            "Endoplasmic Reticulum",
            "Golgi Apparatus",
            "Peroxisome"
        ], 
        answer: "Peroxisome", 
        topic: "Biology" 
    }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledQuestions = shuffle(questions).slice(0, 10);

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
    const shuffledQuestions = shuffle(questions).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    incorrectQuestions = [];
    questions = shuffledQuestions;
    startButton.style.display = 'block';
    resultsContainer.style.display = 'none';
}
