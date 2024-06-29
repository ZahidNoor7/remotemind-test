const CharacterCard = ({ character, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="CharacterCard p-4 border rounded shadow-sm bg-white transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <div className="relative">
        <img
          alt={character.name}
          className="w-full h-64 object-cover rounded"
          src={`https://picsum.photos/seed/${character.name}/200/300`}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800">{character.name}</h2>
        <p className="text-gray-600 mt-2">
          <strong>Birth Year:</strong> {character.birth_year}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
