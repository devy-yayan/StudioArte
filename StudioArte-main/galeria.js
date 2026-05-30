// ============================================================
// galeria.js - Script para la Página de Galería
// StudioArt-e | Taller de Tecnologías Web
// ============================================================

// ─────────────────────────────────────────────
// 1. CREAR EL MODAL EN EL DOM
//    Se ejecuta apenas carga la página.
//    Inserta el HTML del modal al final del <body>
//    para que esté listo antes de que el usuario haga clic.
// ─────────────────────────────────────────────
function crearModal() {
  const modal = document.createElement("div");
  modal.id = "modal-obra";
  modal.innerHTML = `
    <div id="modal-contenido">
      <button id="btn-cerrar-modal" onclick="cerrarModal()">✕ Cerrar</button>
      <h2 id="modal-titulo"></h2>
      <img id="modal-imagen" src="" alt="">
      <p id="modal-descripcion"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // Cierra el modal si el usuario hace clic FUERA del contenido
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
      cerrarModal();
    }
  });
}

// ─────────────────────────────────────────────
// 2. ABRIR MODAL CON DETALLES DE UNA OBRA
//    Recibe el título, src de la imagen y descripción.
//    Rellena el modal con esos datos y lo hace visible.
// ─────────────────────────────────────────────
function abrirModal(titulo, imagenSrc, descripcion) {
  const modal = document.getElementById("modal-obra");
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-imagen").src = imagenSrc;
  document.getElementById("modal-imagen").alt = titulo;
  document.getElementById("modal-descripcion").textContent = descripcion;

  // Mostrar el modal agregando la clase "visible"
  modal.classList.add("visible");
  // Bloquear el scroll del fondo mientras el modal está abierto
  document.body.style.overflow = "hidden";
}

// ─────────────────────────────────────────────
// 3. CERRAR EL MODAL
//    Oculta el modal y restaura el scroll de la página.
// ─────────────────────────────────────────────
function cerrarModal() {
  const modal = document.getElementById("modal-obra");
  modal.classList.remove("visible");
  document.body.style.overflow = "";
}

// ─────────────────────────────────────────────
// 4. AGREGAR BOTÓN "VER DETALLE" A CADA TARJETA
//    Recorre todas las tarjetas (.tarjeta-obra) y les
//    agrega un botón que al hacer clic llama a abrirModal()
//    con los datos de esa tarjeta específica.
// ─────────────────────────────────────────────
function agregarBotonesDetalle() {
  const tarjetas = document.querySelectorAll(".tarjeta-obra");

  tarjetas.forEach(function (tarjeta) {
    const titulo = tarjeta.querySelector("h3").textContent;
    const imagen = tarjeta.querySelector("img");
    const descripcion = tarjeta.querySelector("p").textContent;

    // Botón "Ver Detalle"
    const btnDetalle = document.createElement("button");
    btnDetalle.textContent = "🔍 Ver Detalle";
    btnDetalle.classList.add("btn-detalle");

    // Al hacer clic, abre el modal con los datos de ESTA tarjeta
    btnDetalle.addEventListener("click", function () {
      abrirModal(titulo, imagen.src, descripcion);
    });

    tarjeta.appendChild(btnDetalle);
  });
}

// ─────────────────────────────────────────────
// 5. AGREGAR BOTÓN "ELIMINAR" A CADA TARJETA
//    Al presionar, elimina la tarjeta del DOM
//    (la borra de la grilla visualmente).
// ─────────────────────────────────────────────
function agregarBotonesEliminar() {
  const tarjetas = document.querySelectorAll(".tarjeta-obra");

  tarjetas.forEach(function (tarjeta) {
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️ Eliminar";
    btnEliminar.classList.add("btn-eliminar");

    // Al hacer clic, elimina la tarjeta padre del DOM
    btnEliminar.addEventListener("click", function () {
      const confirmar = confirm("¿Deseas eliminar esta obra de la galería?");
      if (confirmar) {
        tarjeta.remove(); // Elimina el elemento del DOM
      }
    });

    tarjeta.appendChild(btnEliminar);
  });
}

// ─────────────────────────────────────────────
// 6. CERRAR MODAL CON TECLA ESCAPE
//    Permite al usuario cerrar el modal presionando Esc,
//    mejorando la accesibilidad y usabilidad.
// ─────────────────────────────────────────────
function habilitarCierreConEscape() {
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      cerrarModal();
    }
  });
}

// ─────────────────────────────────────────────
// INICIALIZACIÓN
//    Se ejecuta cuando el DOM está completamente cargado.
//    Llama a todas las funciones de configuración.
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  crearModal();
  agregarBotonesDetalle();
  agregarBotonesEliminar();
  habilitarCierreConEscape();
});
