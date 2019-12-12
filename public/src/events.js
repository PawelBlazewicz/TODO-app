import * as note from "/src/notes.js";
import showNotes from "/src/showNotes.js";

const appendNote = async e => {
  e.preventDefault();
  const position = e.target.parentElement.parentElement.dataset.position;
  const text = document.querySelector(`.note-text${position}`).value;
  await note.add(text, position);
  showNotes(position);
  document.querySelector(`.note-text${position}`).value = "";
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
  console.log(e.target.dataset.id, e.target.dataset.position, newPosition);
  if (e.target.dataset.position !== newPosition && newPosition) {
    await note.move(e.target.dataset.id, newPosition);
    showNotes();
  }
}

function getNewPosition(e) {
  e.preventDefault();
  console.log(e.target.dataset.position);
  if (e.target.dataset.position) {
    newPosition = e.target.dataset.position;
  }
}
export default (enu) => {
  document
    .querySelector(`.note-list${enu}`)
    .addEventListener("dragstart", startDrag);
  document
    .querySelector(`.note-list${enu}`)
    .addEventListener("dragend", endDrag);
  document
    .querySelector(`.note-list${enu}`)
    .addEventListener("dragenter", getNewPosition);
  document
    .querySelector(`.note-form${enu}`)
    .addEventListener("submit", appendNote);
  document
    .querySelector(`.note-list${enu}`)
    .addEventListener("click", menageNotes);
};
