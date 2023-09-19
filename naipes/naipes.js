var varApuesta;  //Registra si se apostó por "mayor" o "menor"
var varCant;    //Registra si se apostó 1, 2 o 3
var baraja = [];  //Contiene todos los naipes
var puntaje;    //Almacena el pontaje del jugador
var cartaActual;  //La carta que actualmente es muestra
var cartaAnterior;  //La ultima carta mostrada, excepto si
//es un joker rojo
var multip = 1;    //Por cuanto se multiplica la apuesta 


//Para seleccionar si se apuesta por mayor o menor. Esto se guarda en varApuesta
function selecApuesta(apuesta) {
	seleccionBoton(apuesta);

	varApuesta = apuesta.value;
}

//Para seleccionar si se apuesta por 1, 2 o 3. Esto se guarda en varCant
function selecCant(cant) {
	seleccionBoton(cant);

	varCant = Number(cant.value);
}


//Para iniciar la partida. Comienzo disponiendo los elementos
//html e inicializando las variables de la partida
function iniciar() {
	document.getElementById('interfaz').style.display = 'flex';
	document.getElementById('botonapuesta').style.display = 'block';
	document.getElementById('botoninicio').style.display = 'none';
	document.getElementById('feedback').style.display = 'block';
	document.getElementById('sentencia').style.display = 'none';

//Inicializo los valores de la apuesta, los puntos a apostar, y las cartas de la baraja

	varApuesta = 'noElegido';
	varCant = 'noElegida';
	puntaje = 5;
	baraja = ['1oro',
	'2oro',
	'3oro',
	'4oro',
	'5oro',
	'6oro',
	'7oro',
	'8oro',
	'9oro',
	'10oro',
	'11oro',
	'12oro',
	'1copas',
	'2copas',
	'3copas',
	'4copas',
	'5copas',
	'6copas',
	'7copas',
	'8copas',
	'9copas',
	'10copas',
	'11copas',
	'12copas',
	'jokerrojo',
	'jokerrojo',
	'jokerrojo',
	'jokerrojo',
	'jokerverde',
	'jokerverde',
	'jokerverde',
	'jokerverde',
	'jokerverde',
	'jokerverde',
	'jokernegro',
	'jokernegro'];

	mostrarPuntaje('cartelpuntaje');
	document.getElementById("feedbackapuesta").innerHTML = '';

	//Saco una carta al azar y la muestro
	cartaActual = cartaRandom();
	mostrarCarta(cartaActual);

	//Si el joker rojo sale primero, reinicio el juego
	if(cartaActual == 'jokerrojo'){
		iniciar();
	}

	//Si sale el joker negro o verde, activo sus funciones
	if(cartaActual == 'jokerverde'){
		jokerVerde();
	}
	if(cartaActual == 'jokernegro'){
		jokerNegro();
	}
}

//Para sortear una carta de la baraja, y eliminarla para que no vuelva
//a salir
function cartaRandom(){
	let indiceCarta = Math.floor(baraja.length*Math.random());
	let cartaSacada = baraja[indiceCarta];
	baraja.splice(indiceCarta, 1);
	return cartaSacada;

}


//Para mostrar la imagen de una carta en pantalla
function mostrarCarta(carta) {
	let nombreImagen = 'imagenes/' + carta + '.jpg';
	document.getElementById('naipe').src = nombreImagen;
	document.getElementById('naipe').alt = carta;

}

