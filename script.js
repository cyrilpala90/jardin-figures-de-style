const questions = [
  {
    scene: "riviere.jpg",
    narration: "🌊 Une rivière murmure : « Je t’ai attendu une éternité ! »",
    options: ["Litote", "Métaphore", "Hyperbole", "Antiphrase"],
    correct: "Hyperbole"
  },
  {
    scene: "colline.jpg",
    narration: "🍃 Sur une colline paisible : « Il n’est pas mécontent de son succès. »",
    options: ["Litote", "Euphémisme", "Oxymore", "Périphrase"],
    correct: "Litote"
  },
  {
    scene: "jardin.jpg",
    narration: "🌼 Un vieil arbre murmure : « Cet homme est un lion dans l’arène. »",
    options: ["Comparaison", "Métaphore", "Personnification", "Métonymie"],
    correct: "Métaphore"
  }
];

let currentQuestion = 0;

const narration = document.getElementById("narration");
const choices = document.getElementById("choices");
const sceneImage = document.getElementById("scene-image");

const bonneReponse = new Audio("assets/sounds/bonne-reponse.mp3");
const mauvaiseReponse = new Audio("assets/sounds/mauvaise-reponse.mp3");

function showQuestion(index) {
  const q = questions[index];
  sceneImage.style.backgroundImage = `url('assets/images/${q.scene}')`;
  narration.innerText = q.narration;
  choices.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, q.correct);
    choices.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    bonneReponse.play();
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(() => showQuestion(currentQuestion), 1000);
    } else {
      endGame(true);
    }
  } else {
    mauvaiseReponse.play();
    endGame(false);
  }
}

function endGame(success) {
  narration.innerHTML = success
    ? "🗝️ Tu as obtenu la clé ! Le Maître te salue."
    : "⛓️ Tu es piégé dans le jardin. Un ami devra venir te délivrer…";
  choices.innerHTML = "";
}

window.onload = () => {
  document.getElementById("ambiance").volume = 0.4;
  showQuestion(currentQuestion);
};
