import * as note from './src/notes.js';

//ustawiane po zalogowaniu 
const mockID = '5deb8d1a06fe7638745c6806'
localStorage.setItem('userId', mockID);


const userId = localStorage.getItem('userId');
//const token = localStorage.getItem('token');



note.get(userId).then(data => {
    console.log(data) })

    // note.remove(userId, "5debdaef44b18f05147d4ba9")
    //note.add(userId, "notatka")
    //note.toggle(userId, "5debce7d933e913614509b21")

