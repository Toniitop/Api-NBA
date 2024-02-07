// Recupera el ID del equipo desde localStorage
let equipoId = localStorage.getItem('equipoId');

// Ahora puedes usar el valor de equipoId para hacer la consulta necesaria a tu nueva API
console.log('ID del equipo:', equipoId);

if(equipoId  > 41 || equipoId === null){
    equipoId = 1;
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
            const contenedor = document.getElementById('tablaJugadores');

            datos.response.forEach(elemento => {
                const nuevaFila = contenedor.insertRow(-1);
                const campos = ['Nombre', 'Dorsal', 'Temporadas', 'Altura', 'Peso'];

                campos.forEach(campo => {
                    const celdaNombre = nuevaFila.insertCell();
                    const celdaDorsal = nuevaFila.insertCell();
                    const celdaTempo = nuevaFila.insertCell();
                    const celdaAltura = nuevaFila.insertCell();
                    const celdaPeso = nuevaFila.insertCell();
                    celdaNombre.textContent = campo === 'Nombre' ? `${elemento.firstname}, ${elemento.lastname}` : elemento[campo.toUpperCase()];
                    celdaDorsal.textContent = campo === 'Dorsal' ? `${elemento.leagues.standard.jersey}` : elemento[campo.toUpperCase()];
                    celdaTempo.textContent = campo === 'Temporadas' ? `${elemento.nba.pro}` : elemento[campo.toUpperCase()];
                    celdaAltura.textContent = campo === 'Altura' ? `${elemento.height.meters}m` : elemento[campo.toUpperCase()];
                    celdaPeso.textContent = campo === 'Peso' ? `${elemento.weight.kilograms} kg` : elemento[campo.toUpperCase()];
                });
            });

        } else {
            console.error('Error en la petición HTTP a la API');
        }

        

    } catch (error) {
        console.error(error);
    }
}

cargarJugadores();
