import { useState, useRef, useEffect } from "react";
import './styles/FormSearch.css'
import axios from "axios";

const FormSearch = ({ setLocationSelect }) => {
  const inputSearch = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocationSelect(searchTerm.trim());
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchData = () => {
        axios
          .get(`https://rickandmortyapi.com/api/location?name=${searchTerm}`)
          .then((response) => {
            setSuggestions(response.data.results); 
          })
          .catch((error) => {
            console.error(error);
         
          });
      };
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

//   
return (
  <div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__input-container">
        <input
          className="form__input"
          ref={inputSearch}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="form__btn">Search</button>
    </form>
    <div>
    {suggestions.length > 0 && (
          <ul className="suggestions" style={{ maxHeight: '100px', overflowY: 'auto' }}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => {
                  setLocationSelect(suggestion.id);
                  setSuggestions([]);
                }}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  </div>
);
};

export default FormSearch;

