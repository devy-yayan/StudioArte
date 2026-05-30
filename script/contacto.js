function esCampoValido(valor) {
  return valor.trim() !== "";
}

function esEmailValido(email) {
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formatoEmail.test(email);

}

function mostrarMensaje(texto, tipo) {
  // Buscar si ya existe un mensaje anterior para reemplazarlo
  let mensaje = document.getElementById("mensaje-validacion");

  if (!mensaje) {
    // Si no existe, crear el elemento
    mensaje = document.createElement("p");
    mensaje.id = "mensaje-validacion";
    const formulario = document.querySelector(".formulario-contacto");
    formulario.appendChild(mensaje);
  }

  mensaje.textContent = texto;

  // Aplicar estilo según tipo usando condicional
  if (tipo === "exito") {
    mensaje.style.color = "lightgreen";
    mensaje.style.fontWeight = "bold";
    mensaje.style.border = "1px solid lightgreen";
    mensaje.style.padding = "10px";
    mensaje.style.borderRadius = "5px";
    mensaje.style.marginTop = "10px";
  } else {
    mensaje.style.color = "#ff6b6b";
    mensaje.style.fontWeight = "bold";
    mensaje.style.border = "1px solid #ff6b6b";
    mensaje.style.padding = "10px";
    mensaje.style.borderRadius = "5px";
    mensaje.style.marginTop = "10px";
  }
}

// 4. DETECTAR "COMPRA" O "VENTA" EN EL MENSAJE
//    Se activa cada vez que el usuario escribe en el textarea.
//    Si el texto incluye "compra" → actualiza el select a "compra".
//    Si incluye "venta" → actualiza el select a "venta".
//    Usa condicionales para controlar el comportamiento.
function detectarTipoEnMensaje() {
  const campoMensaje = document.getElementById("mensaje");
  const campoTipo = document.getElementById("tipo");

  // Se escucha el evento "input" (cada vez que el usuario escribe)
  campoMensaje.addEventListener("input", function () {
    const textoMinusculas = campoMensaje.value.toLowerCase();

    if (textoMinusculas.includes("compra")) {
      campoTipo.value = "compra";
    } else if (textoMinusculas.includes("venta")) {
      campoTipo.value = "venta";
    }
    // Si no incluye ninguna, no modifica el campo tipo
  });
}

// 5. VALIDAR TODOS LOS CAMPOS DEL FORMULARIO
//    Verifica nombre, email, tipo y mensaje.
//    Retorna true si todo es válido, false si hay errores.
//    Usa la función utilitaria esCampoValido() y esEmailValido().
function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const tipo = document.getElementById("tipo").value;
  const mensaje = document.getElementById("mensaje").value;

  // Validar nombre
  if (!esCampoValido(nombre)) {
    mostrarMensaje(" El campo Nombre es obligatorio.", "error");
    return false;
  }

  // Validar email con formato correcto
  if (!esCampoValido(email)) {
    mostrarMensaje(" El campo Email es obligatorio.", "error");
    return false;
  }

  if (!esEmailValido(email)) {
    mostrarMensaje(" El formato del email no es válido.", "error");
    return false;
  }

  // Validar que se seleccionó un tipo de solicitud
  if (!esCampoValido(tipo)) {
    mostrarMensaje(" Debes seleccionar un Tipo de solicitud.", "error");
    return false;
  }

  // Validar mensaje
  if (!esCampoValido(mensaje)) {
    mostrarMensaje(" El campo Mensaje es obligatorio.", "error");
    return false;
  }

  // Si todo es válido
  mostrarMensaje(" ¡Formulario enviado correctamente! Nos contactaremos pronto.", "exito");
  return true;
}

// 6. MANEJAR EL EVENTO SUBMIT DEL FORMULARIO
//    Escucha el envío del formulario.
//    Llama a validarFormulario() y si retorna false,
//    cancela el envío con preventDefault().

function manejarEnvioFormulario() {
  const formulario = document.querySelector(".formulario-contacto");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Siempre previene el envío real para mostrar el mensaje

    const esValido = validarFormulario();

    if (esValido) {
      // Si es válido, limpiar el formulario tras 2 segundos
      setTimeout(function () {
        formulario.reset();
        document.getElementById("mensaje-validacion").textContent = "";
      }, 2000);
    }
  });
}

// INICIALIZACIÓN
//    Se ejecuta cuando el DOM está completamente cargado.
document.addEventListener("DOMContentLoaded", function () {
  detectarTipoEnMensaje();
  manejarEnvioFormulario();
});
