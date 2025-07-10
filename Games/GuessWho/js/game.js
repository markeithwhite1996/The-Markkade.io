// js/game.js

let connectCode = localStorage.getItem("connectCode") || null;
let playerName = localStorage.getItem("playerName") || null;
let soundOn = true;

function getGameKey() {
  return `guesswho-${connectCode}`;
}

function getLogKey() {
  return `${getGameKey()}-log`;
}

function saveGameState(data) {
  localStorage.setItem(getGameKey(), JSON.stringify(data));
}

function loadGameState() {
  return JSON.parse(localStorage.getItem(getGameKey())) || {};
}

function addLog(message) {
  const logs = JSON.parse(localStorage.getItem(getLogKey())) || [];
  logs.push(message);
  localStorage.setItem(getLogKey(), JSON.stringify(logs));
}

function updateLogBox() {
  const logs = JSON.parse(localStorage.getItem(getLogKey())) || [];
  const box = document.getElementById("logBox");
  if (!box) return;
  box.innerHTML = logs.map(l => `<div>${l}</div>`).join("");
  box.scrollTop = box.scrollHeight;
}

function toggleSound() {
  soundOn = !soundOn;
  alert("Sound: " + (soundOn ? "ON" : "OFF"));
}

function playSFX(id) {
  if (!soundOn) return;
  const sfx = document.getElementById(id);
  if (sfx) sfx.play();
}

function askQuestion() {
  const game = loadGameState();
  if (game.currentTurn !== playerName) return alert("Not your turn!");
  addLog(`❓ ${playerName} asked a question`);
  playSFX("sfx-question");
  nextTurn();
}

function makeGuess() {
  const game = loadGameState();
  const guess = document.getElementById("guessSelect").value;
  if (!guess) return alert("Select a character to guess!");
  if (game.currentTurn !== playerName) return alert("Not your turn!");

  const correct = guess === game.whoCharacter;
  if (correct) {
    addLog(`✅ ${playerName} guessed ${guess} and WON!`);
    game.winner = playerName;
    game.gameState = "won";
    saveGameState(game);
    playSFX("sfx-win");
    showWinScreen();
  } else {
    addLog(`❌ ${playerName} guessed ${guess} — WRONG`);
    playSFX("sfx-wrong");
    nextTurn();
  }
}

function nextTurn() {
  const game = loadGameState();
  const index = game.guessers.indexOf(game.currentTurn);
  const nextIndex = (index + 1) % game.guessers.length;
  game.currentTurn = game.guessers[nextIndex];
  saveGameState(game);
}

function updateTurnUI() {
  const game = loadGameState();
  const turn = game.currentTurn;
  const isMyTurn = turn === playerName;
  const el = document.getElementById("currentTurnDisplay");
  if (el) el.textContent = turn;
  const btnGuess = document.getElementById("btnGuess");
  const btnAsk = document.getElementById("btnAsk");
  if (btnGuess) btnGuess.disabled = !isMyTurn;
  if (btnAsk) btnAsk.disabled = !isMyTurn;
}

function showWinScreen() {
  const game = loadGameState();
  if (game.gameState !== "won") return;
  const panel = document.getElementById("winPanel");
  const info = document.getElementById("winnerInfo");
  if (panel && info) {
    panel.style.display = "block";
    info.innerHTML = `🎉 ${game.winner} guessed correctly!<br>Character: ${game.whoCharacter}`;
  }
}

function playAgain() {
  const game = loadGameState();
  game.round = (game.round || 1) + 1;
  game.gameState = "active";
  game.currentTurn = game.guessers[0];
  delete game.winner;
  saveGameState(game);
  localStorage.setItem(getLogKey(), JSON.stringify([]));
  location.href = "GuessWho.html";
}

// Init (runs every second to sync UI/logs)
setInterval(() => {
  updateTurnUI();
  updateLogBox();
  showWinScreen();
}, 1000);

function submitWhoName() {
  const nameInput = document.getElementById('playerNameInput');
  const codeInput = document.getElementById('connectCodeInput');
  const playerNameVal = nameInput.value.trim();
  const connectCodeVal = codeInput.value.trim();

  if (!playerNameVal) {
    alert('Please enter your name!');
    return;
  }
  if (!connectCodeVal || connectCodeVal.length !== 4) {
    alert('Please enter a valid 4-digit Connect Code!');
    return;
  }

  // Save playerName and connectCode locally
  localStorage.setItem('playerName', playerNameVal);
  localStorage.setItem('connectCode', connectCodeVal);

  // Load game data by code
  const gameDataStr = localStorage.getItem(`guesswho-${connectCodeVal}`);
  if (!gameDataStr) {
    alert('Game not found with that Connect Code!');
    return;
  }

  // Parse game data
  const gameData = JSON.parse(gameDataStr);

  // Validate player is a guesser in this game
  if (!gameData.guessers.includes(playerNameVal)) {
    alert('Your name is not registered as a guesser in this game!');
    return;
  }

  // Save initial player data
  localStorage.setItem('role', 'guesser');

  // Show game UI
  document.getElementById('guessBoard').style.display = 'block';

  // Hide input fields
  nameInput.style.display = 'none';
  codeInput.style.display = 'none';
  event.target.style.display = 'none'; // hide the button itself

  // Initialize guess UI
  initGuessUI(gameData);
}
