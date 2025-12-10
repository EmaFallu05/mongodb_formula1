import { useState } from 'react';
import { Flag, Users, MapPin } from 'lucide-react';
import { DriversSection } from "./components/DriverSection";
import { TeamsSection } from "./components/TeamsSection";
import { TracksSection } from "./components/TrackSection";

type Section = 'drivers' | 'teams' | 'tracks';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('drivers');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">F1 Dashboard</h1>
                <p className="text-sm text-gray-500">Formula 1 Data Explorer</p>
              </div>
            </div>
          </div>

          <nav className="flex gap-1 -mb-px">
            <button
              onClick={() => setActiveSection('drivers')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'drivers'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4" />
              Drivers
            </button>
            <button
              onClick={() => setActiveSection('teams')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'teams'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Flag className="w-4 h-4" />
              Teams
            </button>
            <button
              onClick={() => setActiveSection('tracks')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'tracks'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Tracks
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'drivers' && <DriversSection />}
        {activeSection === 'teams' && <TeamsSection />}
        {activeSection === 'tracks' && <TracksSection />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            F1 Dashboard - Formula 1 Data Explorer
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
