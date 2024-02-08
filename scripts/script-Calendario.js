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

const calendarioEquipo = async () => {

    const equipoSeleccionado = document.getElementById('selectEquipos').value;    

    const url = `https://api-nba-v1.p.rapidapi.com/games?season=2023&team=${equipoSeleccionado}`;
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
            console.log(datos.response);

            // Crear la tabla dinámicamente
            const tabla = document.createElement('table');
            tabla.classList.add('estadisticas-table'); // Puedes agregar clases según tu estilo CSS

            // Encabezado de la tabla
            const encabezado = document.createElement('thead');
            const encabezadoFila = document.createElement('tr');
            encabezadoFila.innerHTML = '<th>Local</th><th></th><th> vs </th><th></th><th>Visitante</th>'; 
            encabezado.appendChild(encabezadoFila);
            tabla.appendChild(encabezado);

            datos.response.forEach((partidos) => {
                // Cuerpo de la tabla
                const cuerpoTabla = document.createElement('tbody');
                const fila = document.createElement('tr');

                fila.innerHTML = `<td>${partidos.teams.home.nickname}</td><td>${partidos.scores.home.points}</td><td> - </td><td>${partidos.scores.visitors.points}</td><td>${partidos.teams.visitors.nickname}</td>`; 
                cuerpoTabla.appendChild(fila);
                tabla.appendChild(cuerpoTabla);

                // Agregar la tabla al nuevo contenedor
                const resultadosContenedor = document.getElementById('resultadosContenedor');
                resultadosContenedor.innerHTML = ''; // Limpia el contenido actual antes de agregar la tabla
                resultadosContenedor.appendChild(tabla);
            });

        } else {
            console.error('Error en la petición HTTP a la API');
        }

    } catch (error) {
        console.error(error);
    }
}

// Agregar un evento de clic al botón con id 'botonBuscar'
document.getElementById('botonBuscar').addEventListener('click',function(){
    calendarioEquipo();
});