import showNotes from "/src/showNotes.js"
import events from "/src/events.js"



export default (title = "✔ TODO", enu) => {
  const noteDestination = document.querySelector(".note-main");

  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  noteContainer.classList.add(`note-container${enu}`);
  noteDestination.appendChild(noteContainer);
  noteContainer.dataset.position = enu;
  noteContainer.innerHTML = `<h1 class="list-title">${title}</h1>`;
  const noteList = document.createElement("div");
  noteList.classList.add(`note-list${enu}`);
  noteList.classList.add(`note-list`);
  noteList.dataset.position = enu;
  noteContainer.appendChild(noteList);
  showNotes();
  const addNote = document.createElement("div");
  addNote.classList.add("add-note");
  noteContainer.appendChild(addNote);
  addNote.innerHTML = `
      <form class="note-form note-form${enu}">
      <textarea name="note" class="note-text note-text${enu}" placeholder="New Note" required></textarea>
      <input type="submit" class="add-btn" value="ADD">        
      </form>    
      `;
 

  events(enu); 
};

