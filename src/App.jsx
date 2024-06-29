import axios from "axios";
import Spinner from "./components/Spinner";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState, useEffect, lazy, Suspense } from "react";
import CharacterDetailModal from "./components/Modals/CharacterDetailModal";

const CharacterCard = lazy(() => import("./components/Cards/CharacterCard"));

const App = () => {
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      setCharacters(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((character) => (
          <Suspense key={character.name} fallback={<Spinner />}>
            <CharacterCard
              character={character}
              onClick={() => setSelectedCharacter(character)}
            />
          </Suspense>
        ))}
      </div>

      <div className="Pagination flex items-center justify-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 focus:outline-none flex items-center"
        >
          <FaAngleLeft size={24} />
        </button>
        <span className="text-gray-700">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 focus:outline-none flex items-center"
        >
          <FaAngleRight size={24} />
        </button>
      </div>

      {selectedCharacter && (
        <CharacterDetailModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default App;
