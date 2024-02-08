const selectTemporadas = document.getElementById('selectTemporadas');

// Añade la primera opción vacía
const opcionVacia = document.createElement('option');
opcionVacia.value = '';
opcionVacia.textContent = 'Seleccionar temporada';
selectTemporadas.appendChild(opcionVacia);

//añadimos los años
for (let temporada = 2015; temporada <= 2023; temporada++) {
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.value = temporada;
    nuevaOpcion.textContent = temporada;
    selectTemporadas.appendChild(nuevaOpcion);
}

const cargarEquipos = async () => {
    const url = 'https://api-nba-v1.p.rapidapi.com/teams';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2a7508c3bemsh51bef19c0742b6ap1282bfjsne004f0f035f3',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    let opcionesEquipos='';

    try {
        const respuesta = await fetch(url, options);
        console.log(respuesta);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log(datos);

            var indicesDeseados = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 37, 39, 40];

            for (var i = 0; i < indicesDeseados.length; i++) {
            var indiceActual = indicesDeseados[i];
                // Verifica si el índice está dentro del rango válido
                if (indiceActual >= 0 && indiceActual < datos.response.length) {
                    var equipo = datos.response[indiceActual];
                    console.log("Nombre: " + equipo.name);

                    // Acumula las opciones en una cadena
                    opcionesEquipos += `<option value="${equipo.id}">${equipo.name}</option>`;
                }
            }
            // Asigna la cadena de opciones al contenido del elemento
            document.getElementById('selectEquipos').innerHTML = opcionesEquipos;
        } else {
            console.error('Error en la petición HTTP a la API');
        }
    } catch (error) {
        console.error(error);
    }
}

cargarEquipos();

const buscarEstadisticas = async () => {

    const temporadaSeleccionada = document.getElementById('selectTemporadas').value;
    const equipoSeleccionado = document.getElementById('selectEquipos').value;    

    const url = `https://api-nba-v1.p.rapidapi.com/teams/statistics?id=${equipoSeleccionado}&season=${temporadaSeleccionada}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2a7508c3bemsh51bef19c0742b6ap1282bfjsne004f0f035f3',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const respuesta = await fetch(url, options);
        console.log(respuesta);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log(datos);

            const primerEquipo = datos.response[0];
            console.log("Games:", primerEquipo.games);
            console.log("Assists:", primerEquipo.assists);
            console.log("Points:", primerEquipo.points);


            // Crear la tabla dinámicamente
            const tabla = document.createElement('table');
            tabla.classList.add('estadisticas-table'); // Puedes agregar clases según tu estilo CSS

            // Encabezado de la tabla
            const encabezado = document.createElement('thead');
            const encabezadoFila = document.createElement('tr');
            encabezadoFila.innerHTML = '<th>Partidos</th><th>Asistencias</th><th>Puntos</th><th>Tapones</th><th>Robos</th><th>Pérdidas</th>'; // Añade más th según sea necesario
            encabezado.appendChild(encabezadoFila);
            tabla.appendChild(encabezado);

            // Cuerpo de la tabla
            const cuerpoTabla = document.createElement('tbody');
            const fila = document.createElement('tr');
            fila.innerHTML = `<td>${primerEquipo.games}</td><td>${primerEquipo.assists}</td><td>${primerEquipo.points}</td><td>${primerEquipo.blocks}</td><td>${primerEquipo.steals}</td><td>${primerEquipo.turnovers}</td>`; // Añade más td según sea necesario
            cuerpoTabla.appendChild(fila);
            tabla.appendChild(cuerpoTabla);

            // Agregar la tabla al nuevo contenedor
            const resultadosContenedor = document.getElementById('resultadosContenedor');
            resultadosContenedor.innerHTML = ''; // Limpia el contenido actual antes de agregar la tabla
            resultadosContenedor.appendChild(tabla);
            
        } else {
            console.error('Error en la petición HTTP a la API');
        }

    } catch (error) {
        console.error(error);
    }
}

const logoEquipo = async () => {

    const equipoSeleccionadoId = document.getElementById('selectEquipos').value;

    const url = 'https://api-nba-v1.p.rapidapi.com/teams';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2a7508c3bemsh51bef19c0742b6ap1282bfjsne004f0f035f3',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const respuesta = await fetch(url, options);
        console.log(respuesta);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log(datos);

            // Encuentra la información del equipo seleccionado
            const equipoSeleccionado = datos.response.find(equipo => equipo.id === parseInt(equipoSeleccionadoId));

            if (equipoSeleccionado) {
                console.log("Nombre: " + equipoSeleccionado.name);

                // Actualiza el HTML directamente con el logo del equipo seleccionado
                document.getElementById('equipoLogo').src = equipoSeleccionado.logo;
                document.getElementById('equipoLogo').alt = 'Logo del equipo';
            } else {
                console.error('Equipo no encontrado');
            }
        } else {
            console.error('Error en la petición HTTP a la API');
        }
    } catch (error) {
        console.error(error);
    }
}

// Agregar un evento de clic al botón con id 'botonBuscar'
document.getElementById('botonBuscar').addEventListener('click',function(){
    buscarEstadisticas();
    logoEquipo();
});
