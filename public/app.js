import initNotes from '/src/initNotes.js'
//const initNotes = require('../src/initNotes.js')

//ustawiane po zalogowaniu 
const mockID = '5dec24f25c633f29701ffbb8'
localStorage.setItem('userId', mockID);



initNotes("✔ TODO List ✏", 1);
initNotes("✏ In progres", 2);
initNotes("✔ Done", 3);
