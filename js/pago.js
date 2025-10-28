const juegosDisponibles = [
  { nombre: "Marvel's Spider-Man 2", precio: 69.99 },
  { nombre: "Elden Ring", precio: 59.99 },
  { nombre: "Hades", precio: 24.99 },
  { nombre: "Forza Horizon 5", precio: 59.99 },
  { nombre: "Cyberpunk 2077", precio: 29.99 },
  { nombre: "Skyrim: Anniversary Edition", precio: 29.99 },
  { nombre: "Final Fantasy VII Remake", precio: 39.99 },
  { nombre: "Dragon Age: Inquisition", precio: 9.99 },
  { nombre: "Mass Effect: Legendary Edition", precio: 29.99 },
  { nombre: "God of War Ragnarök", precio: 49.99 },
  { nombre: "Call of Duty: Modern Warfare III", precio: 44.99 },
  { nombre: "Grand Theft Auto V", precio: 19.99 },
  { nombre: "Resident Evil 4 Remake", precio: 39.99 },
  { nombre: "Civilization VI", precio: 29.99 },
  { nombre: "Total War: Warhammer III", precio: 39.99 },
  { nombre: "Age of Empires IV", precio: 34.99 },
  { nombre: "XCOM 2", precio: 14.99 },
  { nombre: "Hogwarts Legacy", precio: 39.99 },
  { nombre: "The Legend of Zelda: Tears of the Kingdom", precio: 49.99 },
  { nombre: "Uncharted 4: A Thief's End", precio: 19.99 },
  { nombre: "Alan Wake 2", precio: 44.99 },
  { nombre: "Hollow Knight", precio: 14.99 },
  { nombre: "Stardew Valley", precio: 12.99 },
  { nombre: "Celeste", precio: 19.99 },
  { nombre: "Undertale", precio: 9.99 },
  { nombre: "Ratchet & Clank: Rift Apart", precio: 59.99 },
  { nombre: "Returnal", precio: 49.99 },
  { nombre: "Demon's Souls", precio: 49.99 },
  { nombre: "Spider-Man: Miles Morales", precio: 39.99 },
  { nombre: "Starfield", precio: 69.99 },
  { nombre: "Microsoft Flight Simulator", precio: 59.99 },
  { nombre: "Fable", precio: 69.99 },
  { nombre: "Gears 5", precio: 39.99 },
  { nombre: "League of Legends", precio: 5.99 },
  { nombre: "Counter-Strike 2", precio: 19.99 },
  { nombre: "Red Dead Redemption 2", precio: 39.99 },
  { nombre: "Mario Kart 8 Deluxe", precio: 49.99 },
  { nombre: "Super Smash Bros. Ultimate", precio: 49.99 },
  { nombre: "Animal Crossing: New Horizons", precio: 39.99 },
  { nombre: "Metroid Prime 4", precio: 59.99 }
];

