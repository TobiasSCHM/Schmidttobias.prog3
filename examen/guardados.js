let cartasActuales = [];

function mostrarCartas(cartas) {
  const contenedor = document.getElementById('cartas');
  
  if (!cartas || cartas.length === 0) {
    contenedor.innerHTML = '<p>No hay cartas guardadas. Volvé al inicio y guardá algunas.</p>';
    return;
  }

  contenedor.innerHTML = ''; // limpio el contenedor antes de mostrar las cartas

  cartas.forEach(carta => {
    const elemento = carta.createHtmlElement();
    contenedor.appendChild(elemento);
  });
}