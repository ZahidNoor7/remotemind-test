import axios from "axios";
import { IoClose } from "react-icons/io5";
import React, { useEffect, useState } from "react";

const CharacterDetailModal = ({ character, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      if (character.homeworld) {
        try {
          const response = await axios.get(character.homeworld);
          setHomeworld(response.data);
        } catch (error) {
          console.error("Error fetching homeworld data:", error);
        }
      }
    };

    fetchHomeworld();
  }, [character.homeworld]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!character) return null;

  return (
    <div className="CharacterDetailModal">
      <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 relative">
          <header className="flex items-center justify-between p-4 shadow">
            <h2 className="text-2xl font-semibold">{character.name}</h2>
            <IoClose onClick={onClose} size={24} className="cursor-pointer" />
          </header>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-center mb-2">Profile</h3>
            <div className="border p-4 mb-4">
              <div>
                <p>
                  <strong>Height:</strong> {character.height / 100} m
                </p>
                <p>
                  <strong>Mass:</strong> {character.mass} kg
                </p>
                <p>
                  <strong>Birth Year:</strong> {character.birth_year}
                </p>
                <p>
                  <strong>Date Added:</strong> {formatDate(character.created)}
                </p>
                <p>
                  <strong>Films:</strong> {character.films.length}
                </p>
              </div>
            </div>
            {homeworld && (
              <div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Homeworld Info
                </h3>
                <div className="border p-4 ">
                  <p>
                    <strong>Name:</strong> {homeworld.name}
                  </p>
                  <p>
                    <strong>Terrain:</strong> {homeworld.terrain}
                  </p>
                  <p>
                    <strong>Climate:</strong> {homeworld.climate}
                  </p>
                  <p>
                    <strong>Population:</strong> {homeworld.population}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailModal;
