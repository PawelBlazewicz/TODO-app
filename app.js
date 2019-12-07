//ustawiane po zalogowaniu 
const mockID = '5deb8d1a06fe7638745c6806'
localStorage.setItem('userId', mockID);
//
const API = 'http://localhost:3041/API/users'

const userId = localStorage.getItem('userId');
//const token = localStorage.getItem('token');

const getNotes = async id => {
    
    const get = await fetch(`${API}/GET/${id}`);
    const data = await get.json();
    return data.notes;
};

getNotes(userId).then(data => {
    console.log(data) })


const addNote = (note, id) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify({text : note}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`${API}/PUT/note/${id}`, options)
}


