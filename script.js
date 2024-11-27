const timers = JSON.parse(localStorage.getItem("timers")) || [];
const motivationalQuotes = [
    "Dream big. Work hard.",
    "Success comes to those who hustle.",
    "Every second counts.",
    "Be stronger than your excuses.",
    "Your future is created by what you do today."
];

const quoteEl = document.getElementById("quote");
const timersContainer = document.getElementById("timers-container");
const modal = document.getElementById("modal");
const addTimerBtn = document.getElementById("add-timer-btn");
const saveTimerBtn = document.getElementById("save-timer-btn");
const timerTitleInput = document.getElementById("timer-title");
const timerDateInput = document.getElementById("timer-date");
const modalTitle = document.getElementById("modal-title");

let editingIndex = null;

// Update motivational quote
function updateQuote() {
    quoteEl.textContent =
        motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}
setInterval(updateQuote, 5000);

// Render timers
function renderTimers() {
    timersContainer.innerHTML = "";
    timers.forEach((timer, index) => {
        const card = document.createElement("div");
        card.className = "timer-card";
        card.innerHTML = `
            <h3>${timer.title}</h3>
            <p>${new Date(timer.date).toLocaleString()}</p>
            <button onclick="deleteTimer(${index})">Delete</button>
        `;
        timersContainer.appendChild(card);
    });
    localStorage.setItem("timers", JSON.stringify(timers));
}

// Add or Edit Timer
saveTimerBtn.addEventListener("click", () => {
    const title = timerTitleInput.value;
    const date = timerDateInput.value;
    if (!title || !date) return alert("Please fill all fields!");

    if (editingIndex !== null) {
        timers[editingIndex] = { title, date };
        editingIndex = null;
    } else {
        timers.push({ title, date });
    }

    renderTimers();
    toggleModal();
});

// Delete Timer
function deleteTimer(index) {
    timers.splice(index, 1);
    renderTimers();
}

// Toggle Modal
function toggleModal(edit = false, index = null) {
    modal.classList.toggle("hidden");
    if (edit) {
        modalTitle.textContent = "Edit Timer";
        const timer = timers[index];
        timerTitleInput.value = timer.title;
        timerDateInput.value = timer.date;
        editingIndex = index;
    } else {
        modalTitle.textContent = "Add New Timer";
        timerTitleInput.value = "";
        timerDateInput.value = "";
    }
}

// Event Listeners
document.querySelector(".close").addEventListener("click", toggleModal);
addTimerBtn.addEventListener("click", () => toggleModal(false));

// Initialize
renderTimers();
updateQuote();
