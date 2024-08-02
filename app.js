import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filters, setFilters] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput);
      const res = await axios.post('https://your-backend-url.com/bfhl', { data });
      setResponse(res.data);
    } catch (error) {
      console.error('Invalid JSON or server error', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value]
    );
  };

  const filteredResponse = response
    ? Object.keys(response)
        .filter((key) => filters.includes(key))
        .reduce((obj, key) => {
          obj[key] = response[key];
          return obj;
        }, {})
    : null;

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Enter JSON data"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <label>
          <input
            type="checkbox"
            value="alphabets"
            onChange={handleFilterChange}
          />
          Alphabets
        </label>
        <label>
          <input type="checkbox" value="numbers" onChange={handleFilterChange} />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="highest_alphabet"
            onChange={handleFilterChange}
          />
          Highest Alphabet
        </label>
      </div>
      {filteredResponse && (
        <div className="response">
          <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
