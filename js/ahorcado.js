//Clase ahorcado
function Ahorcado(palabrita, pistita)
{	
	this.fallos = 0;
	this.maximo_fallos = 5;	
	this.palabra = palabrita;
	this.pista = pistita;
	this.letras = '';
	this.imagenes = ['img/poste.png', 'img/cabeza.png', 'img/torzo.png',
					 'img/brazos.png', 'img/piernas.png', 'img/muerto.png'];


	this.dibujar = function(context){
		var image = new Image();
		image.src = this.imagenes[this.fallos];
		image.onload = function(){
			context.drawImage(image,0,0);

		}		
		this.dibujarPista();	
	}

	this.dibujarPista = function(){			
		if(this.letras.length>0){
			var pal = this.palabra.toLowerCase();
			if(pal.indexOf(this.letras.charAt(this.letras.length-1))==-1){				
				return;
			}			
			var palabraPista = '';
			var letra = this.letras.charAt(this.letras.length-1);			
			for(var i = 0;i<this.palabra.length;i++){
				if(letra == this.palabra.charAt(i).toLowerCase()){					
					palabraPista+=this.palabra.charAt(i) + ' ';
				}else{
					palabraPista+=this.pista.innerHTML.charAt(i*2) + ' ';
				}
			}
			this.pista.innerHTML = palabraPista;
		}else{
			this.pista.innerHTML = '';
			for(var i = 0; i < this.palabra.length;i++){
				this.pista.innerHTML+="- "
			}
		}		
	}	

	this.intentar = function(letra){		
		if(letra.length<=0){
			alert("Debes ingresar una letra.");
			return;
		} 
		if(letra.length>1){
			alert("No se admite mas de una letra.");
			return;
		}

		if(this.letras.indexOf(letra)>-1){
			return;
		}

		letra = letra.toLowerCase();		
		this.letras+=letra;							
		if(letra.charCodeAt(0)>=97 && letra.charCodeAt(0)<=122){				
			var pal = this.palabra.toLowerCase();
			if(pal.indexOf(letra)==-1){
				this.fallos++;
			}
		}else{
			alert("Solo se permiten letras del alfabeto.");	
		}
	}
}


//Funcion de inicio
function inicio(){
	var palabras = ['Patineta','Tamarindo','Compuradora','Javascrip','Canvas',
					'Maleta','Navegador','Ilustrator','Inteligencia','Conocimiento',
					'Cargador','Letrero','Aprender','Programar','Sentarse'];

	var canvas = document.getElementById("base");
	var btnIntentar = document.getElementById("btn_intentar");
	var btnNuevo = document.getElementById("btn_nuevo");
	var txtLetra = document.getElementById("letra");
	var txtPista = document.getElementById("pista");
	var mensaje = document.getElementById("mensaje");
	var contexto = canvas.getContext("2d");				
	var juego;
	iniciarJuego();

	btnIntentar.addEventListener('click', function(){
		juego.intentar(txtLetra.value);
		juego.dibujar(contexto);					
		if(juego.fallos==juego.maximo_fallos){			
			mensaje.innerHTML = "Has perdido, mejor suerte la próxima ;(";
			txtPista.innerHTML = juego.palabra;
		}else if(txtPista.innerHTML.indexOf('-')==-1){
			mensaje.innerHTML = "Felicidades, has ganado :)";
		}
	});

	btnNuevo.addEventListener('click', iniciarJuego);


	function iniciarJuego(){
		var index = aleatorio(0,14);
		mensaje.innerHTML = '';
		juego = new Ahorcado(palabras[index], txtPista);
		juego.dibujar(contexto);

	}

	function aleatorio(minimo, maximo)
	{
    	var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    	return numero;
	}
}




