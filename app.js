//ustawiane po zalogowaniu 
const mockID = '5deb8d1a06fe7638745c6806'
localStorage.setItem('userId', mockID);
//

const userId = localStorage.getItem('userId');
//const token = localStorage.getItem('token');

console.log(userId)

const gett = async id => {
    
    const get = await fetch(`http://localhost:3041/API/users/GET/${id}`);
    const data = await get.json();
    return data;
};

gett(userId).then(data => {
    console.log(data) })