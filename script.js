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
    ],
    "2° Año - Semestre 1": [
        { nombre: "Fisiología I", prereq: ["Bioquímica humana", "Anatomía I", "Biofísica"] },
        { nombre: "Psicología médica" },
        { nombre: "Embriología", prereq: ["Genética", "Anatomía II"] },
        { nombre: "Bioestadística", prereq: ["Matemáticas"] },
        { nombre: "Inmunología", prereq: ["Microbiología", "Genética"] }
    ],
    "2° Año - Semestre 2": [
        { nombre: "Fisiología II", prereq: ["Fisiología I"] },
        { nombre: "Relación médico paciente", prereq: ["Psicología médica"] },
        { nombre: "Histología", prereq: ["Embriología"] },
        { nombre: "Salud pública y epidemiología", prereq: ["Bioestadística"] },
        { nombre: "Epistemología médica", prereq: ["Microbiología", "Fisiología I", "Psicología médica", "Embriología"] },
        { nombre: "Desarrollo sostenible" }
    ],
    "3° Año - Semestre 1": [
        { nombre: "Fisiopatología I", prereq: ["Inmunología", "Fisiología II"] },
        { nombre: "Farmacología", prereq: ["Bioquímica humana", "Fisiología II"] },
        { nombre: "Semiología I", prereq: ["Anatomía II", "Fisiología II"] },
        { nombre: "Epistemología y ciclo vital", prereq: ["Salud pública y epidemiología", "Epistemología médica"] },
        { nombre: "Anatomía patológica", prereq: ["Anatomía II", "Histología"] },
        { nombre: "Inglés técnico", prereq: ["Inglés básico"] }
    ],
    "3° Año - Semestre 2": [
        { nombre: "Fisiopatología II", prereq: ["Fisiopatología I"] },
        { nombre: "Farmacología II", prereq: ["Farmacología"] },
        { nombre: "Semiología II", prereq: ["Semiología I"] },
        { nombre: "Anatomía Patológica II", prereq: ["Anatomía patológica"] },
        { nombre: "Responsabilidad Social y emprendimiento" }
    ],
    "4° Año - Semestre 1": [
        { nombre: "Medicina interna I", prereq: ["Fisiopatología II", "Semiología II"] },
        { nombre: "Pediatría", prereq: ["Fisiopatología II", "Semiología II"] },
        { nombre: "Medicina legal", prereq: ["Anatomía Patológica II"] },
        { nombre: "Gestión en salud", prereq: ["Salud pública y epidemiología"] },
        { nombre: "Cirugía", prereq: ["Fisiopatología II", "Semiología II"] },
        { nombre: "Historia de la medicina" }
    ],
    "4° Año - Semestre 2": [
        { nombre: "Medicina interna II", prereq: ["Medicina interna I"] },
        { nombre: "Pediatría II", prereq: ["Pediatría"] },
        { nombre: "Psicología social", prereq: ["Historia de la medicina"] },
        { nombre: "Gestión en salud II", prereq: ["Gestión en salud"] },
        { nombre: "Cirugía II", prereq: ["Cirugía"] },
        { nombre: "Salud comunitaria", prereq: ["Historia de la medicina"] },
        { nombre: "Preparación para la vida laboral" }
    ],
    "5° Año - Semestre 1": [
        { nombre: "Salud mental y psiquiatría I", prereq: ["Psicología médica"] },
        { nombre: "Ginecología y obstetricia I", prereq: ["Fisiopatología II", "Semiología II"] },
        { nombre: "Subespecialidades I", prereq: ["Pediatría II", "Cirugía II", "Medicina interna II"] },
        { nombre: "Antropología médica", prereq: ["Historia de la medicina"] },
        { nombre: "Urgencia", prereq: ["Pediatría II", "Cirugía II", "Medicina interna II"] }
    ],
    "5° Año - Semestre 2": [
        { nombre: "Salud mental y psiquiatría II", prereq: ["Salud mental y psiquiatría I"] },
        { nombre: "Ginecología y obstetricia II", prereq: ["Ginecología y obstetricia I"] },
        { nombre: "Subespecialidades II", prereq: ["Subespecialidades I"] },
        { nombre: "Metodología de la investigación", prereq: ["Gestión en salud II"] },
        { nombre: "Urgencia II", prereq: ["Urgencia"] },
        { nombre: "Red de salud", prereq: ["Pediatría", "Salud mental y psiquiatría I", "Ginecología y obstetricia I", "Subespecialidades I", "Medicina interna II", "Gestión en salud II"] }
    ],
    "6° Año - Semestre 1": [
        { nombre: "Internado ginecología y obstetricia", prereq: ["Ginecología y obstetricia II"] },
        { nombre: "Internado cirugía", prereq: ["Cirugía II"] }
    ],
    "6° Año - Semestre 2": [
        { nombre: "Internado pediatría", prereq: ["Pediatría II"] }
    ],
    "7° Año - Semestre 1": [
        { nombre: "Internado de atención primaria en salud", prereq: ["Pediatría II", "Salud mental y psiquiatría II", "Subespecialidades II", "Medicina interna II", "Gestión en salud II"] }
    ],
    "7° Año - Semestre 2": [
        { nombre: "Internado medicina interna", prereq: ["Medicina interna II"] },
        { nombre: "Integrador de todos los conocimientos médicos", prereq: ["Internado ginecología y obstetricia", "Internado cirugía", "Internado pediatría", "Internado de atención primaria en salud"] }
    ]
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
