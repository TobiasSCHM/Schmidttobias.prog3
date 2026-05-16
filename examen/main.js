let pagina = 1;
let deckIdActual = null;


async function crearMazo() {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const data = await response.json();
  return data.deck_id;
}

async function traerCartas(deckId) {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`);
  const data = await response.json();
  return data.cards;
}

function mostrarCartas(cartasData) {
  const contenedor = document.getElementById('cartas');
  contenedor.innerHTML = '';
  
  cartasData.forEach(c => {

    const carta = new Carta(
      c.code,      
      c.value,     
      c.suit,      
      c.image    
    );
    contenedor.appendChild(carta.createHtmlElement());
  });
}

async function cargarPagina(pagina) {
  const contenedor = document.getElementById('cartas');
  contenedor.innerHTML = '<p>cargando cartas...</p>';
  
  // crea mazo nuevo cada vez
  deckIdActual = await crearMazo();
  const cartas = await traerCartas(deckIdActual);
  mostrarCartas(cartas);
}

async function paginaSig() {
  pagina++;
  await cargarPagina(pagina);
}


async function paginaAnt() {
  if (pagina > 1) {
    pagina--;
    await cargarPagina(pagina);
  } else {
    alert('ya estas en la primera página');
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  cargarPagina(1);
  
  document.getElementById('siguiente').addEventListener('click', paginaSig);
  document.getElementById('anterior').addEventListener('click', paginaAnt);
});