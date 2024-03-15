window.onload = async () => {
    const URL_BASE = 'http://localhost:3031/api/';
    let query = new URLSearchParams(location.search);

    if (!query.has('id')) {
        alert('Necesito un ID de película');
        location.href = "http://127.0.0.1:5500/frontend/home.html";
    }

    const id = query.get('id');

    try {
        const responseMovie = await fetch(`${URL_BASE}movies/${id}`);
        const resultMovie = await responseMovie.json();
        const { data } = resultMovie;

        const inputTitle = document.getElementById('title');
        inputTitle.value = data.title;

        const inputRating = document.getElementById('rating');
        inputRating.value = data.rating;

        const inputAwards = document.getElementById('awards');
        inputAwards.value = data.awards;

        const inputReleaseDate = document.getElementById('release_date');
        inputReleaseDate.value = data.release_date.split('T')[0];

        const inputLength = document.getElementById('length');
        inputLength.value = data.length;

        const selectGenres = document.getElementById('genre');

        const responseGenres = await fetch(`${URL_BASE}genres`);
        const resultGenres = await responseGenres.json();

        resultGenres.data.forEach(genre => {
            const option = document.createElement('option');
            option.textContent = genre.name;
            option.value = genre.id;
            if (genre.id == data.genre_id) {
                option.selected = true;
            }
            selectGenres.appendChild(option);
        });
    } catch (error) {
        console.log(error);

    }

    const form = document.querySelector('form');
    const btnAgregar = document.querySelector('#btn-agregar');
    const btnEnviar = document.querySelector('#btn-enviar');

    btnAgregar.addEventListener('click', () => {
        form.reset();
        btnEnviar.textContent = "Guardar Cambios";
        query.set('edit', false);
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const endpoint = query.get('edit') == "true" ? `${URL_BASE}movies/update/${id}` : `${URL_BASE}movies/create`;

        try {
            const response = await fetch(endpoint, {
                method: query.get('edit') == "true" ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.elements.title.value,
                    rating: this.elements.rating.value,
                    awards: this.elements.awards.value,
                    release_date: this.elements.release_date.value,
                    length: this.elements.length.value,
                    genre_id: this.elements.genre.value,
                })
            });
            await response.json();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cambios guardados con éxito",
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => {
                location.href = "http://127.0.0.1:5500/frontend/home.html";
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    });
};
