document.addEventListener('DOMContentLoaded', function () {

    let textoBusqueda = "";

    const busqueda = async () => {

        // Obtén el valor del campo de búsqueda y asigna a la variable
        textoBusqueda = document.getElementById('inputBuscar').value;
        console.log('Texto de búsqueda:', textoBusqueda);

        const url = `https://api-nba-v1.p.rapidapi.com/players?search=${textoBusqueda}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2a7508c3bemsh51bef19c0742b6ap1282bfjsne004f0f035f3',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        }


        try {
            const respuesta = await fetch(url, options);
            console.log(respuesta);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                console.log(datos);

                // Accede al contenedor donde deseas mostrar los resultados
                const resultadosContenedor = document.getElementById('contenedorTexto');

                // Limpia el contenido actual antes de agregar nuevos resultados
                resultadosContenedor.innerHTML = '';

                // Recorre los datos y crea elementos HTML para mostrarlos
                datos.response.forEach((jugador, index) => {
                    const parrafoJugador = document.createElement('p');
                    parrafoJugador.style.fontSize = '1.5em';  // Tamaño de letra más grande
                    parrafoJugador.style.color = '#336b87';  // Color de letra azul

                    parrafoJugador.textContent = `${jugador.firstname} ${jugador.lastname}`;
                    resultadosContenedor.appendChild(parrafoJugador);
                    
                    // Agrega un hr después de cada jugador (excepto después del último)
                    if (index < datos.response.length - 1) {
                        const lineaHorizontal = document.createElement('hr');
                        resultadosContenedor.appendChild(lineaHorizontal);
                        
                        lineaHorizontal.style.borderTop = '2px solid #333'; // Añade un borde superior
                        resultadosContenedor.appendChild(lineaHorizontal);
                    }
                });

                // Limpia el contenido del campo de búsqueda
                document.getElementById('inputBuscar').value = '';

            } else {
                console.error('Error en la petición HTTP a la API');
            }
        } catch (error) {
            console.error(error);
        }

    };

    // Agregar un evento de clic al botón con id 'botonBuscar'
    document.getElementById('iconoBuscar').addEventListener('click', function () {
        console.log('Clic en el icono de búsqueda');
        busqueda();
    });

});