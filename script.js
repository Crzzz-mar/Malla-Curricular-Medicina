const malla = {
    "1° Año - Semestre 1": [
        { nombre: "Biología celular y molecular" },
        { nombre: "Química" },
        { nombre: "Matemáticas" },
        { nombre: "Anatomía I" },
        { nombre: "Tecnología e Innovación" }
    ],
    "1° Año - Semestre 2": [
        { nombre: "Bioquímica humana", prereq: ["Biología celular y molecular"] },
        { nombre: "Microbiología", prereq: ["Biología celular y molecular"] },
        { nombre: "Genética", prereq: ["Biología celular y molecular"] },
        { nombre: "Anatomía II", prereq: ["Anatomía I"] },
        { nombre: "Biofísica" },
        { nombre: "Inglés básico" }
    ]
    // Puedes seguir agregando más semestres aquí
};

const container = document.getElementById("malla-container");

function guardarEstado(nombre, estado) {
    localStorage.setItem(nombre, JSON.stringify(estado));
}

function cargarEstado(nombre) {
    const data = localStorage.getItem(nombre);
    return data ? JSON.parse(data) : null;
}

function verificarPrerequisitos(prereq) {
    if (!prereq) return true;
    return prereq.every(ramo => {
        const estado = cargarEstado(ramo);
        return estado && estado.aprobado;
    });
}

function crearRamo(ramo) {
    const estado = cargarEstado(ramo.nombre) || { aprobado: false };
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = ramo.nombre;
    div.dataset.nombre = ramo.nombre;
    div.dataset.tooltip = ramo.prereq ? "Requiere: " + ramo.prereq.join(", ") : "";

    if (!verificarPrerequisitos(ramo.prereq)) {
        div.dataset.bloqueado = "true";
    } else if (estado.aprobado) {
        div.dataset.aprobado = "true";
    }

    div.addEventListener("click", () => {
        if (div.dataset.bloqueado === "true") return;
        estado.aprobado = !estado.aprobado;
        guardarEstado(ramo.nombre, estado);
        location.reload();
    });

    return div;
}

Object.entries(malla).forEach(([semestre, ramos]) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h2>${semestre}</h2>`;
    const cont = document.createElement("div");
    cont.className = "ramos";
    ramos.forEach(ramo => cont.appendChild(crearRamo(ramo)));
    semDiv.appendChild(cont);
    container.appendChild(semDiv);
});
