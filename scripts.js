const botonAgregar = document.getElementById("boton-agregar");
const inputTarea = document.getElementById("tarea");
const categorias = document.querySelectorAll(".categoria");
const botonModos = document.querySelectorAll(".modos button");
const pendienteLista = document.querySelector('[data-category="pendiente"] .lista-tareas');
let tareaArrastrada = null;

// Agregar Tarea
botonAgregar.addEventListener("click", () => {
    const tareaTexto = inputTarea.value.trim();
    if (!tareaTexto) {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("tarjeta");
    nuevaTarea.draggable = true;
    nuevaTarea.innerHTML = `
        <span>${tareaTexto}</span>
        <button class="boton-borrar">❌</button>
    `;

    nuevaTarea.addEventListener("dragstart", handleDragStart);
    nuevaTarea.addEventListener("dragend", handleDragEnd);

    nuevaTarea.querySelector(".boton-borrar").addEventListener("click", () => {
        nuevaTarea.remove();
        actualizarContadores();
    });

    pendienteLista.appendChild(nuevaTarea);
    inputTarea.value = "";
    actualizarContadores();
});

// Funciones de Drag and Drop
function handleDragStart(e) {
    tareaArrastrada = e.target;
    e.target.style.opacity = "0.5";
}

function handleDragEnd(e) {
    tareaArrastrada = null;
    e.target.style.opacity = "1";
}

categorias.forEach((categoria) => {
    const lista = categoria.querySelector(".lista-tareas");

    if (lista) {
        lista.addEventListener("dragover", (e) => {
            e.preventDefault();
            lista.style.backgroundColor = "rgba(0, 123, 255, 0.2)";
        });

        lista.addEventListener("dragleave", () => {
            lista.style.backgroundColor = "";
        });

        lista.addEventListener("drop", (e) => {
            e.preventDefault();
            if (tareaArrastrada) {
                lista.appendChild(tareaArrastrada);
                lista.style.backgroundColor = "";
                actualizarContadores();
            }
        });
    }
});

// Temas de color
botonModos.forEach((boton) => {
    boton.addEventListener("click", () => {
        const tema = boton.getAttribute("data-theme");
        document.body.setAttribute("data-theme", tema);
    });
});


function actualizarContadores() {
    categorias.forEach((categoria) => {
        const contador = categoria.querySelector(".contador");
        const lista = categoria.querySelector(".lista-tareas");
        const total = lista ? lista.querySelectorAll(".tarjeta").length : 0;
        contador.textContent = `(${total})`;
    });
}





