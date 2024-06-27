let currentQuestion = 1;
const totalQuestions = 3;

function showQuestion(questionNumber) {
    document.querySelectorAll('.question-container').forEach((container) => {
        container.style.display = 'none';
    });
    document.getElementById(`question-${questionNumber}`).style.display = 'block';
    currentQuestion = questionNumber;
    restoreAnswer(questionNumber);
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.answer-option input').forEach(input => {
        input.addEventListener('change', function() {
            const questionNumber = parseInt(this.name.replace('question', ''));
            document.getElementById(`btn-${questionNumber}`).classList.add('answered');
            saveAnswer(questionNumber, this.value);
            if (questionNumber < totalQuestions) {
                showQuestion(questionNumber + 1);
            } else {
                document.getElementById('finalize-btn').style.display = 'block';
            }
        });
    });
    showQuestion(currentQuestion);
});

function saveAnswer(questionNumber, answer) {
    localStorage.setItem(`question${questionNumber}`, answer);
}

function restoreAnswer(questionNumber) {
    const savedAnswer = localStorage.getItem(`question${questionNumber}`);
    if (savedAnswer) {
        document.querySelectorAll(`#question-${questionNumber} input`).forEach(input => {
            if (input.value === savedAnswer) {
                input.checked = true;
            }
        });
    }
}

function finalizeQuiz() {
    window.location.href = 'thanks.html';
}

function navigate(direction) {
    const nextQuestion = currentQuestion + direction;
    if (nextQuestion > 0 && nextQuestion <= totalQuestions) {
        showQuestion(nextQuestion);
    }
}
