// Recupera el ID del equipo desde localStorage
let equipoId = localStorage.getItem('equipoId');

// Ahora puedes usar el valor de equipoId para hacer la consulta necesaria a tu nueva API
console.log('ID del equipo:', equipoId);

if(equipoId  > 41 || equipoId === null){
    equipoId = 1;
    //localStorage.setItem('equipoId', equipoId);
}

const cargarJugadores = async () => {
    const url = `https://api-nba-v1.p.rapidapi.com/players?team=${equipoId}&season=2023`;
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
            const contenedor = document.getElementById('contenedor');

            datos.response.forEach(elemento => {
                const contenedorInfo = document.createElement('div');
                contenedorInfo.classList.add('info-container');
                
                const nuevoH5 = document.createElement('h5');
                nuevoH5.textContent = `Nombre: ${elemento.firstname}, ${elemento.lastname}`;
                contenedorInfo.appendChild(nuevoH5);

                const edadParrafo = document.createElement('p');
                edadParrafo.textContent = `Dorsal: ${elemento.leagues.standard.jersey}, Años Pro: ${elemento.nba.pro}`;
                contenedorInfo.appendChild(edadParrafo);

                const otrosDatosParrafo = document.createElement('p');
                otrosDatosParrafo.textContent = `Estatura: ${elemento.height.meters}m, Peso: ${elemento.weight.kilograms}`;
                contenedorInfo.appendChild(otrosDatosParrafo);
                
                contenedor.appendChild(contenedorInfo);
                // Agregar un hr con estilos
                const separador = document.createElement('hr');
                separador.classList.add('separador');
                contenedor.appendChild(separador);
            });

        } else {
            console.error('Error en la petición HTTP a la API');
        }

        

    } catch (error) {
        console.error(error);
    }
}

cargarJugadores();