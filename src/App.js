import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
    .then(res => {
      setRepositories(res.data)
    })
  },[])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Desafio NLW 2 ${Date.now()}`,
      url: "Teste",
      techs: [
        "Node.js",
        "typescript",
        "Express"
      ]
    })

    setRepositories([...repositories, res.data])
  }

  async function handleRemoveRepository(id) {
    const newRepositoriesList = repositories.filter(repo => repo.id !== id)
    await api.delete('repositories/'+id)    
    setRepositories(newRepositoriesList)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(
            repo => 
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )}       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
