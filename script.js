let books = JSON.parse(localStorage.getItem("books")) || [];

displayBooks();

function addBook(){

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const rating = document.getElementById("rating").value;
    const progress = document.getElementById("progress").value;
    const finished = document.getElementById("finished").checked;

    if(title === "" || author === ""){
        alert("Bitte Titel und Autor eingeben.");
        return;
    }

    books.push({
        title,
        author,
        rating,
        progress,
        finished
    });

    saveBooks();
    displayBooks();

    document.querySelectorAll("input").forEach(input=>{
        if(input.type==="checkbox"){
            input.checked=false;
        }else{
            input.value="";
        }
    });

    document.getElementById("rating").value=1;
}

function displayBooks(){

    const list=document.getElementById("bookList");
    list.innerHTML="";

    books.forEach((book,index)=>{

        list.innerHTML+=`
            <div class="book">
                <h2>${book.title}</h2>
                <p><strong>Autor:</strong> ${book.author}</p>
                <p><strong>Bewertung:</strong> ${"⭐".repeat(book.rating)}</p>
                <p><strong>Fortschritt:</strong> ${book.progress}%</p>
                <p><strong>Status:</strong> ${book.finished ? "✅ Gelesen" : "📖 Wird gelesen"}</p>

                <button onclick="deleteBook(${index})">
                    Löschen
                </button>
            </div>
        `;
    });

}

function deleteBook(index){
    books.splice(index,1);
    saveBooks();
    displayBooks();
}

function saveBooks(){
    localStorage.setItem("books",JSON.stringify(books));
}
