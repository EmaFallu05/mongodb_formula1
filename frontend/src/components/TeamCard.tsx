import { Trophy, CalendarClock } from 'lucide-react';
import type { Team } from "../types/types";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const isActive = !team.activeUntil || team.activeUntil >= new Date().getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <Trophy className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
          </div>
          <p className="text-sm text-gray-500">ID: {team.teamId}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {team.activeUntil && (
        <div className="flex items-center gap-2 text-gray-700 mt-4 pt-4 border-t border-gray-100">
          <CalendarClock className="w-4 h-4 text-gray-500" />
          <span className="text-sm">
            {isActive ? 'Active until' : 'Active until'} {team.activeUntil}
          </span>
        </div>
      )}
    </div>
  );
}
