const updateReservaForm = document.querySelector('#updateReservaForm');
const backButton = document.querySelector('#cancelar')

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM cargado");

    const reservaId = updateReservaForm.dataset.id;


    try {
        const response = await fetch(
            `http://localhost:8000/api/reservas/${reservaId}`
        );

        // Si hubo un error al obtener los datos de un usuario
        if (!response.ok) {
            throw {
                message: "Error al obtener datos de la reserva",
            };
        }

        // Se obtienen los datos de la respuesta (fetch)
        const {
            fullname,
            code,
            moviename,
            moviedate,
            price,
            date
        } = await response.json();

        const inputfullname = document.querySelector('#fullname');
        const inputcode = document.querySelector('#code');
        const inputdate = document.querySelector('#date');
        const inputmoviename = document.querySelector('#moviename');
        const inputmoviedate = document.querySelector('#moviedate');
        const inputprice = document.querySelector('#price');

        inputfullname.value = fullname;
        inputcode.value = code;
        inputmoviename.value = moviename;
        inputmoviedate.value = moviedate;
        inputprice.value = price;
        inputdate.value = date.split('T')[0];

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
});




updateReservaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservaId = updateReservaForm.dataset.id;

    const formData = {
        fullname: e.target.fullname.value,
        code: e.target.code.value,
        moviename: e.target.moviename.value,
        moviedate: e.target.moviedate.value,
        price: e.target.price.value,
        date: e.target.date.value,
        
    }

    try {
        const response = await fetch(`http://localhost:8000/api/reservas/${reservaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const respToJson = await response.json();

        console.log(respToJson);

        if (response.status !== 201 && response.status !== 200) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: respToJson.message,
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Reserva se editó Correctamente',
            text: respToJson.message,
        });

        updateReservaForm.reset();

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.message,
            timer: 2000,
        })
    }

});
backButton.addEventListener('click', () => {
    window.location.href = "/";
});