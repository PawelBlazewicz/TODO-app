var notes;
import * as note from "/src/notes.js";

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
  showNotes(1,2,3);
};

export default (title, enu) => {
  const noteDestination = document.querySelector(".note-main");

  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  noteDestination.appendChild(noteContainer);
  noteContainer.dataset.position = enu;
  noteContainer.innerHTML = `<h1 class="list-title">${title || "✔ TODO"}</h1>`;
  const noteList = document.createElement("div");
  noteList.classList.add(`note-list${enu}`);
  noteContainer.appendChild(noteList);
  showNotes(1, 2, 3);
  const addNote = document.createElement("div");
  addNote.classList.add("add-note");
  noteContainer.appendChild(addNote);
  addNote.innerHTML = `
      <form class="note-form note-form${enu}">
      <textarea name="note" class="note-text note-text${enu}" placeholder="New Note" required></textarea>
      <input type="submit" class="add-btn" value="ADD">        
      </form>    
      `;
  document
    .querySelector(`.note-form${enu}`)
    .addEventListener("submit", appendNote);
  document
    .querySelector(`.note-list${enu}`)
    .addEventListener("click", menageNotes);
  document
    .querySelector(`.note-list${enu}`)
    .addEventListener("dragstart", startDrag  );
    document
    .querySelector(`.note-list${enu}`)
    .addEventListener("dragend", endDrag  );
    document
    .querySelector(`.note-list${enu}`)
    .addEventListener("dragenter", drop );
};

function startDrag(e) {  
  setTimeout(function(){
    e.target.classList.add('hide');
  });
}

function endDrag(e) {  
  e.target.classList.remove('hide');
  //console.log(e.target)//.dataset.position); 
}

function drop(e) {  
    e.target.classList.remove('hide');
    event.preventDefault();
    console.log(e.target,"xd")//.dataset.position);
  }

const showNotes = async (...args) => {
  notes = (await note.get()) || [];
  if (!notes.length) return;
  args.forEach(position => {
    document.querySelector(`.note-list${position}`).innerHTML = notes
      .filter(note => note.position == position)
      .reduce(
        (html, note, i) => {
          return (html += `
            <li data-id=${note._id} data-position=${position} draggable="true" class="note-box">
            <label for="item${i}" ${note.done ? 'class="done task-text"' : 'class="task-text"'}>${note.text}</label>
            <input type="submit" class="delete" value="DEL">
          </li>
          `);
        },
        "" //initial value of accumulator
      );
  });
};