// Model for handling data
let notesModel = {
  // Method to fetch notes from localStorage
  getNotes: function () {
    let notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  },

  // Method to save notes to localStorage
  saveNotes: function (notesObj) {
    localStorage.setItem("notes", JSON.stringify(notesObj));
  },
};

// View for rendering UI
let notesView = {
  // Method to render notes in UI
  renderNotes: function (notesObj) {
    let html = "";
    notesObj.forEach(function (element, index) {
      html += `
          <div class="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${index}" class="note-btn delete-btn">Delete Note</button>
            <button id="${index}" class="note-btn edit-btn">Edit Note</button>
          </div>`;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }
  },
};

// Controller for event handling and logic
let notesController = {
  // Method to initialize the application
  init: function () {
    this.setupEventListeners();
    this.showNotes();
  },

  // Method to set up event listeners
  setupEventListeners: function () {
    let addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", this.addNote.bind(this));

    let notesElm = document.getElementById("notes");
    notesElm.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-btn")) {
        let index = event.target.id;
        notesController.deleteNote(index);
      } else if (event.target.classList.contains("edit-btn")) {
        let index = event.target.id;
        notesController.editNote(index);
      }
    });
  },

  // Method to add a new note
  addNote: function () {
    let addTitle = document.getElementById("note-title").value;
    let addTxt = document.getElementById("note-text").value;

    if (addTitle === "" || addTxt === "") {
      alert("Please add Note Title and Details");
      return;
    }

    let notesObj = notesModel.getNotes();
    notesObj.push({ title: addTitle, text: addTxt });
    notesModel.saveNotes(notesObj);
    notesView.renderNotes(notesObj);

    document.getElementById("note-title").value = "";
    document.getElementById("note-text").value = "";
  },

  // Method to delete a note
  deleteNote: function (index) {
    let notesObj = notesModel.getNotes();
    notesObj.splice(index, 1);
    notesModel.saveNotes(notesObj);
    notesView.renderNotes(notesObj);
  },

  // Method to edit a note
  editNote: function (index) {
    let notesObj = notesModel.getNotes();
    let noteToEdit = notesObj[index];
    document.getElementById("note-title").value = noteToEdit.title;
    document.getElementById("note-text").value = noteToEdit.text;

    notesObj.splice(index, 1);
    notesModel.saveNotes(notesObj);
    notesView.renderNotes(notesObj);
  },

  // Method to show notes
  showNotes: function () {
    let notesObj = notesModel.getNotes();
    notesView.renderNotes(notesObj);
  },
};

// Initialize the application
notesController.init();
