import { AlertCircle, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { teamsApi } from "../services/api";
import type { Team } from "../types/types";
import { TeamCard } from "./TeamCard";

export function TeamsSection() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTeams(teams);
    } else {
      const filtered = teams.filter(
        (team) =>
          team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.teamId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(filtered);
    }
  }, [searchTerm, teams]);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamsApi.getAll();
      setTeams(data);
      setFilteredTeams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-700">{error}</p>
          <button
            onClick={loadTeams}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search teams by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {filteredTeams.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No teams found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard key={team.teamId} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
