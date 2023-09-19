//Para tocar que al tocar un boton, se marque en naranja.
//Los botones del mismo tipo tienen la misma clase. La busco con .className y
//la guardo en "clase". Primero pongo en gris todos los botones, por si la
//selección cambió. Esto lo hago con la función reiniciarBorones, a la que
//le paso la clase como parámetro. Luego uso el parámetro "elemento"
//que representa el boton seleccionado, y pinto de naranja la propiedad que se especifique en el segundo parámetro.
function seleccionBoton(elemento) {
	let clase = elemento.className;
	reiniciarBotones(clase);

	elemento.style.backgroundColor = 'orange';
}

//Para reiniciar los botones, busco todos los elementos de su clase y les doy
//fondo gris
function reiniciarBotones(clase) {
	let botones = document.getElementsByClassName(clase);

	for(let i = 0; i < botones.length; i ++){
		botones[i].style.backgroundColor = 'lightGray';
	}
}

//Para mostrar puntaje en un indicador
function mostrarPuntaje(indicador) {
	document.getElementById(indicador).innerHTML = 'Puntaje actual: ' + puntaje + ' puntos';
}