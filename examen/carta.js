class Carta {

  code;
  value;
  suit;
  imagen;

    constructor(code, value, suit, imagen) {
    this.code = code;      
    this.value = value;    
    this.suit = suit;      // tuve que buscar que era esto, es el palo de la carta, para mi futuro yo
    this.imagen = imagen;  
  }

    toString() {
    return JSON.stringify({
      code: this.code,
      value: this.value,
      suit: this.suit,
      imagen: this.imagen
    });
  }

    static createFromJsonString(jsonString) {
    const datos = JSON.parse(jsonString);
    return new Carta(
      datos.code,
      datos.value,
      datos.suit,
      datos.imagen
    );
  }

    createHtmlElement() {
    const div = document.createElement('div');
    div.className = 'tarjeta-carta';

    const codeElem = document.createElement('h3'); //para mostrar el code de la carta, ejemplo h3 es hearts 3 (en ingles se entiende mejor)
    codeElem.textContent = this.code;

    const img = document.createElement('img');
    img.src = this.imagen;
    img.alt = this.code;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      window.open(this.imagen, '_blank'); // te abre la img en otra pestaña, el _blank es para que no te saque de la pagina
    });

    const infoElem = document.createElement('p');
    infoElem.textContent = `${this.value} of ${this.suit}`; //completa el nombre de la carta, ejemplo 3 of hearts, lo hago en ingles porque queda mejor
    
    const btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.className = 'btn-guardar';
    btnGuardar.addEventListener('click', () => {
      Carta.guardarCarta(this); 
      alert(`Carta "${this.code}" guardada`);
    });
    
    div.appendChild(codeElem);
    div.appendChild(img);
    div.appendChild(infoElem);
    div.appendChild(btnGuardar);
    
    return div;
  }


  static guardarCarta(carta) {
    let guardadas = localStorage.getItem('cartasGuardadas');
    let arrayCartas = guardadas ? JSON.parse(guardadas) : [];

    const yaExiste = arrayCartas.some(c => {
      const cartaObj = JSON.parse(c);
      return cartaObj.code === carta.code;
    }); // ASUMAMOS que no se pueden repetir y listo
    
    if (!yaExiste) {
      arrayCartas.push(carta.toString());
      localStorage.setItem('cartasGuardadas', JSON.stringify(arrayCartas));
      console.log('Cartas guardadas:', arrayCartas.length);
    } else {
      alert('Esta carta ya esta guardada');
    }
  }
}