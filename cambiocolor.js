function cambioColor() {
	var bloquesFiesta = document.getElementsByClassName('fiesta');
		for(let i = 0; i < bloquesFiesta.length; i ++){
			let r = 150 + Math.floor(106*Math.random());
			let g = 150 + Math.floor(106*Math.random());
			let b = 150 + Math.floor(106*Math.random());
			let rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
			
			bloquesFiesta[i].style.backgroundColor = rgb;
		}
}