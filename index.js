
const myaddbtn = document.getElementById('mybtn');
const cardContainer = document.getElementById('card-container');

const myLocalStorage = () => {
    const textAreaData= document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
     })

     localStorage.setItem('notes', JSON.stringify(notes))
};

const newaddnote = (text = '') => {  
    const note = document.createElement('div');
    note.classList.add('card');

    const htmlData = ` 
    <div class="operations">
    <button class="deletbtn"><i class="fa-solid fa-trash"></i></button>
    <button class="editbtn"><i class="fa-solid fa-pen-to-square"></i></button>
    <div class="main ${text ? "" : "hidden" }"></div>
    <textarea class="${text ? "hidden" : "" }"></textarea>
</div>`
note.insertAdjacentHTML('afterbegin', htmlData);
cardContainer.appendChild(note);

//getting reference
const editbtn = note.querySelector('.editbtn');
const deletebtn = note.querySelector('.deletbtn');
const myMain = note.querySelector('.main');
const textArea = note.querySelector('textarea');


textArea.value = text;
myMain.innerHTML = text;

//delete part
deletebtn.addEventListener('click', () => {
    note.remove();
    // console.log(note);
    myLocalStorage();
})


//toggle class
editbtn.addEventListener('click', () => {
    myMain.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
})

//data view in textarea

textArea.addEventListener('change', (Event) => {
    let value = Event.target.value; 
    myMain.innerHTML = value;
    myLocalStorage();
})

}    
const notes = JSON.parse(localStorage.getItem('notes')); 

if(notes){
    notes.forEach((note) => newaddnote(note))
}

myaddbtn.addEventListener('click', () => newaddnote())