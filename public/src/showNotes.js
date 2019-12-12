import {get as getNote} from "/src/notes.js"

export default async (...args) => {
    const notes = (await getNote()) || [];
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