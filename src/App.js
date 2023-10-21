// Cassio Yuji Hirassike Sakai RM: 551491
import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [jokes, setJokes] = useState([""]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())

      .then((data) => {
        setJokes(data.value);
      });
  };

  useEffect(() => {
    const listaDeFavoritosStringificada = localStorage.getItem("favoritos");

    const listaDeFavoritos = JSON.parse(listaDeFavoritosStringificada);

    if (listaDeFavoritos) {
      setFavorites(listaDeFavoritos);
    }
  }, []);

  const handleJokes = () => {
    if (!favorites.includes(jokes)) {
      const novoArray = [...favorites, jokes];
      const arrayDeJokesStringificada = JSON.stringify(novoArray);
      localStorage.setItem("favoritos", arrayDeJokesStringificada);
      setFavorites(novoArray);
    }
    getJoke();
  };
  const removeFavorite = (index) => {
    const shouldDelete = window.confirm("Tem certeza que quer deletar?");
    if (shouldDelete) {
      const novoArray = [...favorites];
      novoArray.splice(index, 1);
      const arrayDeJokesStringificada = JSON.stringify(novoArray);
      localStorage.setItem("favoritos", arrayDeJokesStringificada);
      setFavorites(novoArray);
    }
  };

  return (
    <div className="App">
      <h1 className="Title">Chuck Norris API</h1>
      <div className="Joke">{jokes}</div>
      <button className="fav-button" onClick={handleJokes}>
        Like
      </button>
      <div className="Favorites">
        <h2>Lista de Favoritos</h2>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
              {favorite}
              <button onClick={() => removeFavorite(index)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
