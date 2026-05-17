let flashcards =
    JSON.parse(localStorage.getItem("flashcards")) || [];

let currentIndex = 0;

const question = document.getElementById("question");
const answer = document.getElementById("answer");

const showBtn = document.getElementById("showBtn");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const questionInput =
    document.getElementById("questionInput");

const answerInput =
    document.getElementById("answerInput");

const addBtn = document.getElementById("addBtn");

const updateBtn =
    document.getElementById("updateBtn");

const editBtn = document.getElementById("editBtn");

const deleteBtn =
    document.getElementById("deleteBtn");

function saveFlashcards() {
    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}

function displayFlashcard() {

    if (flashcards.length === 0) {
        question.textContent =
            "No Flashcards Available";

        answer.textContent = "";

        return;
    }

    question.textContent =
        flashcards[currentIndex].question;

    answer.textContent =
        flashcards[currentIndex].answer;

    answer.classList.add("hidden");
}

showBtn.addEventListener("click", () => {
    answer.classList.toggle("hidden");
});

nextBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    currentIndex =
        (currentIndex + 1) % flashcards.length;

    displayFlashcard();
});

prevBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    currentIndex =
        (currentIndex - 1 + flashcards.length)
        % flashcards.length;

    displayFlashcard();
});

addBtn.addEventListener("click", () => {

    const q = questionInput.value.trim();

    const a = answerInput.value.trim();

    if (!q || !a) {
        alert("Please fill all fields");
        return;
    }

    flashcards.push({
        question: q,
        answer: a
    });

    saveFlashcards();

    questionInput.value = "";
    answerInput.value = "";

    currentIndex = flashcards.length - 1;

    displayFlashcard();
});

editBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    questionInput.value =
        flashcards[currentIndex].question;

    answerInput.value =
        flashcards[currentIndex].answer;

    addBtn.classList.add("hidden");

    updateBtn.classList.remove("hidden");
});

updateBtn.addEventListener("click", () => {

    flashcards[currentIndex].question =
        questionInput.value;

    flashcards[currentIndex].answer =
        answerInput.value;

    saveFlashcards();

    questionInput.value = "";
    answerInput.value = "";

    addBtn.classList.remove("hidden");

    updateBtn.classList.add("hidden");

    displayFlashcard();
});

deleteBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    flashcards.splice(currentIndex, 1);

    if (currentIndex >= flashcards.length) {
        currentIndex = flashcards.length - 1;
    }

    saveFlashcards();

    displayFlashcard();
});

displayFlashcard();
