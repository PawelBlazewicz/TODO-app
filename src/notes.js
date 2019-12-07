const API = 'http://localhost:3041/API/users'

export const get = async id => {
    
    const get = await fetch(`${API}/GET/${id}`);
    const data = await get.json();
    return data.notes;
};

export const add = (id, note) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify({text : note}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`${API}/PUT/note/${id}`, options)
}

export const remove = (id, noteId) => {
    const options = {
        method: 'DELETE',
        body: JSON.stringify({id : noteId}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`${API}/DELETE/note/${id}`, options)
}