const topics = ["Python Basics", "Data Structures", "Control Flow", "Functions", "Object-Oriented Programming", "File Handling"];

let questions = [
    { 
        question: "What is the output of the following code snippet?\n\n```python\nprint('Hello' * 3)\n```", 
        options: [
            "Hello",
            "HelloHello",
            "HelloHelloHello",
            "Error"
        ], 
        answer: "HelloHelloHello", 
        topic: "Python Basics" 
    },
    { 
        question: "Which of the following data structures in Python is mutable?", 
        options: [
            "Tuple",
            "List",
            "String",
            "Set"
        ], 
        answer: "List", 
        topic: "Data Structures" 
    },
    { 
        question: "What is the output of the following code?\n\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)\n```", 
        options: [
            "0 1 2",
            "0 1 2 3",
            "0 1 2 3 4",
            "Error"
        ], 
        answer: "0 1 2", 
        topic: "Control Flow" 
    },
    { 
        question: "Which keyword is used to define a function in Python?", 
        options: [
            "method",
            "func",
            "define",
            "def"
        ], 
        answer: "def", 
        topic: "Functions" 
    },
    { 
        question: "What is the purpose of inheritance in object-oriented programming?", 
        options: [
            "To create objects",
            "To allow one class to inherit the attributes and methods of another class",
            "To define attributes",
            "To encapsulate data"
        ], 
        answer: "To allow one class to inherit the attributes and methods of another class", 
        topic: "Object-Oriented Programming" 
    },
    { 
        question: "Which mode is used to open a file in Python for writing data?", 
        options: [
            "r",
            "w",
            "a",
            "x"
        ], 
        answer: "w", 
        topic: "File Handling" 
    },
    { 
        question: "What is the output of the following code snippet?\n\n```python\ndef func(a, b=5, c=10):\n    print(a, b, c)\nfunc(3, 7)\n```", 
        options: [
            "3 5 10",
            "3 7 10",
            "3 5 7",
            "Error"
        ], 
        answer: "3 7 10", 
        topic: "Functions" 
    },
    { 
        question: "What is the output of the following code snippet?\n\n```python\nx = [1, 2, 3]\nprint(*x)\n```", 
        options: [
            "1 2 3",
            "[1, 2, 3]",
            "(1, 2, 3)",
            "Error"
        ], 
        answer: "1 2 3", 
        topic: "Python Basics" 
    },
    { 
        question: "What is the output of the following code snippet?\n\n```python\nprint(9 ** 0.5)\n```", 
        options: [
            "3",
            "9",
            "2",
            "Error"
        ], 
        answer: "3", 
        topic: "Python Basics" 
    },
    { 
        question: "Which statement is used to exit a loop in Python?", 
        options: [
            "exit",
            "quit",
            "break",
            "continue"
        ], 
        answer: "break", 
        topic: "Control Flow" 
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


