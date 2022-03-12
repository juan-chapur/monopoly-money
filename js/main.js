class Jugador {
	constructor(nombre, dinero) {
		this.nombre = nombre;
		this.dinero = dinero;
	}
}

function agregarJugador() {
	let nombre = document.getElementById("agregar-jugador-nombre").value;
	document.getElementById("agregar-jugador-nombre").value = "";
	let dinero = Number(document.getElementById("agregar-jugador-dinero").value);
	let jugador = new Jugador(nombre, dinero);
	//	ver si existe el jugador en el array de jugadores y agregarlo, sino mostrar un sweetalert de que ya esta creado
	if (jugadores.find((j) => j.nombre === jugador.nombre)) {
		Swal.fire({
			title: "Jugador ya existe",
			text: "El jugador ya existe",
			icon: "warning",
		});
	} else {
		Swal.fire({
			title: "Jugador Creado",
			text: `Jugador ${jugador.nombre} creado con $${jugador.dinero}`,
			icon: "success",
		});
		jugadores.push(jugador);
		localStorage.setItem("juego", JSON.stringify(jugadores));
		mostrarJugadores();
		cargarEnHistorial(`CREADO: ${nombre} con $${dinero}`);
	}
}
function quitarJugador(jugador) {
	jugadores.splice(jugadores.indexOf(jugador), 1);
	localStorage.setItem("juego", JSON.stringify(jugadores));
	mostrarJugadores();
	cargarEnHistorial(`${jugador.nombre} se elimino`);
}
function reiniciarJuego() {
	localStorage.setItem("juego", JSON.stringify([]));
	localStorage.setItem("historial-monopoly", JSON.stringify([]));
	window.location.reload();
	cargarEnHistorial("Se reinicio el juego");
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

function cargarEnHistorial(jugada) {
	const historial = JSON.parse(localStorage.getItem("historial-monopoly")) ?? [];
	historial.unshift(jugada);
	if (historial.length > 30) {
		historial.pop();
	}
	localStorage.setItem("historial-monopoly", JSON.stringify(historial));
	mostrarHistorial();
}

function mostrarHistorial() {
	const historial = JSON.parse(localStorage.getItem("historial-monopoly")) ?? [];
	document.getElementById("historial").innerHTML = "";
	historial.forEach((jugada) => {
		const divJugada = document.createElement("div");
		divJugada.textContent = jugada;
		document.getElementById("historial").appendChild(divJugada);
	});
}

function agregarDinero(jugador, dinero) {
	jugador.dinero += dinero;
	cargarEnHistorial(`${jugador.nombre} se agrego +$${dinero} ahora tiene $${jugador.dinero}`);
}

function quitarDinero(jugador, dinero) {
	jugador.dinero -= dinero;
	cargarEnHistorial(`${jugador.nombre} se quito -$${dinero} ahora tiene $${jugador.dinero}`);
}

function mostrarJugadores() {
	document.getElementById("jugadores").innerHTML = "";
	jugadores.forEach((jugador) => {
		console.log(jugador);
		document.getElementById("jugadores").innerHTML += `
            <div class="card col-5 col-md-3 col-lg-2 m-2">
                <div class="card-body text-center">
                    <h5 class="card-title">${jugador.nombre}</h5>
                    <h6>${jugador.dinero}</h6>
                    <input id="input-${jugador.nombre}" type="number" class="form-control mb-2">
                    <div id="agregar-${jugador.nombre}" class="btn btn-success btn-agregar">➕</div>
                    <div id="quitar-${jugador.nombre}" class="btn btn-danger btn-quitar">➖</div>
                </div>
            </div>`;
	});
	//	recorrer todos los btn-agregar y agregarles un escuchador de click
	const botonesAgregar = document.getElementsByClassName("btn-agregar");
	for (let i = 0; i < botonesAgregar.length; i++) {
		botonesAgregar[i].addEventListener("click", (e) => {
			const jugador = jugadores.find(
				(jugador) => jugador.nombre == e.target.id.split("-")[1]
			);
			const dinero = Number(
				document.getElementById(`input-${jugador.nombre}`).value
			);
			agregarDinero(jugador, dinero);
			localStorage.setItem("juego", JSON.stringify(jugadores));
			mostrarJugadores();
		});
	}
	const botonesQuitar = document.getElementsByClassName("btn-quitar");
	for (let i = 0; i < botonesAgregar.length; i++) {
		botonesQuitar[i].addEventListener("click", (e) => {
			const jugador = jugadores.find(
				(jugador) => jugador.nombre == e.target.id.split("-")[1]
			);
			const dinero = Number(
				document.getElementById(`input-${jugador.nombre}`).value
			);
			quitarDinero(jugador, dinero);
			localStorage.setItem("juego", JSON.stringify(jugadores));
			mostrarJugadores();
		});
	}
}

const jugadores = JSON.parse(localStorage.getItem("juego")) ?? [];
mostrarJugadores();
mostrarHistorial();

const btnAgregarJugador = document.getElementById("agregar-jugador");
btnAgregarJugador.addEventListener("click", agregarJugador);

const btnReiniciarJuego = document.getElementById("reiniciar-juego");
btnReiniciarJuego.addEventListener("click", reiniciarJuego);

const btnEliminarBotones = document.getElementById("nav-eliminar-jugador");
btnEliminarBotones.addEventListener("click", mostrarJugadoresAEliminar);
