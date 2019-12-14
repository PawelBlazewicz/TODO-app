import * as note from "/src/notes.js";
import showNotes from "/src/showNotes.js";

const appendNote = async e => {
  e.preventDefault();
  const position = e.target.parentElement.parentElement.dataset.position;
  const text = document.querySelector(`.note-container${position} .note-text`).value;
  await note.add(text, position);
  showNotes(position);
  document.querySelector(`.note-container${position} .note-text`).value = "";
};

const menageNotes = async e => {
  const id = e.target.parentElement.dataset.id;
  if (e.target.matches("input.delete")) {
    await note.remove(id);
  } else {
    const id = e.target.parentElement.dataset.id;
    await note.toggle(id);
  }
  showNotes();
};

var newPosition = "";
function startDrag(e) {
  setTimeout(function() {
    e.target.classList.add("hide");
    newPosition = e.target.dataset.position;
  });
}

async function endDrag(e) {
  e.preventDefault();
  e.target.classList.remove("hide");
  if (e.target.dataset.position !== newPosition && newPosition) {
    await note.move(e.target.dataset.id, newPosition);
    showNotes(e.target.dataset.position, newPosition);
  }
}

function getNewPosition(e) {
  e.preventDefault();
  if (e.target.dataset.position) {
    newPosition = e.target.dataset.position;
  }
}
export default (position) => {
  document
    .querySelector(`.note-container${position} .note-list`)
    .addEventListener("dragstart", startDrag);
  document
    .querySelector(`.note-container${position} .note-list`)
    .addEventListener("dragend", endDrag);
  document
    .querySelector(`.note-container${position}`)
    .addEventListener("dragenter", getNewPosition);
  document
    .querySelector(`.note-container${position} .note-form`)
    .addEventListener("submit", appendNote);
  document
    .querySelector(`.note-container${position} .note-list`)
    .addEventListener("click", menageNotes);
};
