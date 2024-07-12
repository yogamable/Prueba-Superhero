//2ea7c80209f0d6f567db2d982200e867

let numeroElegido = document.querySelector('form');
const respuestas = document.querySelector('.respuestas');

numeroElegido.addEventListener('submit', validandoId);

async function validandoId(event) {
    event.preventDefault();
    console.log(event.target[0].value, typeof event.target[0].value);

    const BASE_URL = "https://superheroapi.com/api.php/3033707663582647/";
    const idSuperheroe = event.target[0].value;
    
    getSuperHero(BASE_URL + idSuperheroe);
}

function getSuperHero(url){
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log('API reponse:' , response);
            pintarDOM(response);
        },
        error: function(){
            alert("Error de escritura, inténtalo nuevamente!");
        }
    });
};

function pintarDOM(data) {
    pintarCard(data);
    pintarCanvas(data);
}

function pintarCard(data){
    const card = (`<div class="row g-0">
            <div class="col-md-4">
                    <img src="${data.image.url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.connections["group-affiliation"]}</p>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${data.biography.publisher}</li>
                        <li class="list-group-item">${data.work.occupation}</li>
                        <li class="list-group-item">${data.biography["first-appearance"]}</li>
                        <li class="list-group-item">${data.appearance.height}</li>
                        <li class="list-group-item">${data.appearance.weight}</li>
                        <li class="list-group-item">${data.connections.relatives}</li>
                    </ul>
                </div>
            </div>
        </div>`);
    respuestas.innerHTML = card;
}

function pintarCanvas(data) {
    console.log(data);

    let chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Estadísticas de Poder para" + data.name,
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: 51.08, label: "Chrome" },
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
