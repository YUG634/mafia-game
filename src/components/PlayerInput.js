import React, { useState } from "react";

function PlayerInput({ players, setPlayers, assignRoles }) {
  const [name, setName] = useState("");

  const handleAddPlayer = () => {
    const trimmed = name.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setName("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={name}
          placeholder="Enter player name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-yellow-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button onClick={handleAddPlayer} className="neon-button">
          ➕ Add
        </button>
      </div>

      {players.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {players.map((p, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-yellow-800 text-yellow-200 text-sm font-mono"
            >
              {p}
            </span>
          ))}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={assignRoles}
          className={`neon-button mt-4 ${
            players.length < 4 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={players.length < 4}
        >
          🎲 Assign Roles
        </button>
        {players.length < 4 && (
          <p className="text-sm text-yellow-300 mt-2">
            Minimum 4 players required
          </p>
        )}
      </div>
    </div>
  );
}

export default PlayerInput;
