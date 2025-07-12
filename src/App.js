import React, { useState } from "react";
import Particles from "react-tsparticles";
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
    if (players.length < mafiaCount + 2) {
      alert("Not enough players for selected number of mafias.");
      return;
    }

    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const assignments = [];

    // Add mafias
    for (let i = 0; i < mafiaCount; i++) {
      assignments.push({ name: shuffledPlayers[i], role: "Mafia" });
    }

    // Add detective
    if (shuffledPlayers.length > assignments.length) {
      assignments.push({
        name: shuffledPlayers[assignments.length],
        role: "Detective",
      });
    }

    // Add doctor
    if (shuffledPlayers.length > assignments.length) {
      assignments.push({
        name: shuffledPlayers[assignments.length],
        role: "Doctor",
      });
    }

    // Remaining players = villagers
    for (let i = assignments.length; i < shuffledPlayers.length; i++) {
      assignments.push({ name: shuffledPlayers[i], role: "Villager" });
    }

    setAssignedRoles(assignments.sort(() => Math.random() - 0.5));
    setSeenRoles({});
  };

  return (
    <div className="relative min-h-screen bg-[url('https://cdn.pixabay.com/photo/2016/11/23/15/36/abstract-1850228_1280.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-10 text-white overflow-hidden">

      {/* Particle Animation */}
      <Particles
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 50 },
            size: { value: 2 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.3 },
            color: { value: "#ffffff" },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Game UI */}
      <div className="relative z-10 bg-black bg-opacity-60 backdrop-blur-md p-6 rounded-3xl max-w-xl w-full shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-yellow-400 drop-shadow-lg mb-6 tracking-wider">
          🕵️ Mafia Mayhem
        </h1>

        {/* Mafia Count Selector */}
        <div className="mb-6 text-center">
          <label className="font-semibold text-yellow-300 mr-2">
            Number of Mafias:
          </label>
          <select
            value={mafiaCount}
            onChange={(e) => setMafiaCount(parseInt(e.target.value))}
            className="text-black px-3 py-1 rounded"
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
          <div className="mt-8 bg-gray-900 bg-opacity-60 rounded-2xl p-5 border border-yellow-600 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center text-yellow-300">
              Tap your name to reveal your role
            </h2>
            <ul className="space-y-3">
              {assignedRoles.map((player, index) => (
                <li
                  key={index}
                  onClick={() => {
                    const alreadySeen = seenRoles[player.name];
                    if (!alreadySeen) {
                      setSelectedPlayer(player);
                    } else {
                      alert("⚠️ This role has already been viewed.");
                    }
                  }}
                  className={`cursor-pointer text-center py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition font-medium shadow-md ${
                    seenRoles[player.name] ? "opacity-50" : ""
                  }`}
                >
                  {player.name}
                </li>
              ))}
            </ul>
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










