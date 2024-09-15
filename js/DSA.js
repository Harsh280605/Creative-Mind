const topics = ["Array", "Linked List", "Stack", "Queue", "Tree", "Graph", "Sorting", "Searching", "Dynamic Programming", "Hashing"];

let questions = [
    { 
        question: "What is the time complexity of inserting an element into an array at the end (assuming no resizing is needed)?", 
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ], 
        answer: "O(1)", 
        topic: "Array" 
    },
    { 
        question: "What is the time complexity of finding an element in a sorted array using binary search?", 
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ], 
        answer: "O(log n)", 
        topic: "Array" 
    },
    { 
        question: "Which data structure is used for implementing undo functionality in a text editor?", 
        options: [
            "Array",
            "Linked List",
            "Stack",
            "Queue"
        ], 
        answer: "Stack", 
        topic: "Stack" 
    },
    { 
        question: "Which data structure is typically used for implementing breadth-first search (BFS)?", 
        options: [
            "Array",
            "Linked List",
            "Stack",
            "Queue"
        ], 
        answer: "Queue", 
        topic: "Queue" 
    },
    { 
        question: "What is the time complexity of finding the height of a binary tree?", 
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ], 
        answer: "O(n)", 
        topic: "Tree" 
    },
    { 
        question: "Which algorithm is NOT a sorting algorithm?", 
        options: [
            "Merge Sort",
            "Quick Sort",
            "Heap Sort",
            "Breadth-First Search"
        ], 
        answer: "Breadth-First Search", 
        topic: "Sorting" 
    },
    { 
        question: "What is the worst-case time complexity of linear search?", 
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ], 
        answer: "O(n)", 
        topic: "Searching" 
    },
    { 
        question: "Which approach is commonly used to solve the 0/1 knapsack problem?", 
        options: [
            "Greedy Algorithm",
            "Dynamic Programming",
            "Divide and Conquer",
            "Backtracking"
        ], 
        answer: "Dynamic Programming", 
        topic: "Dynamic Programming" 
    },
    { 
        question: "Which data structure is typically used to implement a hash table?", 
        options: [
            "Array",
            "Linked List",
            "Stack",
            "Queue"
        ], 
        answer: "Array", 
        topic: "Hashing" 
    },
    { 
        question: "What is the time complexity of searching for an element in a hash table (assuming uniform hashing)?", 
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ], 
        answer: "O(1)", 
        topic: "Hashing" 
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
