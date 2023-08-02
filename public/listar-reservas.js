const listadoReservas = document.querySelector('#listadoReservas');

const fetchReservas = async () => {
  const response = await fetch("http://localhost:8000/api/reservas");

  if (response.status === 404) {
    return [];
  }

  const data = response.json();
  return data;
};

const showReservas = (reservas) => {
  if (reservas.length === 0) {
    listadoReservas.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay reservas registradas aún.</td>
        </tr>
    `;
    return;
  }

  reservas.forEach((reserva) => {
    listadoReservas.innerHTML += `
                <tr>
                    <th scope="row">
                      ${reserva.id}
                    </th>
                    <td>
                      ${reserva.fullname}
                    </td>
                    <td>
                      ${reserva.code}
                    </td>
                    <td>
                      ${reserva.moviename}
                    </td>
                    <td>
                      ${reserva.moviedate}
                    </td>
                    <td>
                      ${reserva.price}
                    </td>
                    <td>
                    ${reserva.date && reserva.date.split('T')[0].split('-')[2]}/${reserva.date && reserva.date.split('T')[0].split('-')[1]}/${reserva.date && reserva.date.split('T')[0].split('-')[0]}                    </td>
                    <td>
                      <a href="/reservas/${reserva.id}/edit" class="btn btn-outline-success">Editar</a>
                      <button onclick=deleteReserva(event) class="btn btn-outline-danger" data-id="${reserva.id}">Eliminar</button>
                    </td>
                 </tr>
            `;
  });
};

const deleteReserva = async (event) => {
  const id = event.target.dataset.id;


  Swal.fire({
    title: 'Estás seguro?',
    text: `Estás por eliminar a una reserva del sistema!` ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Estoy seguro!',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {

      try {
        const res = await fetch(`http://localhost:8000/api/reservas/${id}`, {
          method: 'DELETE'
        });

        const data = await res.json();
        console.log(data);

        Swal.fire({
          icon: 'success',
          title: 'Reserva eliminada',
          text: data.message,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2200);

      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      }
    }
  })



}


document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const reservas = await fetchReservas();
    showReservas(reservas);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
