import { useEffect, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import getRandomNumber from './services/getRandomNumber';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';
import FormSearch from './components/FormSearch';
import LoaderCard from './components/LoaderCard';




function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const randomLocation = getRandomNumber(126);
  const [locationSelect, setLocationSelect] = useState(randomLocation);

  console.log(locationSelect);

 
  const url = `https://rickandmortyapi.com/api/location/${locationSelect || getRandomNumber(126)}?page=${currentPage}`;
  const [location, getLocation, hasError, isLoading, setIsLoading] = useFetch(url);

  
  useEffect(() => {
    getLocation();
  }, [locationSelect, currentPage]);


  const residentsPerPage = 8;

  
  const residents = location?.residents?.slice(
    (currentPage - 1) * residentsPerPage,
    currentPage * residentsPerPage
  );

  return (
    <div className='app'>
      <h1 className="app__title">
        <img className='app__banner1' src="./banner2.png" alt="Banner de la aplicación" />
        <img className='app__banner2' src="./banner3.png" alt="Banner nombre app" />
      </h1>
      {isLoading ? ( <LoaderCard />
      ) :
      <FormSearch setLocationSelect={setLocationSelect} />}
      {hasError ? (
        <h2 className='app__error'>❌Hey! you must provide an id from 1 to 126🫠 </h2>
      ) : (
        <>
          <LocationInfo location={location} />
          <div className='container-resident'>
            {residents?.map((url) => (
              <ResidentCard key={url} url={url} />
            ))}
          </div>
          <div className="pagination-buttons"> 
    <button
      className="btn btn-prev"
      onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
    >
      🔙
    </button>
    <button
      className="btn btn-next"
      onClick={() =>
        setCurrentPage(prevPage =>
          Math.min(
            prevPage + 1,
            Math.ceil(location.residents.length / residentsPerPage)
          )
        )
      }
    >
      🔜
    </button>
  </div>

        </>
      )}
    </div>
  );
}

export default App;
