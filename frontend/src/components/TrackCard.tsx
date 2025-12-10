import type { Track } from "../types/types";
import { MapPin, Flag, History } from 'lucide-react';

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{track.name}</h3>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{track.location}</span>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            track.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {track.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="space-y-3 mt-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Flag className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium">{track.country}</span>
        </div>

        {track.history.length > 0 && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">
                Grand Prix Years
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {track.history.slice(0, 10).map((year) => (
                <span
                  key={year}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {year}
                </span>
              ))}
              {track.history.length > 10 && (
                <span className="px-2 py-1 text-gray-500 text-xs">
                  +{track.history.length - 10} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
