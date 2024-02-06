const cargarEquipos = async () => {
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

            let nombre_Equipos='';

            var indicesDeseados = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 37, 39, 40];

            for (var i = 0; i < indicesDeseados.length; i++) {
            var indiceActual = indicesDeseados[i];
                // Verifica si el índice está dentro del rango válido
                if (indiceActual >= 0 && indiceActual < datos.response.length) {
                    var equipo = datos.response[indiceActual];
                    console.log("Nombre: " + equipo.name + ", Logo: " + equipo.logo);

                    // Almacena el ID del equipo en localStorage
                    localStorage.setItem('equipoId', equipo.id);

                    nombre_Equipos += `
                    <div class="equipo">
                        <a  href="javascript:void(0);" onclick="clicEnEquipo(${equipo.id})">
                        <img class="escudo" src="${equipo.logo}" style="width: 85px; height: 85px;">
                        </a><br>
                        <h4><a class="nombre" href="jugadores.html" equipoId="${equipo.id}">${equipo.name}</a></h4><br>
                    </div>
                `;
                }
            }

            document.getElementById('contenedor').innerHTML = nombre_Equipos;

        } else {
            console.error('Error en la petición HTTP a la API');
        }

        

    } catch (error) {
        console.error(error);
    }
}

// Función para manejar el clic en el equipo y almacenar el ID en localStorage
function clicEnEquipo(equipoId) {
    localStorage.setItem('equipoId', equipoId);
    console.log('ID del equipo:', equipoId);

    // Ahora puedes redirigir a la página de jugadores.html o realizar otras acciones necesarias
    window.location.href = 'jugadores.html';
}

cargarEquipos();