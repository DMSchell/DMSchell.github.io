
/*
//This should hopefully take the place of import
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
 { GoogleGenerativeAI } from "@google/generative-ai";
 
const Your_API_Key = "AIzaSyDCKm38Gqmwu1YywB6paoSkVXlJ-qLHKUk"
const genAI = new GoogleGenerativeAI(Your_API_Key);

*/
var NoteContainer = document.getElementById('container');
var DragTarget = null;

const notebooks = [];
const notebookNames = [];
notebooks[0] = [];
var CurrentNotebook = 0;

NoteContainer.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('note-dragger')) {
        DragTarget = event.target;
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startDivPos = { x: DragTarget.offsetLeft, y: DragTarget.offsetTop };


        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);


        function onMouseMove(event) {
            var newPosition = {
                x: startDivPos.x + (event.clientX - startMousePos.x),
                y: startDivPos.y + (event.clientY - startMousePos.y)
            };
       
            //change the position of the note
            //sometimes the whole container moves so that's not good
            DragTarget.style.left = newPosition.x + 'px';
            DragTarget.style.top = newPosition.y + 'px';
           
        }


        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
    if (event.target.classList.contains('note-sizer')) {
        DragTarget = event.target;
        event.preventDefault();
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startSize = { width: DragTarget.parentElement.offsetWidth, height: DragTarget.parentElement.offsetHeight };


        function onMouseMove(event) {
            var newSize = {
                width: startSize.width + (event.clientX - startMousePos.x),
                height: startSize.height + (event.clientY - startMousePos.y)
            };


            // Update the new-note size
            DragTarget.parentElement.style.width = newSize.width + 'px';
            DragTarget.parentElement.style.height = newSize.height + 'px';
            DragTarget.parentElement.parentElement.style.width = newSize.width + 2 + 'px';
            DragTarget.parentElement.parentElement.style.height = newSize.height + 'px';
        }


        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);


        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
});


// Create a custom context menu
var contextMenu = document.createElement('div');
contextMenu.id = 'custom-context-menu';
contextMenu.style.display = 'none';
contextMenu.style.position = 'absolute';
contextMenu.style.zIndex = '1000';
contextMenu.style.backgroundColor = '#343a40';
contextMenu.style.color = '#ccc';
contextMenu.style.border = '1px solid #ccc';
contextMenu.style.paddingRight = '25px';
contextMenu.style.fontSize = '12';
contextMenu.innerHTML = '<ul><li class="context-menu-item" id="option1">Create a new note</li><li class="context-menu-item" id="option2">Create a new notebook</li> <li class="context-menu-item" id="option3">Rename notebook</li> <li class="context-menu-item" id="option4">Select a notebook</li> </ul>';
document.body.appendChild(contextMenu);


// Add event listeners to the document
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    contextMenu.style.display = 'block'; // Show the custom context menu
    contextMenu.style.left = event.pageX + 'px'; // Position the menu at the cursor
    contextMenu.style.top = event.pageY + 'px';
});

//making a note
document.getElementById('option1').addEventListener('click', function() {
    contextMenu.style.display = 'none';
    MakeNewNote();
});
document.getElementById('option2').addEventListener('click', function() {
    contextMenu.style.display = 'none';
    MakeNewNotebook();
});
document.getElementById('option3').addEventListener('click', function() {
    contextMenu.style.display = 'none';
});
document.getElementById('option4').addEventListener('click', function() {
    contextMenu.style.display = 'none';
    notebookSelectionMenu.style.display = 'block'; // Show the notebook selection menu
});

document.addEventListener('click', function(event) {
    if (event.target !== contextMenu && event.target.id !== 'option1') {
        contextMenu.style.display = 'none';
    }
});



var notebookSelectionMenu = document.createElement('div');
notebookSelectionMenu.id = 'notebook-selection-menu';
notebookSelectionMenu.style.display = 'none';
notebookSelectionMenu.style.position = 'absolute';
notebookSelectionMenu.style.zIndex = '1000';
notebookSelectionMenu.style.backgroundColor = '#343a40';
notebookSelectionMenu.style.color = '#ccc';
notebookSelectionMenu.style.border = '1px solid #ccc';
notebookSelectionMenu.style.paddingRight = '25px';
notebookSelectionMenu.style.fontSize = '12';
document.body.appendChild(notebookSelectionMenu);

document.addEventListener('click', function(event) {
    if (event.target !== notebookSelectionMenu && event.target.id !== 'option4') {
        notebookSelectionMenu.style.display = 'none';
    }
});



