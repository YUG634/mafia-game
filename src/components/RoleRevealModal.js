import React from "react";

function RoleRevealModal({ player, onClose }) {
  if (!player) return null;

  const roleColor = {
    Mafia: "text-red-500 border-red-500",
    Detective: "text-blue-400 border-blue-400",
    Doctor: "text-green-400 border-green-400",
    Villager: "text-yellow-300 border-yellow-300",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
      <div className="bg-gray-900 text-white border-2 p-8 rounded-xl shadow-xl text-center max-w-sm w-full animate-pulse border-yellow-500">
        <h2 className="text-xl mb-4 text-yellow-300">
          🎭 Hello, {player.name}
        </h2>
        <p
          className={`text-3xl font-bold uppercase mb-4 border-2 px-4 py-2 rounded-full inline-block ${roleColor[player.role]}`}
        >
          {player.role}
        </p>
        <button onClick={onClose} className="neon-button mt-4">
          ✅ Got it
        </button>
      </div>
    </div>
  );
}

export default RoleRevealModal;

