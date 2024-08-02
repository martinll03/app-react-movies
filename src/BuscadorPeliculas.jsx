import { useState } from "react"

const api_key = '99a998bc6d3e72fad3ac368fcd839829';
const urlBase = 'https://api.themoviedb.org/3/search/movie';
const urlImg = 'https://image.tmdb.org/t/p/w200';

export const BuscadorPeliculas = () => {
  const [buscador, setBuscador] = useState('')
  const [peliculas, setPeliculas] = useState([])

  const onchange = (value) => {
    setBuscador(value.target.value)
  }

  const onsubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  }

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${buscador}&api_key=${api_key}`)
      const data = await response.json()
      console.log('Data: ', data)
      setPeliculas(data.results)  // Asegúrate de acceder a la propiedad "results"
    } catch (error) {
      console.log('Este es el error: ', error)
    }
  }

  return (
    <>
      <div className="container">
        <form onSubmit={onsubmit}>
          <h1>Buscador de películas</h1>
          <input
            type="text"
            value={buscador}
            onChange={onchange}
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
        <div className="movie-list">
          {peliculas.map((pelicula) => {
            return (
              <div key={pelicula.id} className="movie-card">
                <img src={urlImg + pelicula.poster_path} alt={pelicula.title}/>
                <h2>{pelicula.title}</h2>
                <p>{pelicula.overview}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
