const API = 'http://localhost:3041/API/users'
//const token = localStorage.getItem('token'); 


export const get = async id => {
    
    const get = await fetch(`${API}/GET/${id}`);
    const data = await get.json();
    return data.notes;
};

export const add = async (id, note, position) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify({text : note, position: position}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(`${API}/PUT/note/${id}`, options);
}

export const remove = async (id, noteId) => {
    const options = {
        method: 'DELETE',
        body: JSON.stringify({id : noteId}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(`${API}/DELETE/note/${id}`, options)
}

export const toggle = async (id, noteId) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({id : noteId}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(`${API}/PATCH/note/${id}`, options)
}