document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addButton");
    const searchInput = document.getElementById("searchInput");

    
    const colores = ["#d8c4a1","#a4b09a","#5e4b31","#60816e"];

    
    const mostrarPostIts = (filtro = "") => {
        const postList = document.getElementById("postList");
        postList.innerHTML = "";

        
        const postIts = JSON.parse(localStorage.getItem("postIts")) || [];

        
        const postItsFiltrados = postIts.filter(postIt => {
            return postIt.titulo.toLowerCase().includes(filtro.toLowerCase());
        });

        
        postItsFiltrados.forEach((postIt, index) => {
            const postItem = document.createElement("div");
            postItem.classList.add("post-item");

            
            postItem.style.backgroundColor = postIt.color; 

            postItem.innerHTML = `
                <h3>${postIt.titulo}</h3>
                <p>${postIt.descripcion}</p>
                <small>Guardado el: ${postIt.fechaHora}</small>
                <div class="post-buttons">
                    <button class="editButton" data-index="${index}">Edit</button>
                    <button class="deleteButton" data-index="${index}">Delete</button>
                </div>
            `;

            postList.appendChild(postItem);
        });

        
        document.querySelectorAll(".editButton").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                editarPostIt(index);
            });
        });

        document.querySelectorAll(".deleteButton").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                eliminarPostIt(index);
            });
        });
    };

    
    const editarPostIt = (index) => {
        const postIts = JSON.parse(localStorage.getItem("postIts")) || [];
        const postIt = postIts[index];

        
        document.querySelector(".titulo").value = postIt.titulo; 
        document.querySelector(".description").value = postIt.descripcion; 

        
        postIts.splice(index, 1);
        localStorage.setItem("postIts", JSON.stringify(postIts));

        
        mostrarPostIts();
    };

    const eliminarPostIt = (index) => {
        const postIts = JSON.parse(localStorage.getItem("postIts")) || [];
        postIts.splice(index, 1); 
        localStorage.setItem("postIts", JSON.stringify(postIts)); 
        mostrarPostIts(); 
    };

    
    mostrarPostIts();

    addButton.addEventListener("click", () => {
        const titulo = document.querySelector(".titulo").value; 
        const descripcion = document.querySelector(".description").value; 
        const fechaHora = new Date().toLocaleString(); 

        if (titulo.trim() === "" || descripcion.trim() === "") {
            alert("Por favor, completa tanto el título como la descripción.");
            return;
        }

        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)]; 
        const postIt = {
            titulo,
            descripcion,
            fechaHora,
            color: colorAleatorio 
        };

        
        let postIts = JSON.parse(localStorage.getItem("postIts")) || [];

        
        postIts.push(postIt);

        
        localStorage.setItem("postIts", JSON.stringify(postIts));

        
        document.querySelector(".titulo").value = ""; 
        document.querySelector(".description").value = ""; 

        mostrarPostIts();
        
        alert("Post-it guardado correctamente");
    });

    
    searchInput.addEventListener("input", () => {
        const filtro = searchInput.value;
        mostrarPostIts(filtro); 
    });
});