function MakeNewNote() {
    var newNoteDragger = document.createElement('div');
    newNoteDragger.className = 'note-dragger'
    newNoteDragger.textContent = ' ';
    document.getElementById('container').appendChild(newNoteDragger);
    var newNote = document.createElement('div');
    newNote.className = 'new-note';
    newNote.textContent = 'edit me!';
    newNote.setAttribute('contenteditable', 'true');
    newNoteDragger.appendChild(newNote)
    var noteSizer = document.createElement('div');
    noteSizer.className = 'note-sizer';
    noteSizer.textContent = ' ';
    noteSizer.setAttribute('contenteditable', 'false');
    newNote.appendChild(noteSizer);

    notebooks[CurrentNotebook][notebooks[CurrentNotebook].length] = newNoteDragger;
    

    // Set the contenteditable attribute of the parent element to false
    // newNote.setAttribute('contenteditable', 'false');

    
    // Attach the event listener to the button
    // LOOK AT POSSIBLE ERRORS YOU FOOL
    /*
    button.addEventListener("click", send_text_to_ai);
    function send_text_to_ai() {
        // THIS COULD BE AN ERROR THAT NEW NOW IS IN QUOTES
        var note_text = document.getElementById("new-note").innerText;
        note_text = note_text.replace('AI Expand', '');
        document.getElementById("new-note").innerText = run(note_text);
    }
    */
    
}
/*
async function run(input) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});


  const prompt = input;


  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
*/

function MakeNewNotebook(){
    CurrentNotebook = notebooks.length
    notebookNames[CurrentNotebook] = "notebook";
    notebooks[CurrentNotebook] = [];
    // Clear the container
    var container = document.getElementById('container');
    container.innerHTML = '';
    
    // Set the current notebook
    Notebooks();
}

function Notebooks(){
    var notebooksMenu = document.getElementById('notebook-selection-menu');

    // Clear the container before adding new buttons
    notebooksMenu.innerHTML = '';

    // Create a button for each notebook
    notebooks.forEach(function(notebook, index) {
        createNotebookButton(notebookNames[index], notebook, index);
    });
}

function updateNotebookButtons(index) {
    // Select all notebook buttons
    var notebookButtons = document.getElementsByClassName('notebookButton');

    // Create a copy of the collection to avoid live collection issues
    var notebookButtonsCopy = Array.prototype.slice.call(notebookButtons);

    // Loop through each notebook button and update its class
    notebookButtonsCopy.forEach(function(button, i) {
        if (i === index) {
            // If this is the notebook with the correct index, set its class to 'notebookButtonSelected'
            button.className = 'notebookButtonSelected';
        } else {
            // Otherwise, set its class to 'notebookButtonUnselected'
            button.className = 'notebookButtonUnselected';
        }
    });
}

Notebooks();
updateNotebookButtons(0);

document.getElementById('create-note-button').addEventListener('click', MakeNewNote);
document.getElementById('create-notebook-button').addEventListener('click', MakeNewNotebook);

var renameNotebookModal = document.getElementById('renameNotebookModal');
var renameNotebookButton = document.getElementById('option3');
var closeModalSpan = document.getElementsByClassName('close-button')[0];

renameNotebookButton.onclick = function() {
  renameNotebookModal.style.display = 'block';
}

closeModalSpan.onclick = function() {
  renameNotebookModal.style.display = 'none';
  newNotebookNameInput.value = '';
}

window.onclick = function(event) {
  if (event.target == renameNotebookModal) {
    renameNotebookModal.style.display = 'none';
    newNotebookNameInput.value = '';
  }
}

var renameNotebookSubmitButton = document.getElementById('renameNotebookButton');
var newNotebookNameInput = document.getElementById('newNotebookName');
renameNotebookSubmitButton.onclick = function() {
  var newName = newNotebookNameInput.value;
  if (newName) {
    var notebookButton = document.querySelector('.notebookButtonSelected');
    if (notebookButton) {
      notebookButton.textContent = newName;
    }
    renameNotebook(CurrentNotebook, newName);
    renameNotebookModal.style.display = 'none';
    newNotebookNameInput.value = '';
  }
}

//-----------------------------------------------------------------------------------------------

function createNotebookButton(name, notebook, index) {
    var notebooksMenu = document.getElementById('notebook-selection-menu');
    var button = document.createElement('li');
    button.className = 'notebookButton';
    button.textContent = name;
    button.onclick = function() {
        var resetButtons = document.getElementsByClassName('notebookButtonUnselected')
        for (var i =  0; i < resetButtons.length; i++) {
            resetButtons[i].className = 'notebookButton';
        }
        var resetButtons = document.getElementsByClassName('notebookButtonSelected')
        for (var i =  0; i < resetButtons.length; i++) {
            resetButtons[i].className = 'notebookButton';
        }
        updateNotebookButtons(index);
        var container = document.getElementById('container');
        container.innerHTML = '';
        CurrentNotebook = index;
        notebook.forEach(function(note) {
            container.appendChild(note);
        });
    };
    notebooksMenu.appendChild(button);
    return button;
}

function renameNotebook(index, newName) {
    if (index >=  0 && index < notebookNames.length) {
        notebookNames[index] = newName;
        var notebooksMenu = document.getElementById('notebook-selection-menu');
        var buttons = notebooksMenu.getElementsByClassName('notebookButton');
    }
}

MakeNewNotebook();
notebooks();