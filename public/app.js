import initNotes from '/src/initNotes.js'

//ustawiane po zalogowaniu 
const mockID = '5dec24f25c633f29701ffbb8'
localStorage.setItem('userId', mockID);



initNotes("TODO ✏", 1);
initNotes("In Progres", 2);
initNotes("✔ Done", 3);
