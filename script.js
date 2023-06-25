const wordLists = {
    easy: ['pizza', 'puzzle', 'museum', 'guitar', 'elephant', 'balloon', 'camera', 'turtle', 'orange', 'mirror', 'piano', 'monkey', 'jacket', 'cherry', 'rocket', 'rabbit', 'feather', 'cheese', 'chicken', 'garden', 'table', 'butter', 'cheetah', 'sweater', 'cookie', 'fountain', 'lemon', 'crayon', 'suitcase', 'ticket', 'candle', 'dinosaur', 'mango', 'bridge', 'tiger', 'beach', 'whale', 'ice cream', 'skate', 'snail', 'banana', 'compass', 'parrot', 'ocean', 'zebra', 'tractor', 'ladder', 'suit'],
    medium: ['photograph', 'olympics', 'ecosystem', 'brilliant', 'dialogue', 'thermostat', 'applause', 'determined', 'committee', 'cinnamon', 'entrepreneur', 'accordion', 'crocodile', 'chameleon', 'millennium', 'receipt', 'intelligence', 'pneumonia', 'maintenance', 'mediterranean', 'characteristics', 'opportunity', 'embarrass', 'exaggerate', 'squirrel', 'psychology', 'renaissance', 'symmetrical', 'disappointment', 'xylophone', 'boulevard', 'xenophobia', 'hieroglyphics', 'zucchini', 'delicious', 'perspective'],
    hard: ['condescend', 'discernible', 'unanimous', 'contemptuous', 'parachute', 'vengeance', 'acerbic', 'expunge', 'penurious', 'insidious', 'resplendent', 'bouillon', 'saccharine', 'presbyterian', 'scurrilous', 'boulevard', 'superintendent', 'teutonic', 'abysmal', 'bourgeois', 'acquiesce', 'andragogy', 'criterion', 'holistic', 'incongruous', 'juxtaposition', 'malapropism', 'obfuscate', 'onomatopoeia', 'soliloquy', 'colloquial', 'ubiquitous', 'courvoisier', 'rhythm', 'cnemidocoptes', 'surveillance', 'narcissistic', 'questionnaire', 'connoisseur', 'embezzlement', 'chaos', 'pneumonia', 'liaison', 'corollary', 'confetti', 'defalcation', 'bizarre', 'braggadocio', 'echelon', 'panache']
  };
  
  let currentDifficulty = '';
  let currentWord = '';
  let score = 0;
  let timeLeft = 15;
  let timerInterval;
  let wordCount = 0;
  let incorrectWords = [];
  
  // plays the audio of the word using google translate TTS
   function playAudio() {
    const audioButton = document.getElementById("audioButton");
    audioButton.disabled = true;

    const selectedWord = currentWord.toLowerCase();

    const audioUrl =    `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(selectedWord)}`;
    const audio = new Audio(audioUrl);
    
    audio.addEventListener("ended", () => {
      audioButton.disabled = false;
    });
  
  
    audio.play();
  }
  
  
  // Function to check if the entered word is correct
function checkWord() {
  const userInput = document.getElementById('wordInput').value.toLowerCase();
  const resultElement = document.getElementById('result');

  if (userInput === currentWord) {
    resultElement.textContent = 'Correct!';
    resultElement.className = 'correct';
    resultElement.updateratio;

    // Add points based on difficulty level
    if (currentDifficulty === 'hard') {
      score += 20;
    } else if (currentDifficulty === 'medium') {
      score += 10;
    } else if (currentDifficulty === 'easy') {
      score += 5;
    }

    // Generate a new word and reset the timer
    generateWord();
    resultElement.textContent = 'Correct!';
    resultElement.className = 'correct';
    resetTimer();
  } else {
    resultElement.textContent = 'Incorrect!';
    resultElement.className = 'incorrect';
    
    if (currentDifficulty === 'hard') {
      score -= 8;
    } else if (currentDifficulty === 'medium') {
      score -= 4;
    } else if (currentDifficulty === 'easy') {
      score -= 2;
    }

  }


  updateScore();
}
  
  // Function to generate a new word
function generateWord() {
  wordCount++;
  if (wordCount === 11) {
    document.getElementById('stopButton').click();
  }
  const difficulty = currentDifficulty;
  const wordList = wordLists[difficulty];

  if (wordList.length === 0) {
    stopGame();
    return;
  }

  const randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex].toLowerCase(); // Convert to lowercase
  wordList.splice(randomIndex, 1);

  document.getElementById('wordInput').value = '';
  document.getElementById('result').textContent = '';

  playAudio();
  updateScore();
  resetTimer(); // Reset the timer to 15 seconds
}
    


  function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
    localStorage.setItem('finalScore', score);
  }


  function updateTimer() {
    document.getElementById('timer').textContent = 'Time left: ' + timeLeft + ' seconds';
  }
  
  // Function to start the game
  function startGame(difficulty) {
    currentDifficulty = difficulty;
    score = 0;
  
    document.getElementById('audioButton').addEventListener('click', playAudio);
    document.getElementById('nextButton').addEventListener('click', generateWord);
    document.getElementById('stopButton').addEventListener('click', stopGame);
    document.getElementById('wordInput').addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        checkWord();
      }
    });
  
    generateWord();
    startTimer();
  }
  
  function startTimer() {
    updateTimer();
    clearInterval(timerInterval); // Clear the previous timer
    timerInterval = setInterval(function() {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timerInterval); // Clear the current timer
        generateWord();
      }
    }, 1000);
  }
  
  
  function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    updateTimer();
    startTimer();
  }
    
  // Function to stop the game
  function stopGame() {
    document.getElementById('audioButton').removeEventListener('click', playAudio);
    document.getElementById('nextButton').removeEventListener('click', generateWord);
    document.getElementById('stopButton').removeEventListener('click', stopGame);
    document.getElementById('wordInput').removeEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        checkWord();
      }
    });
  
    clearInterval(timerInterval);
    timeLeft = 15;
    updateTimer();

  }
  
  function loadDarkModePreference() {
    const darkModePreference = localStorage.getItem('darkModePreference');
    if (darkModePreference === 'true') {
      toggleDarkMode();
    }
  }
  

  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const darkModePreference = body.classList.contains('dark-mode');
    localStorage.setItem('darkModePreference', darkModePreference);
  }
        
function loadDarkModePreference() {
  const darkModePreference = localStorage.getItem('darkModePreference');
  if (darkModePreference === 'true') {
    toggleDarkMode();
  }
}

  // Get the difficulty level from the URL query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const selectedDifficulty = urlParams.get('difficulty');
  
  // Start the game with the selected difficulty
  if (selectedDifficulty && wordLists[selectedDifficulty]) {
    document.getElementById('gamePage').style.display = 'block';
    startGame(selectedDifficulty);
  } else {
    document.getElementById('difficultyPage').style.display = 'block';
  }
  


  window.addEventListener('DOMContentLoaded', loadDarkModePreference);


  window.addEventListener('DOMContentLoaded', () => {
    const finalScoreElement = document.getElementById('finalScore');
    const finalScore = localStorage.getItem('finalScore');
  
    if (finalScore) {
      finalScoreElement.textContent = finalScore;
    }
  });

