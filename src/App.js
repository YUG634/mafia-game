import React, { useState } from "react";
import "@fontsource/press-start-2p";
import PlayerInput from "./components/PlayerInput";
import RoleRevealModal from "./components/RoleRevealModal";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [assignedRoles, setAssignedRoles] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [seenRoles, setSeenRoles] = useState({});
  const [mafiaCount, setMafiaCount] = useState(1);


  const assignRoles = () => {
  if (players.length < mafiaCount + 2) return; // Ensure enough players

  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
  const assignments = [];

  // Add mafias
  for (let i = 0; i < mafiaCount; i++) {
    assignments.push({ name: shuffledPlayers[i], role: "Mafia" });
  }

  // Add detective
  if (shuffledPlayers.length > assignments.length) {
    assignments.push({ name: shuffledPlayers[assignments.length], role: "Detective" });
  }

  // Add doctor
  if (shuffledPlayers.length > assignments.length) {
    assignments.push({ name: shuffledPlayers[assignments.length], role: "Doctor" });
  }

  // Remaining players are villagers
  for (let i = assignments.length; i < shuffledPlayers.length; i++) {
    assignments.push({ name: shuffledPlayers[i], role: "Villager" });
  }

  setAssignedRoles(assignments.sort(() => Math.random() - 0.5));
  setSeenRoles({});
};


  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 text-white">
      <div className="glass-box max-w-xl w-full z-10">
        <h1 className="text-yellow-400 text-2xl sm:text-3xl text-center mb-8 font-bold drop-shadow">
          🕵️ Mafia Night
        </h1>
        <div className="mb-4 text-center">
  <label className="font-semibold text-yellow-300 mr-2">
    Number of Mafias:
  </label>
  <select
    value={mafiaCount}
    onChange={(e) => setMafiaCount(parseInt(e.target.value))}
    className="text-black px-2 py-1 rounded"
  >
    {[1, 2, 3, 4, 5].map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
</div>


        <PlayerInput
          players={players}
          setPlayers={setPlayers}
          assignRoles={assignRoles}
        />

        {assignedRoles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-yellow-200 text-lg text-center mb-4">
              Tap your name to reveal your role
            </h2>
            <ul className="flex flex-col gap-3">
              {assignedRoles.map((player, index) => (
                <li
                  key={index}
                  className={`player-tile ${
                    seenRoles[player.name] ? "opacity-50" : ""
                  }`}
                  onClick={() => {
                    if (!seenRoles[player.name]) {
                      setSelectedPlayer(player);
                    } else {
                      alert("⚠️ You have already seen your role.");
                    }
                  }}
                >
                  {player.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {assignedRoles.length > 0 && (
  <div className="text-center mt-6">
    <button
      onClick={() => {
        setAssignedRoles([]);
        setSeenRoles({});
        setSelectedPlayer(null);
      }}
      className="neon-button"
    >
      🔄 New Game (Keep Players)
    </button>
  </div>
)}

  {players.length > 0 && (
  <div className="text-center mt-2">
    <button
      onClick={() => {
        setPlayers([]);
        setAssignedRoles([]);
        setSeenRoles({});
        setSelectedPlayer(null);
      }}
      className="neon-button bg-yellow-500 hover:bg-yellow-600"
    >
      🧹 Clear All Players
    </button>
  </div>
)}



        <RoleRevealModal
          player={selectedPlayer}
          onClose={() => {
            if (selectedPlayer) {
              setSeenRoles((prev) => ({
                ...prev,
                [selectedPlayer.name]: true,
              }));
            }
            setSelectedPlayer(null);
          }}
        />
      </div>
    </div>
  );
}

export default App;










