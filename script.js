const allQuestions = [
    // Kategori Geografi
    {
        category: "Geografi",
        question: "Ibu kota Indonesia adalah?",
        answers: [
            { text: "Jakarta", correct: true },
            { text: "Surabaya", correct: false },
            { text: "Bandung", correct: false },
            { text: "Medan", correct: false }
        ]
    },
    {
        category: "Geografi", 
        question: "Pulau terbesar di Indonesia adalah?",
        answers: [
            { text: "Jawa", correct: false },
            { text: "Sumatera", correct: true },
            { text: "Kalimantan", correct: false },
            { text: "Sulawesi", correct: false }
        ]
    },
    
    // Kategori Sejarah
    {
        category: "Sejarah",
        question: "Siapa proklamator kemerdekaan Indonesia?",
        answers: [
            { text: "Soekarno", correct: true },
            { text: "Jenderal Soeharto", correct: false },
            { text: "Mohammad Hatta", correct: false },
            { text: "Sultan Hamengkubuwono", correct: false }
        ]
    },
    {
        category: "Sejarah",
        question: "Kapan Indonesia merdeka?",
        answers: [
            { text: "16 Agustus 1945", correct: false },
            { text: "17 Agustus 1945", correct: true },
            { text: "18 Agustus 1945", correct: false },
            { text: "15 Agustus 1945", correct: false }
        ]
    },
    
    // Kategori Sains
    {
        category: "Sains",
        question: "Planet terdekat dengan matahari adalah?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: false },
            { text: "Merkurius", correct: true },
            { text: "Bumi", correct: false }
        ]
    },
    {
        category: "Sains", 
        question: "Unsur kimia dengan lambang O adalah?",
        answers: [
            { text: "Oksigen", correct: true },
            { text: "Emas", correct: false },
            { text: "Perak", correct: false },
            { text: "Tembaga", correct: false }
        ]
    },
    
    // Kategori Olahraga
    {
        category: "Olahraga",
        question: "Siapa legenda sepak bola Indonesia?",
        answers: [
            { text: "Bambang Pamungkas", correct: true },
            { text: "Cristiano Ronaldo", correct: false },
            { text: "Lionel Messi", correct: false },
            { text: "Egy Maulana", correct: false }
        ]
    },
    {
        category: "Olahraga", 
        question: "Cabang olahraga nasional Indonesia?",
        answers: [
            { text: "Pencak Silat", correct: true },
            { text: "Karate", correct: false },
            { text: "Taekwondo", correct: false },
            { text: "Judo", correct: false }
        ]
    },
    
    // Kategori Budaya
    {
        category: "Budaya",
        question: "Tarian tradisional asal Bali adalah?",
        answers: [
            { text: "Tari Pendet", correct: false },
            { text: "Tari Saman", correct: false },
            { text: "Tari Kecak", correct: true },
            { text: "Tari Jaipong", correct: false }
        ]
    },
    {
        category: "Budaya",
        question: "Alat musik tradisional dari Sumatera Utara?",
        answers: [
            { text: "Angklung", correct: false },
            { text: "Gambus", correct: true },
            { text: "Seruling", correct: false },
            { text: "Gendang", correct: false }
        ]
    }
];

const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const categoryDisplay = document.getElementById('category');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const timerDisplay = document.getElementById('timer');

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 300; // 5 menit (300 detik)
let timerInterval;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectRandomQuestions(count = 5) {
    const shuffledQuestions = shuffleArray([...allQuestions]);
    return shuffledQuestions.slice(0, count);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timeLeft = 300; // Reset waktu ke 5 menit
    timerDisplay.textContent = formatTime(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz(true); // Parameter true menandakan waktu habis
        }
    }, 1000);
}

function startQuiz() {
    currentQuestions = selectRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    
    startTimer(); // Mulai timer

    startButton.classList.add('hide'); // Sembunyikan tombol start
    nextButton.classList.remove('hide'); // Tampilkan tombol next

    totalQuestionsSpan.textContent = currentQuestions.length;

    scoreDisplay.textContent = score;
    categoryDisplay.textContent = "Kategori: Acak";
    
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = currentQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    categoryDisplay.innerHTML = `Kategori: ${currentQuestion.category}`;

    shuffleArray(currentQuestion.answers).forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
        scoreDisplay.textContent = score;
    } else {
        selectedBtn.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.style.display = 'block';
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz(timeUp = false) {
    questionElement.innerHTML = `Kuis selesai! Skor Anda: ${score} dari ${currentQuestions.length}`;
    if (timeUp) {
        questionElement.innerHTML = `Waktu habis! Skor Anda: ${score} dari ${currentQuestions.length}`;
    }
    categoryDisplay.innerHTML = '';
    answerButtonsElement.innerHTML = '';

    nextButton.classList.add('hide');
    startButton.classList.remove('hide');
    startButton.textContent = "Mulai Ulang";
}

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        showNextQuestion();
    } else {
        finishQuiz();
    }
});

// CSS tambahan untuk menyembunyikan elemen
function addHideClass() {
    const style = document.createElement('style');
    style.innerHTML = `
        .hide {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

addHideClass();
