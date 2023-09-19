var nums = [];    //Array con los resultados de la tirada 
var selector = [];  //Array booleano con los dados que se lanzarán
var puntaje;
var tiros;    //Cuenta las veces que tiraste en una ronda
var finalRonda; //Booleana que idica si estás en el momento de la ronda
// el la que no se pueden seleccionar los dados
var numRonda = 0;  //Cuenta el número de ronda


//Inicializa las variables, muestra muestra y oculta los
//elementos correspondientes, y tira todos los dados.
function iniciar(){

	puntaje = 0;
	tiros = 0;
	numRonda = 1;

	document.getElementById('botoninicio').style.display = 'none';
	document.getElementById('botonreroll').style.display = 'block';
	document.getElementById('botonconteo').style.display = 'block';
	document.getElementById('botonroll').style.display = 'none';
	document.getElementById('sentencia').style.display = 'none';
	document.getElementById('feedback').style.display = 'block';
	mostrarPuntaje('puntaje');

	for(let i = 0; i < 6; i ++){
		dadoHTML(i).classList.add('dadoactivo')
	}

	tirarTodos();
}

//Selecciona todos los dados y los tira
function tirarTodos() {
	selector = [true, true, true, true, true, true];
	roll();
}

//Randomiza el número de cada dado cuyo correspondiente en el selector
//sea igual a true. Muestra los resultados y deselecciona todos los dados
function roll() {
	
	let bandera = false; // bandera que indica si se seleccionó algún dado.

	for(let i = 0; i < 6; i ++){
		if(selector[i] == true){
			bandera = true;
		}
	}  

	//Si no se seleccionó ningún dado, no permite hacer la tirada
	if(bandera == false) {
		alert('Selecciona algún dado para tirar!');
	} else {
		for(let i = 0; i < 6; i ++){
			if(selector[i] == true){
				nums[i] = Math.floor(Math.random()*6) + 1;
			}
		}

		//Muestra los dados en pantalla
		mostrarDados();

		finalRonda = false;   //Se tiraron los dados, por
	//lo que pueden elegirse cuales volver a tirar

		//actualiza el número de tirada de la ronda
		if(bandera == true) {
			tiros += 1;
		}

		//Deselecciona todos los dados
		for(let i = 0; i < 6; i ++){
			deseleccionarDado(i);
		}	
	}
	//Muestra el número de tiro de la ronda
	document.getElementById('num-tiro').innerHTML = 'Tiros en esta ronda: ' + tiros + '.';
}

//Selecciona un dado en particular, en el array y en la imagen
function seleccionarDado(ident) {
	selector[ident] = true;

	actualizarSeleccion(ident);
}

//Pinta el color del borde del dado que corresponda
function actualizarSeleccion(ident) {
	if(selector[ident] == true) {
		dadoHTML(ident).style.borderColor = 'orange';
	} else {
		dadoHTML(ident).style.borderColor = 'white';
	}
}

//Pone un false en el array de selecciones y lo actualiza
//en la imagen
function deseleccionarDado(ident) {
	selector[ident] = false;
	actualizarSeleccion(ident);
	
	
}

//Si estaba seleccionado, lo deselecciona y veceversa
function cambiarSelecDado(ident) {
	if(finalRonda == false){
		if(selector[ident] == true) {
			deseleccionarDado(ident);
		} else {
			seleccionarDado(ident);
		}
	}
}

//función que te devuelve elelemento HTML correspondiente al dado
//número ident 
function dadoHTML(ident) {
	let id = 'dado' + (ident + 1);
	let dado = document.getElementById(id);
	return dado;
}


//reestablece los botones y tira todos los dados
function siguienteRonda() {
	document.getElementById('botonreroll').style.display = 'block';
	document.getElementById('botonconteo').style.display = 'block';
	document.getElementById('botonroll').style.display = 'none';

	tiros = 0;
	tirarTodos();	
	numRonda += 1;

	document.getElementById('num-ronda').innerHTML = 'Ronda actual: ' + numRonda + '.';
}


//Muestra la imagen del dado que corresponda
function mostrarDados() {
	for(let i = 0; i < 6; i ++){

		dadoHTML(i).src = 'imagenes/' + nums[i] + '.jpg';
	}
}

// función para contar el puntaje, y termirar la ronda
function conteo() {
	//No se pueden seleccionar dados hasta la siguiente
	//ronda
	finalRonda = true;

	//El puntaje se cuenta según las reglas
	for(let i = 0; i < 6; i++) {
		if(nums[i] == 3) {
			puntaje ++;
		}
		if(nums[i] == 6) {
			puntaje += 2;
		}
		if(nums[i] == 1) {
			puntaje -= 1;
		}
	}

	if(tiros > 2){
		puntaje -= tiros - 2;
	}	

	document.getElementById('puntaje').innerHTML = 'Puntaje actual: ' + puntaje + ' puntos.';

	document.getElementById('botonconteo').style.display = 'none';
	document.getElementById('botonreroll').style.display = 'none';
	document.getElementById('botonroll').style.display = 'block';


	//Se fija si ganaste o perdiste
	if(puntaje >= 40) {
		terminar('Has ganado ¡Felicitaciones!');
	} else {
		if(numRonda >= 10){
			terminar('Has perdido ¡Mejor suerte la próxima!');
		}
	}

	//Deselecciona todos los dados
	for(let i = 0; i < 6; i ++){
		deseleccionarDado(i);
	}	
}

//Para terminar el juego mostrando una frase en particular
function terminar(frase) {
	document.getElementById('sentencia').style.display = 'inline';
	document.getElementById('botonconteo').style.display = 'none';
	document.getElementById('botonreroll').style.display = 'none';
	document.getElementById('botonroll').style.display = 'none';
	document.getElementById('botoninicio').style.display = 'block';
	document.getElementById('feedback').style.display = 'none';
	document.getElementById('botoninicio').innerHTML = 'Jugar de nuevo';

	document.getElementById('sentencia').innerHTML = frase;
}