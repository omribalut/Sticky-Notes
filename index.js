let myForm = document.querySelector('form');
let itemList = document.querySelector(".list-of-items");


//another option to add notes
// document.querySelector('.add').addEventListener("click", function() { //if this option is applied, add class need to be written in the html instead of the onclick
//     let noteText = myForm.elements["todoText"].value;
//     let noteDate = myForm.elements["todoDate"].value;
//     let noteHour = myForm.elements["tofoHour"].value;

//     let noteIndex = createIndex();

//     let noteObj = {
//         NoteText: noteText,
//         NoteDate: noteDate,
//         NoteHour: noteHour,
//         NoteIndex: noteIndex
//     };

//     let todoList = getArrayFromLocalStorage();
//     todoList.push(noteObj);
//     let noteObjValue = JSON.stringify(todoList);
//     localStorage.setItem('objDetails', noteObjValue);
//     createNoteElement(noteObj);

// });

function addnote() {
    let noteText = myForm.elements["todoText"].value;
    let noteDate = myForm.elements["todoDate"].value;
    let noteHour = myForm.elements["todoHour"].value;
    let noteIndex = createIndex()

    let noteObj = {
        NoteText: noteText,
        NoteDate: noteDate,
        NoteHour: noteHour,
        noteIndex: noteIndex //if key and value in an object is written the same then we can write only the key name

    };

    if (noteText.length < 1 || noteDate.length < 1 || noteHour.length < 1) {

        return alert("Please Fill The Form")

    } else {
        let todoList = getArrayFromLocalStorage();
        todoList.push(noteObj);
        let noteObjValue = JSON.stringify(todoList);
        localStorage.setItem('objDetails', noteObjValue); //setItem function looks for a key in the first argument and sets it's value to be the second argument.
        //if the key doesnt exists in the loclstorage, it creates a new key called objDetails and maps its value to be noteObjValue
        createNoteElement(noteObj)
    }
}

function getArrayFromLocalStorage() {
    let arrayStringify = localStorage.getItem('objDetails');
    let array
    if (arrayStringify) {
        //In case there's users array in localStorage we parse it
        array = JSON.parse(arrayStringify)
    } else {
        array = [] //In case there's not users array in localStorage
    }
    return array
}

function createIndex() {
    let myIndex;
    let arrayStringify = localStorage.getItem('objDetails');
    if (arrayStringify) {
        let array = JSON.parse(arrayStringify);
        myIndex = array.length;
    } else {
        myIndex = 0;
    }

    return myIndex;
}



function createNoteElement(obj) {
    let main = document.createElement('div');
    main.classList.add("main");
    main.setAttribute('id', 'index' + obj.noteIndex);

    let mission = document.createElement('div');
    mission.classList.add("mission");

    let textP = document.createElement('p');
    textP.classList.add("text");
    textP.innerHTML = obj.NoteText;

    let dateHour = document.createElement('div');
    dateHour.classList.add("hour-div");

    let dateP = document.createElement('p');
    dateP.classList.add("date");
    dateP.innerHTML = obj.NoteDate;

    let hourP = document.createElement('p');
    hourP.classList.add("hour");
    hourP.innerHTML = obj.NoteHour;

    let mydelete = document.createElement('div');
    mydelete.innerHTML = ("<button onclick=deleteNote(" + obj.noteIndex + ") class='btn-close'></button>")
    mydelete.setAttribute('id', obj.noteIndex);
    mydelete.classList.add("deleteX");

    main.appendChild(mydelete);
    dateHour.appendChild(dateP);
    dateHour.appendChild(hourP);
    mission.appendChild(textP);
    main.appendChild(mission);
    main.appendChild(dateHour);
    itemList.appendChild(main);

}

function showNotesOnScreen() {
    let arrayStringify = localStorage.getItem('objDetails');
    let array = JSON.parse(arrayStringify)
    if (array) {


        for (let obj of array) {
            createNoteElement(obj);

        }
    }
}

showNotesOnScreen();

function deleteNote(noteIndex) {
    let todoList = getArrayFromLocalStorage()
    let newTodoList = todoList.filter(function(obj) {
            if (obj.noteIndex === noteIndex) {
                return false
            } else {
                return true
            }
        })
        //*another option
        /*todoList.filter(obj => obj.noteIndex !== noteIndex)*/

    const noteToDelete = document.querySelector("#index" + noteIndex) //deletes the notes from the application
    noteToDelete.remove()

    let noteObjValue = JSON.stringify(newTodoList); //removes from local storage
    localStorage.setItem('objDetails', noteObjValue); //removes from local storage
}

function deleteAllNotes() {
    localStorage.removeItem("objDetails")
    const noteElements = document.querySelectorAll(".list-of-items .main")
    for (let noteElement of noteElements) {
        noteElement.remove()
    }
}