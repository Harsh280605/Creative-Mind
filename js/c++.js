const topics = ["Basics of C++", "Data Types in C++", "Control Structures", "Functions", "Classes and Objects", "Pointers and References"];

let questions = [
    { 
        question: "Which of the following is not a valid way to initialize a variable in C++?", 
        options: [
            "int x = 5;",
            "int x(5);",
            "int x{5};",
            "int x:5;"
        ], 
        answer: "int x:5;", 
        topic: "Basics of C++" 
    },
    { 
        question: "What is the correct way to declare a constant variable in C++?", 
        options: [
            "const int x;",
            "int const x;",
            "Both are correct",
            "None of the above"
        ], 
        answer: "Both are correct", 
        topic: "Basics of C++" 
    },
    { 
        question: "What is the result of the following code snippet?\n\n```cpp\nint x = 5;\nint y = x++;\ncout << y;\n```", 
        options: [
            "5",
            "6",
            "Error",
            "Depends on compiler"
        ], 
        answer: "5", 
        topic: "Basics of C++" 
    },
    { 
        question: "Which of the following is a correct syntax to define a function in C++?", 
        options: [
            "void functionName() { }",
            "functionName(void) { }",
            "void functionName(void) { }",
            "None of the above"
        ], 
        answer: "void functionName() { }", 
        topic: "Functions" 
    },
    { 
        question: "What is a class in C++?", 
        options: [
            "A built-in data type",
            "A user-defined data type",
            "A type of function",
            "A reserved keyword"
        ], 
        answer: "A user-defined data type", 
        topic: "Classes and Objects" 
    },
    { 
        question: "Which operator is used to access the members of a class in C++?", 
        options: [
            ".",
            "->",
            "::",
            ">>"
        ], 
        answer: ".", 
        topic: "Classes and Objects" 
    },
    { 
        question: "What is the purpose of the 'new' operator in C++?", 
        options: [
            "To delete memory",
            "To allocate memory",
            "To access member functions",
            "To declare a new variable"
        ], 
        answer: "To allocate memory", 
        topic: "Pointers and References" 
    },
    { 
        question: "What does the 'delete' operator do in C++?", 
        options: [
            "Deletes a file",
            "Deletes a variable",
            "Frees memory",
            "Deletes a member function"
        ], 
        answer: "Frees memory", 
        topic: "Pointers and References" 
    },
    { 
        question: "Which statement is true about pointers in C++?", 
        options: [
            "Pointers cannot point to functions",
            "Pointers are always initialized to NULL",
            "Dereferencing a NULL pointer results in a compile-time error",
            "Pointers cannot be passed to functions"
        ], 
        answer: "Dereferencing a NULL pointer results in a runtime error", 
        topic: "Pointers and References" 
    },
    { 
        question: "What is the output of the following code?\n\n```cpp\ncout << 10 / 3;\n```", 
        options: [
            "3.3333",
            "3",
            "3.0",
            "Error"
        ], 
        answer: "3", 
        topic: "Basics of C++" 
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


