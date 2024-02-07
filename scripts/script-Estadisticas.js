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
