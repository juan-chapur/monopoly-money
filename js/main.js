class Jugador {
	constructor(nombre, dinero) {
		this.nombre = nombre;
		this.dinero = dinero;
	}
	agregarDinero(dinero) {
		this.dinero += dinero;
	}
	quitarDinero(dinero) {
		this.dinero -= dinero;
	}
}

function agregarJugador() {
	let nombre = document.getElementById("agregar-jugador-nombre").value;
	document.getElementById("agregar-jugador-nombre").value = "";
	let dinero = Number(document.getElementById("agregar-jugador-dinero").value);
	let jugador = new Jugador(nombre, dinero);
	jugadores.push(jugador);
	localStorage.setItem("juego", JSON.stringify(jugadores));
}
function quitarJugador(jugador) {
	console.log("eliminando jugador ", jugador);
	jugadores.splice(jugadores.indexOf(jugador), 1);
	localStorage.setItem("juego", JSON.stringify(jugadores));
}
function reiniciarJuego() {
	localStorage.setItem("juego", JSON.stringify([]));
	window.location.reload();
}

function mostrarJugadoresAEliminar() {
	document.getElementById("jugadores-a-eliminar").innerHTML = "";
	jugadores.forEach((jugador) => {
		const divJugador = document.createElement("div");
		divJugador.textContent = `${jugador.nombre} ${jugador.dinero}`;
		const btnEliminar = document.createElement("div");
		btnEliminar.classList.add("btn", "btn-danger");
		btnEliminar.textContent = "Eliminar";
		btnEliminar.addEventListener("click", () => {
			quitarJugador(jugador);
			mostrarJugadoresAEliminar();
		});
		divJugador.appendChild(btnEliminar);
		document.getElementById("jugadores-a-eliminar").appendChild(divJugador);
	});
}

function mostrarJugadores() {
    document.getElementById("jugadores").innerHTML = "";
    jugadores.forEach((jugador) => {
        console.log("a");
        document.getElementById("jugadores").innerHTML += `
            <div class="card col-3 m-2">
                <div class="card-body text-center">
                    <h5 class="card-title">${jugador.nombre}</h5>
                    <h6>${jugador.dinero}</h6>
                    <input type="number" class="mb-2">
                    <div id="botonera"></div>
                    <div class="btn btn-success">➕</div>
                    <div class="btn btn-danger">➖</div>
                </div>
            </div>`;
    });
}

const jugadores = JSON.parse(localStorage.getItem("juego")) ?? [];
mostrarJugadores();

const btnAgregarJugador = document.getElementById("agregar-jugador");
btnAgregarJugador.addEventListener("click", agregarJugador);

const btnReiniciarJuego = document.getElementById("reiniciar-juego");
btnReiniciarJuego.addEventListener("click", reiniciarJuego);

const btnEliminarBotones = document.getElementById("nav-eliminar-jugador");
btnEliminarBotones.addEventListener("click", mostrarJugadoresAEliminar);