function cargarJuegos() {
  const selector = document.getElementById("selector-juego");
  juegosDisponibles.forEach((juego, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${juego.nombre} - $${juego.precio.toFixed(2)}`;
    selector.appendChild(option);
  });
  actualizarResumen();
}

function actualizarResumen() {
  const seleccion = document.getElementById("selector-juego").value;
  const juego = juegosDisponibles[seleccion];
  document.getElementById("nombre-juego").textContent = `Nombre: ${juego.nombre}`;
  document.getElementById("precio-juego").textContent = `Precio: $${juego.precio.toFixed(2)}`;
  document.getElementById("total-juego").textContent = `$${juego.precio.toFixed(2)}`;
}

function mostrarFormulario(metodo) {
  const contenedor = document.getElementById("formulario-pago");
  contenedor.innerHTML = "";

  if (metodo === "tarjeta") {
    contenedor.innerHTML = `
      <input type="text" id="tarjeta" placeholder="Número de tarjeta XXXX-XXXX-XXXX-XXXX" maxlength="19">
      <p class="error" id="error-tarjeta"></p>
      <input type="text" id="fecha" placeholder="Fecha de caducidad (MM/AA)" maxlength="5">
      <p class="error" id="error-fecha"></p>
      <input type="text" id="cvc" placeholder="Código de seguridad" maxlength="4">
      <p class="error" id="error-cvc"></p>

      <h3>Información de facturación</h3>
      <input type="text" id="nombre" placeholder="Nombre">
      <input type="text" id="apellidos" placeholder="Apellidos">
      <input type="text" id="localidad" placeholder="Localidad">
      <input type="text" id="direccion" placeholder="Dirección de facturación">
      <input type="text" id="codigo-postal" placeholder="Código postal">
      <p class="error" id="error-postal"></p>
      <input type="text" id="pais" placeholder="País">
      <input type="text" id="telefono" placeholder="503 XXXX-XXXX" maxlength="13">
      <p class="error" id="error-telefono"></p>
    `;
    setListenersTarjeta();
  } else if (metodo === "paypal") {
    contenedor.innerHTML = `
      <input type="email" id="paypalEmail" placeholder="Correo de PayPal">
      <p class="error" id="error-paypal"></p>
    `;
    setListenersPaypal();
  } else if (metodo === "cripto") {
    contenedor.innerHTML = `
      <input type="text" id="wallet" placeholder="Dirección de billetera">
      <p class="error" id="error-wallet"></p>
    `;
    setListenersCripto();
  }
}

function validarTarjeta() {
  const tarjeta = document.getElementById("tarjeta").value.trim();
  const fecha = document.getElementById("fecha").value.trim();
  const cvc = document.getElementById("cvc").value.trim();
  const postal = document.getElementById("codigo-postal").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  let valido = true;

  const errorTarjeta = document.getElementById("error-tarjeta");
  const errorFecha = document.getElementById("error-fecha");
  const errorCVC = document.getElementById("error-cvc");
  const errorPostal = document.getElementById("error-postal");
  const errorTelefono = document.getElementById("error-telefono");

  errorTarjeta.textContent = "";
  errorFecha.textContent = "";
  errorCVC.textContent = "";
  errorPostal.textContent = "";
  errorTelefono.textContent = "";

  if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(tarjeta)) {
    errorTarjeta.textContent = "Número inválido. Usa el formato XXXX-XXXX-XXXX-XXXX";
    valido = false;
  }

  if (!/^\d{2}\/\d{2}$/.test(fecha)) {
    errorFecha.textContent = "Formato inválido. Usa MM/AA";
    valido = false;
  } else {
    const [mesStr, anioStr] = fecha.split("/");
    const mes = parseInt(mesStr, 10);
    const anio = parseInt("20" + anioStr, 10);

    if (mes < 1 || mes > 12 || anio < 2025) {
      errorFecha.textContent = "Fecha inválida. Mínimo año 2025";
      valido = false;
    }
  }

  if (!/^\d{3,4}$/.test(cvc)) {
    errorCVC.textContent = "CVC inválido (3-4 dígitos)";
    valido = false;
  }

  if (!/^\d{4,6}$/.test(postal)) {
    errorPostal.textContent = "Código postal inválido";
    valido = false;
  }

  if (!/^503 \d{4}-\d{4}$/.test(telefono)) {
    errorTelefono.textContent = "Número inválido. Usa el formato 503 XXXX-XXXX";
    valido = false;
  }

  return valido;
}

function validarPaypal() {
  const email = document.getElementById("paypalEmail").value.trim();
  const error = document.getElementById("error-paypal");
  error.textContent = "";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    error.textContent = "Correo de PayPal inválido";
    return false;
  }

  return true;
}

function validarCripto() {
  const wallet = document.getElementById("wallet").value.trim();
  const error = document.getElementById("error-wallet");
  error.textContent = "";

  if (wallet.length < 10) {
    error.textContent = "Dirección inválida";
    return false;
  }

  return true;
}

function finalizarCompra() {
  const metodo = document.getElementById("selector-metodo").value;
  const seleccion = document.getElementById("selector-juego").value;
  const juego = juegosDisponibles[seleccion];
  const aceptoTerminos = document.getElementById("terminos").checked;

  let valido = false;

  if (metodo === "tarjeta") {
    valido = validarTarjeta();
  } else if (metodo === "paypal") {
    valido = validarPaypal();
  } else if (metodo === "cripto") {
    valido = validarCripto();
  }

  if (!valido || !aceptoTerminos) {
    if (!aceptoTerminos) {
      alert("Debes aceptar los términos y condiciones");
    }
    return;
  }

  document.getElementById("mensaje-exito").style.display = "block";
}

function setListenersTarjeta() {
  document.getElementById("tarjeta").addEventListener("input", validarTarjeta);
  document.getElementById("fecha").addEventListener("input", validarTarjeta);
  document.getElementById("cvc").addEventListener("input", validarTarjeta);
  document.getElementById("codigo-postal").addEventListener("input", validarTarjeta);
  document.getElementById("telefono").addEventListener("input", e => {
    let input = e.target.value.replace(/[^\d]/g, "");
    if (input.startsWith("503")) input = input.slice(3);
    if (input.length > 4) {
      e.target.value = `503 ${input.slice(0, 4)}-${input.slice(4, 8)}`;
    } else {
      e.target.value = `503 ${input}`;
    }
    validarTarjeta();
  });
}

function setListenersPaypal() {
  document.getElementById("paypalEmail").addEventListener("input", validarPaypal);
}

function setListenersCripto() {
  document.getElementById("wallet").addEventListener("input", validarCripto);
}

document.getElementById("selector-metodo").addEventListener("change", e => {
  mostrarFormulario(e.target.value);
});

document.getElementById("selector-juego").addEventListener("change", actualizarResumen);

cargarJuegos();
mostrarFormulario("tarjeta");
