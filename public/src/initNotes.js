var notes;
const userId = localStorage.getItem("userId");
import * as note from "/src/notes.js";

const appendNote = async e => {
  e.preventDefault();
  const position = e.target.parentElement.parentElement.dataset.position;
  const text = document.querySelector(`.noteText${position}`).value;
  await note.add(userId, text, position);
  showNotes(position);
  document.querySelector(`.noteText${position}`).value = "";
};

const menageNotes = async e => {
  const id = e.target.parentElement.dataset.id;
  if (e.target.matches("input.delete")) {
    await note.remove(userId, id);
  } else {
    const id = e.target.parentElement.dataset.id;
    await note.toggle(userId, id);
  }
  showNotes(1,2,3);
};

export default (title, enu) => {
  const noteDestination = document.querySelector(".test");

  const noteContainer = document.createElement("div");
  noteContainer.classList.add("noteContainer");
  noteDestination.appendChild(noteContainer);
  noteContainer.dataset.position = enu;
  noteContainer.innerHTML = `<h1>${title || "✔ TODO"}</h1>`;
  const noteList = document.createElement("div");
  noteList.classList.add(`noteList${enu}`);
  noteContainer.appendChild(noteList);
  showNotes(1, 2, 3);
  const addNote = document.createElement("div");
  addNote.classList.add("addNote");
  noteContainer.appendChild(addNote);
  addNote.innerHTML = `
      <form class="add-notes add-notes${enu}">
      <textarea name="note" class="noteText noteText${enu}" placeholder="New Note" required></textarea>
      <input type="submit" class="add-btn" value="ADD">        
      </form>    
      `;
  document
    .querySelector(`.add-notes${enu}`)
    .addEventListener("submit", appendNote);
  document
    .querySelector(`.noteList${enu}`)
    .addEventListener("click", menageNotes);
  document
    .querySelector(`.noteList${enu}`)
    .addEventListener("dragstart", startDrag  );
    document
    .querySelector(`.noteList${enu}`)
    .addEventListener("dragend", endDrag  );
    document
    .querySelector(`.noteList${enu}`)
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
  notes = (await note.get(userId)) || [];
  if (!notes.length) return;
  args.forEach(position => {
    document.querySelector(`.noteList${position}`).innerHTML = notes
      .filter(note => note.position == position)
      .reduce(
        (html, note, i) => {
          return (html += `
            <li data-id=${note._id} data-position=${position} draggable="true">
            <input type="checkbox"  id="item_${i}" ${note.done ? " checked" : ""} />
            <label for="item${i}" ${note.done ? 'class="done"' : ""}>${note.text}</label>
            <input type="submit" class="delete" value="DEL">
          </li><hr>
          `);
        },
        "" //initial value of accumulator
      );
  });
};