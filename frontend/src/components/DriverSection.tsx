import { useState, useEffect } from 'react';
import type { Driver } from '../types/types';
import { DriverCard } from './DriverCard';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { driversApi } from "../services/api";

export function DriversSection() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDrivers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDrivers(drivers);
    } else {
      const filtered = drivers.filter(
        (driver) =>
          driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDrivers(filtered);
    }
  }, [searchTerm, drivers]);

  const loadDrivers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await driversApi.getAll();
      setDrivers(data);
      setFilteredDrivers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load drivers');
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
            onClick={loadDrivers}
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
            placeholder="Search by name, code, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {filteredDrivers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No drivers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <DriverCard key={driver.driverId} driver={driver} />
          ))}
        </div>
      )}
    </div>
  );
}
