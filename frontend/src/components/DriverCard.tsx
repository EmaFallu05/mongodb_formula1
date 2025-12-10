import { Flag, Calendar } from 'lucide-react';
import type { Driver } from "../types/types";

interface DriverCardProps {
  driver: Driver;
}

export function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">
              {driver.firstName} {driver.lastName}
            </h3>
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
              {driver.code}
            </span>
          </div>
          <p className="text-sm text-gray-500">#{driver.driverId}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <Flag className="w-4 h-4 text-red-600" />
          <span className="text-sm">{driver.country}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-red-600" />
          <span className="text-sm">{new Date(driver.dob).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
