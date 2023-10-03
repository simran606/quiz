const questions = document.querySelectorAll('.question');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const calculateScoreButton = document.getElementById('calculate-score-button');
const quizForm = document.getElementById('quiz-form');
const scoreModal = document.getElementById('score-modal');
const scoreText = document.getElementById('score-text');
let currentQuestionIndex = 0;
let userAnswers = [];


// Array of correct answers (index corresponds to question number)
const correctAnswers = ['a', 'b', 'c', 'a', 'd'];

function startTimer(duration, display, index) {
  let timeLeft = duration;

  function updateTimer() {
    display.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.click();  // Automatically move to the next question when time is up
    }

    timeLeft--;
  }

  // Initial call to set up the timer
  updateTimer();

  // Set up the timer to update every second
  timer = setInterval(updateTimer, 1000);
}

function showQuestion(index) {

  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = '';  // Clear previous timer display

  // Start the timer for each question
  startTimer(10, timerDisplay, index);



  const feedbackElement = document.getElementById(`feedback-${index + 1}`);
  feedbackElement.textContent = '';  // Clear previous feedback

  questions.forEach((question, i) => {
    if (i === index) {
      question.style.display = 'block';
    } else {
      question.style.display = 'none';
    }
  });

  const radioOptions = document.querySelectorAll(`input[name="q${index + 1}"]`);
  radioOptions.forEach(option => {
    option.addEventListener('change', () => {
      nextButton.disabled = false;

      // Check if the selected option is correct
      const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
      if (selectedOption) {
        const isCorrect = selectedOption.value === correctAnswers[index];
        feedbackElement.textContent = isCorrect ? 'Correct answer!' : 'Wrong answer. Try again.';
        feedbackElement.style.color = isCorrect ? 'green' : 'red';
      }
    });
  });

  if (index === questions.length - 1) {
    submitButton.style.display = 'block';
    nextButton.style.display = 'none';
    calculateScoreButton.style.display = 'none';
  } else {
    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
    calculateScoreButton.style.display = 'none';
  }
}

showQuestion(currentQuestionIndex);

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();
  calculateScoreButton.style.display = 'block';
});

nextButton.addEventListener('click', () => {

  clearInterval(timer);  // Clear the timer when moving to the next question

  const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = selectedOption.value;

    // Clear the feedback when moving to the next question
    const feedbackElement = document.getElementById(`feedback-${currentQuestionIndex + 1}`);
    feedbackElement.textContent = '';
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
    nextButton.disabled = true;
  }

    
});

submitButton.addEventListener('click', () => {
  const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = selectedOption.value;
  }

  // Calculate the score when the last question is submitted
  calculateScore();

  // Hide the submit button to prevent multiple submissions
  submitButton.disabled = true;
});


calculateScoreButton.addEventListener('click', () => {
  // if (userAnswers.length !== questions.length) {
  //   alert('Please answer all questions before calculating the score.');
  //   return;
  // }

  // if (userAnswers.length !== questions.length) {
  //   alert('Please answer all questions before calculating the score.');
  //   return;
  // }
  
    let totalScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        totalScore += 10;  // Add 10 points for each correct answer
      }
    }


  scoreText.textContent = `Your total score is: ${totalScore}`;
  scoreModal.style.display = 'block';

  feedbackText.textContent = '';

});


window.addEventListener('click', (event) => {
  if (event.target === scoreModal) {
    scoreModal.style.display = 'none';
  }
});

function restartQuiz() {
  // Reset variables and start the quiz again from the first question
  scoreModal.style.display = 'none';
  window.location.reload(); // This will refresh the page
}






