// ---------AMIGO SECRETO --------
// ------ 1. Variables globales ------
// nombres: guarda todos los nombres que va añadiendo el usuario
let nombres = [];

// Acceso rápido a los tres elementos que necesitamos del HTML
const lista = document.getElementById('listaAmigos'); // <ul> donde se mostrarán los nombres
const msg   = document.getElementById('resultado');   // <ul> donde saldrá el mensaje del ganador
const caja  = document.getElementById('amigo');       // <input> donde escribe el nombre

// ------ 2. Añadir un nombre ------
function agregarAmigo() {
    // Quitamos espacios al principio y al final
    let nombre = caja.value.trim();

    // Validación simple: no debe estar vacío
    if (nombre === '') {
        alert('Por favor ingrese un nombre válido');
        caja.focus();   // dejar el cursor en la caja
        return;         // salimos sin hacer nada más
    }

    // Guardamos el nombre y limpiamos la caja
    nombres.push(nombre);
    caja.value = '';
    caja.focus();

    // Actualizamos la lista que ve el usuario
    mostrarLista();
}

// ------ 3. Pintar la lista en pantalla ------
function mostrarLista() {
    // Borramos todo lo que hay dentro del <ul>
    lista.innerHTML = '';

    // Recorremos el array y creamos un <li> por cada nombre
    for (let i = 0; i < nombres.length; i++) {
        let li = document.createElement('li');
        li.textContent = nombres[i];
        lista.appendChild(li);
    }
}

// ------ 4. Sortear un amigo secreto ------
function sortearAmigo() {
    // Si no hay nombres, avisamos
    if (nombres.length === 0) {
        alert('La lista está vacía. Reinicie el juego.');
        return;
    }

    // Si solo queda uno, lo sacamos directamente
    if (nombres.length === 1) {
        msg.innerHTML = '<li>Tu amigo secreto es: ' + nombres[0] + '</li>';
        nombres.pop();          // lo quitamos del array
        mostrarLista();         // actualizamos la lista (ahora vacía)
        alert('Se acabaron los participantes. Reinicie el juego.');
        return;
    }

    // Más de uno: elegimos una posición al azar
    let pos = Math.floor(Math.random() * nombres.length);
    let elegido = nombres.splice(pos, 1)[0]; // eliminamos y nos quedamos con ese nombre

    // Mostramos el resultado y actualizamos la lista
    msg.innerHTML = '<li>Tu amigo secreto es: ' + elegido + '</li>';
    mostrarLista();
}

// ------ 5. Pequeño extra: añadir con la tecla Enter ------
caja.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') agregarAmigo();
});
