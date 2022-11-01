

// Add note to local storage
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function(e) {

  let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("note-text");
  
    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please add Note Title and Details")
    }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value, 
    text: addTxt.value,
    createdat:new Date(),
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
    <p2 class="note-counter" style="color:red"><u>Note ${index + 1}</u></p2>
        <h6 class="card-title" style="color:blue">${element.title}</h6>
      
        <p class="card-text" style="color:black"> ${element.text}</p>
        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        <button id="${index}"onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>
        </div>
</div>`;
            
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
  
}

// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    if (addTitle.value !== "" || addTxt.value !== "") {
      return alert("Please clear the form before editing a note")
    } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

//     notesObj.findIndex((element, index) => {
//       addTitle.value = element.title;
//       addTxt.value = element.text;
//     })
  addTitle.value=notesObj[index].title;
    addTxt.value=notesObj[index].text;

    notesObj.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}

/// search functionality
showNotes();
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
//    console.log(inputVal)

     let noteCards = document.getElementsByClassName('noteCard');
     Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("h6")[0].innerText;
        let cardTxt1 = element.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt1)
        // console.log(cardTxt)
        if(cardTxt.includes(inputVal)||cardTxt1.includes(inputVal)){
            element.style.display = "block";
        }
        else{
          
            element.style.display = "none";
            
            
        }
    })
})


// Add note to local storage
