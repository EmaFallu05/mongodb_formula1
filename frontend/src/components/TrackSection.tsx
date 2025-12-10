import { useState, useEffect } from 'react';
import { TrackCard } from './TrackCard';
import { Search, Loader2, AlertCircle, Filter } from 'lucide-react';
import type { Track } from "../types/types";
import { tracksApi } from "../services/api";

type StatusFilter = 'all' | 'active' | 'inactive';

export function TracksSection() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    let filtered = tracks;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((track) =>
        statusFilter === 'active' ? track.is_active : !track.is_active
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (track) =>
          track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          track.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          track.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTracks(filtered);
  }, [searchTerm, statusFilter, tracks]);

  const loadTracks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tracksApi.getAll();
      setTracks(data);
      setFilteredTracks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tracks');
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
            onClick={loadTracks}
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
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, location, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'active'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'inactive'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {filteredTracks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No tracks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => (
            <TrackCard key={track.name} track={track} />
          ))}
        </div>
      )}
    </div>
  );
}
