var notes;
const userId = localStorage.getItem('userId');
import * as note from "../src/notes.js";

const appendNote = async (e) => {
    e.preventDefault();
    const text = document.querySelector('.noteText').value;
    await note.add(userId, text); 
    showNotes();
    document.querySelector('.noteText').value= "";    
    };

export default () => {
    const noteDestination = document.querySelector("body");
  
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("noteContainer");
    noteDestination.appendChild(noteContainer);
    const noteList = document.createElement("div");
    noteList.classList.add("noteList");
    noteContainer.appendChild(noteList);
    showNotes(); 
    const addNote = document.createElement("div");
    addNote.classList.add("addNote");
    noteContainer.appendChild(addNote);
    addNote.innerHTML = `
      <form class="add-notes">
      <textarea name="note" class="noteText" placeholder="New Note" required></textarea>
      <input type="submit" class="add-btn" value="ADD">        
      </form>    
      `;
      document.querySelector(".add-notes").addEventListener("submit", appendNote);
  };



const showNotes = async () => {
    notes = await note.get(userId) || [];
    if (!notes.length) return;
  document.querySelector(".noteList").innerHTML = notes.reduce(
    (html, note, i) => {
      return (html += `
          <li>
            <input type="checkbox" data-id=${note._id} id="item_${i}" ${note.done ? " checked" : ""} />
            <label for="item${i}" ${note.done ? 'class="done"' : ""}>${
        note.text
      }</label>
            <input type="submit" class="delete" value="DEL">
          </li><hr>
          `);
    }, ""
    
  );
  
};




// note.get(userId).then(data => {
//     console.log(data) })

// note.remove(userId, "5debdaef44b18f05147d4ba9")
//note.add(userId, "notatka")
//note.toggle(userId, "5debce7d933e913614509b21")
