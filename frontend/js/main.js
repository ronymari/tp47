localStorage.setItem("favorites22", JSON.stringify([]))
let favorites = JSON.parse(localStorage.getItem("favorites22"))

const favoriteChange = (e, id) => {
  e.target.classList.toggle("fa-solid")


  if (!favorites.length) {
    const fav = document.getElementById("favoritas")
    fav.href = "http://127.0.0.1:5500/frontend/favoritas.html"
    fav.textContent = "Favoritas"
  }

  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f != id)
    localStorage.setItem("favorites22", JSON.stringify(favorites))
  } else {
    favorites.push(id)
    localStorage.setItem("favorites22", JSON.stringify(favorites))
  }

}

window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  try {
    const response = await fetch("http://localhost:3031/api/movies")
    const result = await response.json()
    const { meta, data } = result


    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const link = document.createElement("a")
      link.classList = "editar"
      link.textContent = "editar"
      link.setAttribute("href", `formulario.html?id=${movie.id}&edit=${true}`)

      card.appendChild(link)


      const favorite = document.createElement("a")

      favorite.setAttribute("href", "#")
      favorite.classList = "favorite"
      favorite.innerHTML = `<i class="fa-regular fa-thumbs-up"></i>`
      favorite.setAttribute(`onclick`, `favoriteChange(event, ${movie.id})`)

      card.appendChild(favorite)


    });
  } catch (error) {
    console.log(error);
  }


};