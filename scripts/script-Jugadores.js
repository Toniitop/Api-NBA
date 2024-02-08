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

            // Crear la tabla dinámicamente
            const tabla = document.createElement('table');
            tabla.classList.add('estadisticas-table'); // Puedes agregar clases según tu estilo CSS

            // Encabezado de la tabla
            const encabezado = document.createElement('thead');
            const encabezadoFila = document.createElement('tr');
            encabezadoFila.innerHTML = '<th>Nombre</th><th>Dorsal</th><th>Temporadas</th><th>Altura</th><th>Peso</th>'; 
            encabezado.appendChild(encabezadoFila);
            tabla.appendChild(encabezado);

            datos.response.forEach((elemento) => {
                // Cuerpo de la tabla
                const cuerpoTabla = document.createElement('tbody');
                const fila = document.createElement('tr');

                fila.innerHTML = `<td>${elemento.firstname}, ${elemento.lastname}</td><td>${elemento.leagues.standard.jersey}</td><td>${elemento.nba.pro}</td><td>${elemento.height.meters} m</td><td>${elemento.weight.kilograms} kg</td>`; 
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

cargarJugadores();
