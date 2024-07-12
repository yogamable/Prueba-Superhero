//https://superheroapi.com/api.php/3033707663582647/id

acá id será tu id del input, ya sea concatenando como "url..." + id
o bien como template literal:
`url...../${id}`


Consulta Carlos

console.clear();
// Organizamos el código de forma lógica... pero 
// ¿Qué determina la lógica? En este caso, la entrada del usuario...
// 0. Cuando el usuario haga submit del id de un super héroe: 
// 1. Capturamos y validamos el número (ya está hecho por el html pero puedes hacer validaciones JS si quieres)
// 2. "armamos la string para url con la base y el id ingresado por el usuario"
// 3. Enviamos la string a la función que hace la request, y hacemos que la función devuelva la data si la request es exitosa.
// 4. Usamos la data para pintar el DOM y el CanvasJS

const formId = document.querySelector('form');          // capturamos el formulario con el input.
const cardContainer = document.querySelector('#cardContainer');

formId.addEventListener('submit', validarId);           // agregamos el listener para cuando se envíe el id


async function validarId(e) {                           // "e" representa al "evento submit"
  e.preventDefault();                                   // para que no se recargue la página y nos deje hacer
  console.log(e.target[0].value);                       // en e.target[0].value está el valor del input
  const BASE_URL = "https://superheroapi.com/api.php/3033707663582647/"     // url base
  const idSuperHero = e.target[0].value;
  getSuperHero(BASE_URL + idSuperHero);                 // esta función solo se encarga de la request.
}

function getSuperHero(url) {
  $.ajax({
    url: url,                                           // le pasamos la url del parámetro. 
    type: 'GET', 
    dataType: 'json',                                   // queremos un objeto json en respuesta
    success: function(response) {                           // si todo va ok, hacer este bloque
      // console.log('API response:', data);            // veamos la data por la consola.
      pintarDOM(response);
    },
    error: function(xhr, status, error) {               // si algo sale mal, hacer este otro bloque
      console.error('AJAX request failed with:', status, error);
      // alert("Algo salió mal al buscar su súper heroe");
      Swal.fire("Algo salió mal...");
      return null;                                      // retornamos null para avisar que salió mal
    }
  });
}

function pintarDOM(data) {
  Swal.fire("Buscando la data");   
  pintarCard(data);
  pintarCanvas(data);
}

function pintarCard(data) {
  const card = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.image.url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>`;
  cardContainer.innerHTML = card;
  
  
}


function pintarCanvas(data) {

console.log(data);
const chart = new CanvasJS.Chart("chartContainer", {
	theme: "dark2", // "light1", "light2", "dark1", "dark2"
	exportEnabled: true,
	animationEnabled: true,
	title: {
		text: "Data del SUPER HÉROE " + data.name,
	},
	data: [{
		type: "pie",
		startAngle: 25,
		toolTipContent: "<b>{label}</b>: {y}%",
		showInLegend: "true",
		legendText: "{label}",
		indexLabelFontSize: 16,
		// indexLabel: "{label} - {y}%",
    indexLabel: "{label}",
		dataPoints: [
			{ y: data.powerstats.intelligence, label: "inteligencia" },
			{ y: 27.34, label: "Internet Explorer" },
			{ y: 10.62, label: "Firefox" },
			{ y: 5.02, label: "Microsoft Edge" },
			{ y: 4.07, label: "Safari" },
			{ y: 1.22, label: "Opera" },
			{ y: 0.44, label: "Others" }
		]
	}]
});
chart.render();

}