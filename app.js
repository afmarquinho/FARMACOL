// VARIABLES
const resultado = document.querySelector(".resultado__container");
let suma = 0;
const nombre = document.querySelector("#nombre");
const zona = document.querySelector("#zone");
const ciudad = document.querySelector("#city");
const ordenar = document.querySelector("#ordenar");
const canal = document.querySelector("#canal");
const ventaMinima = document.querySelector("#ventaminima");
const ventaMaxima = document.querySelector("#ventamaxima");

// EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  agregarHTML(ventas);

});
// DATOS DE LA BUSQUEDA
const datosBusqueda = {
  nombre: "",
  zona: "",
  ciudad: "",
  ordenar: "",
  canal: "",
  minima: "",
  maxima: "",
};
nombre.addEventListener("change", (e) => {
  datosBusqueda.nombre = e.target.value;
  filtrarNombre();
});

zona.addEventListener("change", (e) => {
  datosBusqueda.zona = e.target.value;
  filtrarReporteVentas(); // llamado de la funcion
});

ciudad.addEventListener("change", (e) => {
  datosBusqueda.ciudad = e.target.value;
  filtrarReporteVentas();
});

ordenar.addEventListener("change", (e) => {
  datosBusqueda.ordenar = e.target.value;
  ordernarResultados();
});

canal.addEventListener("change", (e) => {
  datosBusqueda.canal = e.target.value;
  filtrarReporteVentas();
});

ventaMinima.addEventListener("change", (e) => {
  datosBusqueda.minima = e.target.value;
  filtrarReporteVentas();
});

ventaMaxima.addEventListener("change", (e) => {
  datosBusqueda.maxima = e.target.value;
  filtrarReporteVentas();
});

// FUNCIONES
function agregarHTML(ventas) {
  limpiarHTML(); //elimina html previo
  limpiarSuma(); //elimina la suma previa

  ventas.forEach((venta) => {
    const { fullName, zone, city, channel, sales } = venta;
    const ventaHTML = document.createElement("p");
    ventaHTML.classList.add("textcenter", "negrita");
    ventaHTML.textContent = `
        ${fullName} - 
        Zona: ${zone} - 
        Ciudad: ${city} - 
        Canal: ${channel} ---
        Venta: ${sales}
    `;
    sumaTotal(sales);
    // INSERTAR EN HTML
    resultado.appendChild(ventaHTML);
  });
  const sumatoria = document.createElement("p");
  sumatoria.classList.add("negrita", "ventatotal");
  let sumaFormateada = suma.toFixed(2);
  sumatoria.textContent = `Venta Total: ${sumaFormateada}`;

  resultado.appendChild(sumatoria);
}

// LIMPIA HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
function limpiarSuma() {
  suma = 0;
}

function sumaTotal(valorInicial) {
  suma += valorInicial;
}

function filtrarReporteVentas() {
  const resFiltrado = ventas
    .filter(filtradoZona)
    .filter(filtrarCiudad)
    .filter(filtrarCanal)
    .filter(filtrarVentaMin)
    .filter(filtrarVentaMax);

  if (resFiltrado.length) {
    agregarHTML(resFiltrado);
  } else noResutado();
  console.log(resFiltrado);
}
function noResutado() {
  limpiarHTML();
  const noResultado = document.createElement("p");
  noResultado.classList.add("textcenter", "negrita", "fondorojo");
  noResultado.textContent = `NO HAY RESULTADOS PARA MOSTRAR`;
  resultado.appendChild(noResultado);
  window.alert("no hay resultados para mostrar");
}
function ordernarResultados() {
  const { ordenar } = datosBusqueda;
  let ventasSorted = [];

  if (ordenar === "ascendente") {
    ventasSorted = ventas.sort((a, b) => a.sales - b.sales);
    agregarHTML(ventasSorted);
  } else {
    ventasSorted = ventas.sort((a, b) => b.sales - a.sales);
    agregarHTML(ventasSorted);
  }
}

function filtrarNombre() {
  const { nombre } = datosBusqueda;
  let filtradoXNombreArray = [];
  if (nombre) {
    filtradoXNombreArray = ventas.filter((venta) =>
      venta.fullName.includes(nombre)
    );
    if (filtradoXNombreArray.length) {
      agregarHTML(filtradoXNombreArray);
    } else {
      noResutado();
    }
  } else {agregarHTML(ventas)};
}

function filtradoZona(venta) {
  const { zona } = datosBusqueda;

  if (zona) {
    return venta.zone === zona;
  }
  return venta;
}
function filtrarCiudad(venta) {
  const { ciudad } = datosBusqueda;

  if (ciudad) {
    return venta.city === ciudad;
  }
  return venta;
}
function filtrarCanal(venta) {
  const { canal } = datosBusqueda;

  if (canal) {
    return venta.channel === canal;
  }
  return venta;
}
function filtrarVentaMin(venta) {
  const { minima } = datosBusqueda;

  if (minima) {
    return venta.sales >= minima;
  }
  return venta;
}
function filtrarVentaMax(venta) {
  const { maxima } = datosBusqueda;

  if (maxima) {
    return venta.sales < maxima;
  }
  return venta;
}
