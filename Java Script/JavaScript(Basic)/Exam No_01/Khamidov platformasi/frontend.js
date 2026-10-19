document.addEventListener('DOMContentLoaded', () => {
    // Soat DOM elementini yaratamiz
    const timerEl = document.createElement('div');
    timerEl.id = 'exam-timer';
    document.body.appendChild(timerEl);

    let totalTime = 3.5 * 60 * 60;
    const originalTime = totalTime;

    const breakInterval = 20 * 60;

    const interval = setInterval(() => {
        const hrs = Math.floor(totalTime / 3600);
        const mins = Math.floor((totalTime % 3600) / 60);
        const secs = totalTime % 60;

        timerEl.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;

        if (totalTime === 0) {
            clearInterval(interval);
            triggerFinalBreak();
            timerEl.classList.add('expired');
        } else if ((originalTime - totalTime) % breakInterval === 0) {
            triggerGlassBreak();
        }

        totalTime--;
    }, 1000);
});

function pad(num) {
    return num.toString().padStart(2, '0');
}

// 💥 Har 20 daqiqada shisha singani ko‘rsatish
// 🔁 Har 20 daqiqada sinish + vizual effekt
function triggerGlassBreak() {
    const overlay = document.createElement('div');
    overlay.className = 'glass-break';
    document.body.appendChild(overlay);

    // ➕ Ekran tebranishi + yorug‘lik
    triggerVisualEffect();

    setTimeout(() => {
        overlay.remove();
    }, 2500);
}

// 🔴 Yakuniy sinish + qizil signal + real effekt
function triggerFinalBreak() {
    const overlay = document.createElement('div');
    overlay.className = 'glass-break permanent';
    document.body.appendChild(overlay);

    triggerVisualEffect(); // final ham real ko‘rinsin
}


// 🔴 Tugaganda shisha sinib qoladi
function triggerFinalBreak() {
    const overlay = document.createElement('div');
    overlay.className = 'glass-break permanent';
    document.body.appendChild(overlay);
}
// 💥 Dars ketib shisha sinayotgandek effekt (vaqtinchalik)
function triggerVisualEffect() {
    document.body.classList.add('breaking-effect');

    setTimeout(() => {
        document.body.classList.remove('breaking-effect');
    }, 2500); // sinish davomiyligi
}
let userAnswers = [];
let correctAnswers = [];
let testData = [];

async function loadTestQuestions() {
    const res = await fetch("./data/test1.json");
    testData = await res.json();

    renderTest(); // testni chiqarish
}

function renderTest() {
    userAnswers = [];
    correctAnswers = [];

    const testList = document.querySelectorAll("li")[0].querySelector("ol");
    testList.innerHTML = "";

    const resultBox = document.getElementById("result-box") || document.createElement("div");
    resultBox.id = "result-box";
    resultBox.style.marginTop = "15px";
    resultBox.style.fontWeight = "bold";
    resultBox.style.color = "green";
    resultBox.innerHTML = "";

    testData.forEach((item, i) => {
        const randomIndex = Math.floor(Math.random() * item.variants.length);
        const questionData = item.variants[randomIndex];

        correctAnswers[i] = questionData.answer;

        const li = document.createElement("li");
        const questionText = document.createElement("p");
        questionText.textContent = `${i + 1}. ${questionData.question}`;
        li.appendChild(questionText);

        questionData.options.forEach((opt, optIndex) => {
            const label = document.createElement("label");
            label.style.display = "block";
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question-${i}`;
            radio.value = optIndex;

            radio.addEventListener("change", () => {
                userAnswers[i] = parseInt(radio.value);
            });

            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + opt));
            li.appendChild(label);
        });

        testList.appendChild(li);
    });

    const container = testList.parentElement;

    // 🔘 Testni yakunlash tugmasi
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "✅ Testni yakunlash";
    finishBtn.style.marginTop = "20px";
    finishBtn.onclick = showResult;

    

    container.appendChild(finishBtn);
    container.appendChild(resultBox);
}

function showResult() {
    const total = correctAnswers.length;

    if (userAnswers.length < total || userAnswers.includes(undefined)) {
        alert("❗ Iltimos, barcha savollarga javob bering.");
        return;
    }

    let score = 0;
    const testList = document.querySelectorAll("li")[0].querySelector("ol");

    testList.querySelectorAll("li").forEach((li, i) => {
        const radios = li.querySelectorAll("input[type='radio']");
        radios.forEach((radio, idx) => {
            const label = radio.parentElement;
            label.style.fontWeight = "normal";
            label.style.color = "#333";

            if (idx === correctAnswers[i]) {
                label.style.color = "green";
                label.style.fontWeight = "bold";
            }

            if (userAnswers[i] === idx && userAnswers[i] !== correctAnswers[i]) {
                label.style.color = "red";
            }

            radio.disabled = true; // test yakunlangach bloklanadi
        });

        if (userAnswers[i] === correctAnswers[i]) score++;
    });

    const percent = Math.round((score / total) * 100);
    const resultBox = document.getElementById("result-box");
    resultBox.innerHTML = `
    🧮 Sizning natijangiz: <strong>${score} / ${total} ball</strong><br>
    📊 <progress value="${score}" max="${total}"></progress> <strong>${percent}%</strong>
  `;
}

document.addEventListener("DOMContentLoaded", loadTestQuestions);
