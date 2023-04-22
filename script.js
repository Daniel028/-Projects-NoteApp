const notesApp = document.querySelector('.container-for-the-app');

const addNoteBtn = document.querySelector('.add-note');

addNoteBtn.addEventListener('click', () => {
  addNotes();
});

const notesLs = JSON.parse(localStorage.getItem("notes")) || [];
const titles = JSON.parse(localStorage.getItem("titles")) || [];

const notesInfoArr = []
for (let i=0; i<notesLs.length; i++) {
  const noteInfo = {
    title: titles[i],
    note: notesLs[i]
  }
  notesInfoArr.push(noteInfo);

}


if (notesInfoArr.length > 0) {
  notesInfoArr.forEach((noteInfo) => {
    addNotes(noteInfo.note, noteInfo.title);
  });
}



function addNotes(text = "", title ="") {
  const notesCont = document.createElement('div');
  notesCont.classList.add('notes-app');
  notesCont.innerHTML = `
    <div class="tools">
      <div class="title-cont">
        <h3 class="title"></h3>
        <input type="text" class="input-title" placeholder="Title" value="">
      </div>
      <div class="buttons">
        <button class="edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="remove">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <div class="notes-cont">
      <p class="notes"></p>
      <textarea class="text"></textarea>
    </div>
  `;

  const titleEl = notesCont.querySelector('.title');
  const inputTitle = notesCont.querySelector('.input-title');
  const notes = notesCont.querySelector('.notes');
  const textarea = notesCont.querySelector('.text');

  textarea.value = text;
  titleEl.innerText = title;
  inputTitle.value = title;
  notes.textContent = text;

  const updateNotes = () => {
    titleEl.textContent = inputTitle.value;
    notes.textContent = textarea.value;
  
    titleEl.classList.remove('hidden');
    notes.classList.remove('hidden');
    inputTitle.classList.add('hidden');
    textarea.classList.add('hidden');
  };

  const editNotes = () => {
    inputTitle.classList.remove('hidden');
    textarea.classList.remove('hidden');
    titleEl.classList.add('hidden');
    notes.classList.add('hidden');
  };

  const editBtn = notesCont.querySelector('.edit');
  editBtn.addEventListener('click', ()=> {
    if (editBtn.classList.contains('active')) {
      updateNotes();
      editBtn.classList.remove('active');

      updateLS();
    } else {
      editNotes();
      editBtn.classList.add('active');

      updateLS();
    }
  });

  const removeBtn = notesCont.querySelector('.remove');
  removeBtn.addEventListener('click', ()=> {
    notesCont.remove();
    updateLS();
  })

  notesApp.appendChild(notesCont);

  if (inputTitle.value === "" || textarea.value === "") {
    editNotes();
    editBtn.classList.add('active');
  } else {
    updateNotes();
    editBtn.classList.remove('active');
  }

  textarea.addEventListener("input", (e) => {
      const { value } = e.target;

      notes.innerHTML = value;

      updateLS();
  });

  inputTitle.addEventListener("input", (e) => {
      const { value } = e.target;

      titleEl.innerHTML = value;

      updateLS();
  })

  // noteArr = localStorage.setItem('notes', JSON.stringify(noteInfo));
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const titleText = document.querySelectorAll(".input-title");

  const notes = [];
  const titles = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  titleText.forEach((title)=> {
    titles.push(title.value);
  })

  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("titles", JSON.stringify(titles));
}