//Para evaluar el resultado de la apuesta
function apostar() {
	//Uso un condicional para asegurarme de que el usuario haya elegido
	//su apuesta

	if(varApuesta == 'noElegido' || varCant == 'noElegida'){
		alert('¡Tienes que elegir si apostar por "mayor" o por "menor", y si apostar 1, 2 o 3 puntos!');
	} else {


	//A menos que haya salido el joker rojo, guardo la última
	//carta en "cartaAnterior".
		if(cartaActual != 'jokerrojo'){
			multip = 1;
			cartaAnterior = cartaActual;
		}
		//Saco una nueva.
		cartaActual = cartaRandom();
		mostrarCarta(cartaActual);

		//Reinicio el estado de los botones,
		reiniciarBotones('botonapuesta');
		reiniciarBotones('botoncant');
		document.getElementById('interfaz').style.display = 'flex';
		document.getElementById('botonapuesta').style.display = 'block';
		document.getElementById('botoncontinuerojo').style.display = 'none';

		//En caso de que salga el joker rojo, se multiplica
		//la apuesta por 2. Si salieron otros jokers, se activan
		//sus funciones correspondientes. Si no, se pasa a evaluar
		//la apuesta
		if(cartaActual == 'jokerrojo') {
			multip *= 2;
			document.getElementById('feedbackapuesta').innerHTML = '¡Ha salido el joker rojo!<br>Tu apuesta se duplica';
			reiniciarBotones('botonapuesta');
			reiniciarBotones('botoncant');
			document.getElementById('interfaz').style.display = 'none';
			document.getElementById('botonapuesta').style.display = 'none';
			document.getElementById('botoncontinuerojo').style.display = 'block';
		} else if (cartaActual == 'jokerverde') {
			jokerVerde();
		} else if (cartaActual == 'jokernegro') {
			jokerNegro();
		} else {

			let comparacion;

	//Comparo los valores de las cartas y guardo la comparación en "comparacion".
			if(parseInt(cartaActual) < parseInt(cartaAnterior)){
				comparacion = 'menor';
			} else if (parseInt(cartaActual) > parseInt(cartaAnterior)){
				comparacion = 'mayor';
			} else {
				comparacion = 'igual';
			}

	//Comparo "comparación" con varApuesta. Según esto, sumo o resto el puntaje
	//correspondiente y muestro un mensaje

			if(comparacion == 'menor' || comparacion == 'mayor') {
				if(comparacion == varApuesta){
					puntaje += varCant*multip;
					document.getElementById('feedbackapuesta').innerHTML = '¡Has acertado!';
				}

				if(comparacion != varApuesta){
					puntaje -= varCant*multip;
					document.getElementById('feedbackapuesta').innerHTML = '¡Has errado!';
				}
			} else {
				document.getElementById('feedbackapuesta').innerHTML = '¡Los valores de las cartas han empatado!';
			}

			//Muestro el puntaje
			mostrarPuntaje('cartelpuntaje');
			//Reinicio las variables y botones seleccionados por el usuario
			varApuesta = 'noElegido';
			varCant = 'noElegida';
			reiniciarBotones('botonapuesta');
			reiniciarBotones('botoncant');
	
		}


		//Me fijo si el jugador ya ganó o perdió, y en ese caso termino el juego.
		if(puntaje >= 50){
			terminar('¡Has ganado!');
		} else if(puntaje <= 0){
			terminar('Has perdido ¡Vuelve a intentarlo!');
		}

		//Por si se acaban las cartas
		if(baraja.length == 0){
				terminar('Se han acabado las cartas ¡Vuelve a intentarlo!');
		}
	}
}

//Función por si aparece el joker verde

function jokerVerde() {
	puntaje += 10;
	document.getElementById('feedbackapuesta').innerHTML = '¡Ha salido el joker verde!<br>Ganas 10 puntos';
	mostrarPuntaje('cartelpuntaje');

	document.getElementById('interfaz').style.display = 'none';
	document.getElementById('botonapuesta').style.display = 'none';
	document.getElementById('botoncontinue').style.display = 'block';
}

function jokerNegro() {
	puntaje = 5;
	document.getElementById('feedbackapuesta').innerHTML = '¡Ha salido el joker negro!<br>Tu puntaje vuelve a 5';
	mostrarPuntaje('cartelpuntaje');

	document.getElementById('interfaz').style.display = 'none';
	document.getElementById('botonapuesta').style.display = 'none';
	document.getElementById('botoncontinue').style.display = 'block';
}

//Continuar() es como iniciar(), pero sin reinicializar las variables
function continuar(){
	document.getElementById('interfaz').style.display = 'flex';
	document.getElementById('botonapuesta').style.display = 'block';
	document.getElementById('botoncontinue').style.display = 'none';

	//Acomodo los valores de la apuesta, los puntos a apostar.

	varApuesta = 'noElegido';
	varCant = 'noElegida';

	document.getElementById("feedbackapuesta").innerHTML = '';

	//Me fijo si ganó con el joker Verde
	if(puntaje >= 50){
				terminar('¡Has ganado!');
	}

	//Saco una carta al azar y la muestro
	cartaActual = cartaRandom();
	mostrarCarta(cartaActual);

	//Si el joker rojo, saco otra cata
	if(cartaActual == 'jokerrojo'){
		continuar();
	}
	if(cartaActual == 'jokerverde'){
		jokerVerde();
	}
	if(cartaActual == 'jokernegro'){
		jokerNegro();
	}
}


//Funcion para terminar la partida. El parámetro es la frase que aparecerá
//al terminar
function terminar(frase) {
	document.getElementById('sentencia').innerHTML = frase;

	document.getElementById('interfaz').style.display = 'none';
	document.getElementById('botonapuesta').style.display = 'none';
	document.getElementById('botoninicio').style.display = 'block';
	document.getElementById('feedback').style.display = 'none';
	document.getElementById('sentencia').style.display = 'block';
	document.getElementById('botoncontinue').style.display = 'none';

	document.getElementById('botoninicio').innerHTML = 'Jugar de nuevo';
}