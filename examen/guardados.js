let cartasActuales = [];

function mostrarCartas(cartas) {
  const contenedor = document.getElementById('cartas');
  
  if (!cartas || cartas.length === 0) {
    contenedor.innerHTML = '<p>No hay cartas guardadas.</p>';
    return;
  }

  contenedor.innerHTML = ''; // limpio el contenedor antes de mostrar las cartas

  cartas.forEach(carta => {
    const elemento = carta.createHtmlElement();
    contenedor.appendChild(elemento);
  });
}

function cargarCartasGuardadas() {
  const guardadas = localStorage.getItem('cartasGuardadas');
  
  if (!guardadas) {
    cartasActuales = [];
    mostrarCartas([]);
    return;
  }
  
  try {
    const arrayDeStrings = JSON.parse(guardadas);
    cartasActuales = arrayDeStrings.map(str => Carta.createFromJsonString(str));
    mostrarCartas(cartasActuales);
  } catch (error) {
    console.error("Error al cargar:", error);
    document.getElementById("cartas").innerHTML = '<p>Error al cargar las cartas</p>';
  }
}

function ordenarPorValor() {
  mostrarCartas();
}

function ordenarPorPalo() {
  mostrarCartas();
}

document.addEventListener('DOMContentLoaded', () => {
  cargarCartasGuardadas();
  
  const btnValor = document.getElementById('ordenarValor');
  const btnPalo = document.getElementById('ordenarPalo');
  
  if (btnValor) btnValor.addEventListener('click', ordenarPorValor);
  if (btnPalo) btnPalo.addEventListener('click', ordenarPorPalo);
});