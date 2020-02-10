const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const mobileText = document.getElementById("mobileKey");
const livesLeft = document.getElementById("lives-left");
const hintButton = document.getElementById("hintButton");
const hintsNum = document.getElementById("hintsNum");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "announced",
  "appease",
  "accounts",
  "applied",
  "active",
  "approachable",
  "acute",
  "armageddon",
  "armament",
  "amount",
  "amigo",
  "authority",
  "baby",
  "bishop",
  "black",
  "blanket",
  "bald",
  "bangle",
  "banquet",
  "bonanza",
  "battered",
  "bunch",
  "business",
  "byproduct",
  "carpet",
  "comment",
  "common",
  "configure",
  "construct",
  "copy",
  "coping",
  "chase",
  "comb",
  "corn",
  "direct",
  "dartboard",
  "disregard",
  "discourtesy",
  "distribution",
  "defeat",
  "deep",
  "drip",
  "dried",
  "double",
  "epic",
  "euro",
  "even",
  "evenly",
  "flip",
  "frog",
  "face",
  "fused",
  "funny",
  "flavour",
  "gold",
  "goal",
  "good",
  "gorp",
  "government",
  "group",
  "gym",
  "garden",
  "guilt",
  "hello",
  "heather",
  "half",
  "home","inflex","inquest", "improvise","joker","junction","jet","joke","knee", "knock","kid","kick","loop","like","living","lunch","hour",
  "lacrosse","maid","main","mimic","mint","miss","mister","molt","nut","neck","noun","nipped","odor","old","overwhelm","overstay",
  "oyster",""
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
words.splice(words.indexOf(selectedWord), 1);
console.log(words);

const correctLetters = [];
const wrongLetters = [];
var totHints = 10;
var totLives = 3;

function displayWords() {
  wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            letter => `<span class="letters">
            ${correctLetters.includes(letter) ? letter : ""}
            </span>`
          )
          .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    // finalMessage.innerText = "Congratulations!!!\nYou Have Won";
    // popup.style.display = "flex";
    mobileText.value = "";
    wordEl.innerText = "";
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    words.splice(words.indexOf(selectedWord), 1);
    displayWords();
    updateWrongLettersEl();
  }
}

// Update the Wrong Letters

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong Letters</p>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    // display parts
    if (index < errors) part.style.display = "block";
    else part.style.display = "none";
  });

  if (wrongLetters.length === figureParts.length) {
    if (totLives > 0) {
      totLives--;
      livesLeft.innerHTML = totLives;
      correctLetters.splice(0);
      wrongLetters.splice(0);
      selectedWord = words[Math.floor(Math.random() * words.length)];
      displayWords();
      updateWrongLettersEl();
    } else {
      finalMessage.innerText = "Unfortunately You Lost";
      popup.style.display = "flex";
    }
  }
}

//  Show Notification

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// finding input letter if matched or not

function findingLetter(letter) {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWords();
    } else showNotification();
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongLettersEl();
    } else showNotification();
  }
}

// Mobile Key Word
function changeValue(value) {
  const letter = value.toLowerCase();
  mobileText.value = "";
  findingLetter(letter);
}

//  KeyBoard Press

window.addEventListener("keydown", e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    findingLetter(letter);
  }
});

// restart game

playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  totLives = 3;
  totHints = 10;
  livesLeft.innerHTML = totLives;
  hintsNum.innerHTML = totHints;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  words.splice(words.indexOf(selectedWord), 1);
  displayWords();
  updateWrongLettersEl();
  popup.style.display = "none";
});

// hint button click

hintButton.addEventListener("click", () => {
  if (totHints > 0) {
    console.log(totHints);
    var arr = selectedWord.split("");
    var arr2 = [];
    arr2 = arr.filter(letr => !correctLetters.includes(letr));
    const anyLetter = Math.floor(Math.random() * arr2.length);
    findingLetter(arr2[anyLetter]);
    totHints--;
    hintsNum.innerHTML = totHints;
  } else {
    hintButton.style.cursor = "not-allowed";
    hintButton.disabled = true;
    hintButton.style.transform = "scale(1)";
  }
});

displayWords();
