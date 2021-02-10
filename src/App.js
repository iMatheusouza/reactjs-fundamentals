import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);
  const [repositorieName, setRepositorieName] = useState('');

  useEffect(() => {
    api.get('/repositories')
    .then(response => {
      setRepositories(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  }, [])

  async function handleAddRepository() {
    const newRepositorie = await api.post('/repositories', {
      title: repositorieName,
      url: "http://github.com/fakeurl123",
      techs: [
        'ReactJs',
        'NodeJs'
      ]
    });

    setRepositories([...repositories, newRepositorie.data]);
  }

  async function handleRemoveRepository(id) {
    //Solução com promise
    api.delete(`/repositories/${id}`)
    .then(response => {
      console.log(response);
      const filteredRepositories = repositories.filter(repositorie => repositorie.id !== id);
      setRepositories(filteredRepositories);
    })
    .catch(error => {
      console.error(error);
    })

    //Solução com async await
    /*
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      console.log(response);
      const filteredRepositories = repositories.filter(repositorie => repositorie.id !== id);
      setRepositories(filteredRepositories);
    }

    else {
      console.log(response);
    }*/
  }

  function handleRepositorieName(name) {
    setRepositorieName(name);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            <p>
              {repositorie.title}
            </p>
            <button 
              onClick={() => handleRemoveRepository(repositorie.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        name="" 
        id=""
        placeholder="Enter Repositorie name"
        onChange={event => handleRepositorieName(event.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
