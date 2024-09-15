const topics = ["Digital Logics", "Computer Organization and Architecture", "Databases", "Mathematics", "Data Structures", "Compiler Design","Computer Networks"];

// Sample questions (you can add more)
let questions = [
    // Mathematics
    { 
        question: "What is the derivative of e^x?", 
        options: ["e^x", "x^2", "cos(x)", "sin(x)"], 
        answer: "e^x", 
        topic: "Mathematics" 
    },
    { 
        question: "What is the value of the following limit: lim(x->0) (sin(x)/x)?", 
        options: ["0", "1", "undefined", "π"], 
        answer: "1", 
        topic: "Mathematics" 
    },
    // Digital Logics
    { 
        question: "What is the output of the following logic gate: AND gate with inputs A=1 and B=0?", 
        options: ["0", "1", "A", "B"], 
        answer: "0", 
        topic: "Digital Logics" 
    },
    { 
        question: "What is the octal representation of the binary number 101110?", 
        options: ["56", "46", "36", "26"], 
        answer: "56", 
        topic: "Digital Logics" 
    },
    // Computer Organization and Architecture
    { 
        question: "Which of the following is not a type of memory: RAM, ROM, CPU, Cache?", 
        options: ["RAM", "ROM", "CPU", "Cache"], 
        answer: "CPU", 
        topic: "Computer Organization and Architecture" 
    },
    { 
        question: "What is the purpose of an instruction register (IR) in a CPU?", 
        options: ["To store the address of the next instruction to be executed", "To store the current instruction being executed", "To store the result of an arithmetic operation", "To store the memory address of data being accessed"], 
        answer: "To store the current instruction being executed", 
        topic: "Computer Organization and Architecture" 
    },
    // Databases
    { 
        question: "Which SQL keyword is used to retrieve only distinct values?", 
        options: ["SELECT DISTINCT", "SELECT UNIQUE", "SELECT DISTINCTIVE", "SELECT DIFFERENT"], 
        answer: "SELECT DISTINCT", 
        topic: "Databases" 
    },
    { 
        question: "What is ACID in the context of database transactions?", 
        options: ["A data structure for indexing records", "A security protocol for database access", "A programming language for querying databases", "A set of properties ensuring database transaction integrity"], 
        answer: "A set of properties ensuring database transaction integrity", 
        topic: "Databases" 
    },
    // Data Structures
    { 
        question: "What is the time complexity of inserting an element into a binary search tree (BST)?", 
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 
        answer: "O(log n)", 
        topic: "Data Structures" 
    },
    { 
        question: "What data structure is typically used to implement a LIFO (Last In, First Out) queue?", 
        options: ["Queue", "Stack", "Heap", "Linked List"], 
        answer: "Stack", 
        topic: "Data Structures" 
    },
    // Compiler Design
    { 
        question: "What is the role of a lexer in compiler design?", 
        options: ["To generate intermediate code", "To check syntax errors", "To perform semantic analysis", "To generate tokens from source code"], 
        answer: "To generate tokens from source code", 
        topic: "Compiler Design" 
    },
    { 
        question: "What is the purpose of a symbol table in compiler design?", 
        options: ["To store information about syntax rules", "To perform lexical analysis", "To manage memory allocation", "To store information about identifiers and their attributes"], 
        answer: "To store information about identifiers and their attributes", 
        topic: "Compiler Design" 
    },
    // Operating Systems
    { 
        question: "What is the purpose of virtual memory in operating systems?", 
        options: ["To allow multiple users to access the system simultaneously", "To provide a larger address space than physical memory", "To improve the performance of disk I/O operations", "To provide secure access to system resources"], 
        answer: "To provide a larger address space than physical memory", 
        topic: "Operating Systems" 
    },
    { 
        question: "What scheduling algorithm is typically used in real-time operating systems (RTOS)?", 
        options: ["First Come, First Served (FCFS)", "Round Robin (RR)", "Shortest Job Next (SJN)", "Earliest Deadline First (EDF)"], 
        answer: "Earliest Deadline First (EDF)", 
        topic: "Operating Systems" 
    },
    // Computer Networks
    { 
        question: "What is the purpose of ARP (Address Resolution Protocol) in computer networks?", 
        options: ["To map IP addresses to MAC addresses", "To route packets between networks", "To encrypt data for secure transmission", "To establish connections between clients and servers"], 
        answer: "To map IP addresses to MAC addresses", 
        topic: "Computer Networks" 
    },
    { 
        question: "Which protocol is used for secure communication over a computer network?", 
        options: ["HTTP", "FTP", "SSH", "SMTP"], 
        answer: "SSH", 
        topic: "Computer Networks" 
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
