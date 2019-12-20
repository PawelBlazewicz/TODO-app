import showNotes from "/src/showNotes.js";
import events from "/src/events.js";

export default (title = "✔ TODO", position) => {
  const noteDestination = document.querySelector(".note-main");
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  noteContainer.classList.add(`note-container${position}`);
  noteContainer.dataset.position = position;
  noteContainer.innerHTML = `<h1 class="list-title">${title}</h1>`;
  const noteList = document.createElement("div");
  noteList.classList.add(`note-list`);
  noteContainer.appendChild(noteList);
  const addNote = document.createElement("div");
  addNote.classList.add("add-note");
  addNote.innerHTML = `
        <form class="note-form">
        <textarea name="note" class="note-text" placeholder="New Note" required></textarea>
        <input type="submit" class="add-btn" value="ADD">        
        </form>    
      `;
  noteContainer.appendChild(addNote);
  noteDestination.appendChild(noteContainer);

  showNotes();
  events(position);
};
