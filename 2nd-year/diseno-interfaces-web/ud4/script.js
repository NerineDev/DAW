const video = document.getElementById("videoCurso");
const quiz = document.getElementById("quiz");
const estadoVideo = document.getElementById("estadoVideo");

const quizForm = document.getElementById("quizForm");
const quizFeedback = document.getElementById("quizFeedback");
const btnComprobar = document.getElementById("btnComprobar");

const tablaCapitulos = document.getElementById("tablaCapitulos");

const RESPUESTAS = { q1: "b", q2: "b", q3: "c" };
let quizLocked = false;

// Muestra el cuestionario cuando el vídeo finaliza
function mostrarQuiz() {
  try { video.pause(); } catch (_) {}

  quiz.classList.remove("oculto");
  estadoVideo.textContent = "Vídeo finalizado. Completa el cuestionario para comprobar la comprensión.";

  // Cada vez que aparece el cuestionario, se permite un intento nuevo
  unlockQuizUI();

  try { quiz.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (_) {}
}

// Bloquea el cuestionario tras enviarlo
function lockQuizUI() {
  quizLocked = true;
  if (!quizForm) return;

  quizForm.classList.add("is-locked");

  quizForm.querySelectorAll("select, button").forEach((el) => {
    el.disabled = true;
  });

  if (btnComprobar) btnComprobar.textContent = "Reproduce el vídeo para reintentar";
}

// Desbloquea el cuestionario para permitir un nuevo intento
function unlockQuizUI() {
  quizLocked = false;
  if (!quizForm) return;

  quizForm.classList.remove("is-locked");

  quizForm.querySelectorAll("select, button").forEach((el) => {
    el.disabled = false;
  });

  // Limpia marcas por pregunta
  document.querySelectorAll(".quiz-q").forEach((box) => {
    box.classList.remove("is-correct", "is-wrong");
    const mark = box.querySelector(".quiz-mark");
    if (mark) {
      mark.classList.add("oculto");
      mark.textContent = "";
    }
  });

  // Limpia feedback global
  if (quizFeedback) {
    quizFeedback.classList.add("oculto");
    quizFeedback.textContent = "";
  }

  if (btnComprobar) btnComprobar.textContent = "Comprobar";
}

function markQuestion(qKey, isCorrect) {
  const box = document.querySelector(`.quiz-q[data-q="${qKey}"]`);
  if (!box) return;

  box.classList.toggle("is-correct", isCorrect);
  box.classList.toggle("is-wrong", !isCorrect);

  const mark = box.querySelector(".quiz-mark");
  if (mark) {
    mark.classList.remove("oculto");
    mark.textContent = isCorrect ? "✅ Correcto" : "❌ Incorrecto";
  }
}

if (video) {
  video.addEventListener("ended", () => {
    mostrarQuiz();
  });

  // Si reproduce el vídeo otra vez, desbloquea el cuestionario para reintentar
  video.addEventListener("play", () => {
    if (quizLocked) unlockQuizUI();
  });
}

if (tablaCapitulos && video) {
  tablaCapitulos.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-time]");
    if (!btn) return;

    const t = Number(btn.dataset.time);
    if (Number.isNaN(t)) return;

    try {
        video.currentTime = t;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
    } catch (_) {}

    if (estadoVideo) estadoVideo.textContent = `Saltaste a ${t}s (capítulo).`;
  });
}

// Gestiona la evaluación del cuestionario
if (quizForm) {
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (quizLocked) return;

    const data = new FormData(quizForm);
    const keys = Object.keys(RESPUESTAS);

    let puntos = 0;

    keys.forEach((k) => {
      const ok = data.get(k) === RESPUESTAS[k];
      if (ok) puntos++;
      markQuestion(k, ok);
    });

    if (quizFeedback) {
      quizFeedback.classList.remove("oculto");
      quizFeedback.textContent =
        `Resultado: ${puntos} / ${keys.length}. ` +
        (puntos === keys.length ? "✅ Excelente comprensión." : "🔁 Puedes reintentar reproduciendo el vídeo.");
    }

    lockQuizUI();
  });
}

const audio = document.getElementById("audioConferencia");
const audioCaption = document.getElementById("audioCaption");

if (audio && audioCaption) {
  audioCaption.classList.remove("oculto");

  audio.addEventListener("timeupdate", () => {
    const t = audio.currentTime;

    if (t < 5) {
      audioCaption.textContent = "Este va a ser el primero de una serie de vídeos donde vamos a aprender HTML desde cero.";
    } else if (t < 10) {
      audioCaption.textContent = "En esta serie veremos todas las etiquetas HTML y aprenderemos a utilizarlas en un contexto práctico.";
    } else {
      audioCaption.textContent = "";
    }
  });

  audio.addEventListener("pause", () => {
    // no se resetea, mantiene el último mensaje mostrado
  });

  audio.addEventListener("ended", () => {
    audioCaption.textContent = "";
  });
}