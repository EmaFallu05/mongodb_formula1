import type { Driver, Team, Track } from "../types/types";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const driversApi = {
  getAll: async (): Promise<Driver[]> => {
    const response = await fetch(`${API_BASE_URL}/drivers`);
    if (!response.ok) throw new Error("Failed to fetch drivers");
    return response.json();
  },

  getById: async (driverId: string): Promise<Driver[]> => {
    const response = await fetch(`${API_BASE_URL}/drivers/${driverId}`);
    if (!response.ok) throw new Error("Driver not found");
    return response.json();
  },

  getByCountry: async (country: string): Promise<Driver[]> => {
    const response = await fetch(`${API_BASE_URL}/drivers/country/${country}`);
    if (!response.ok) throw new Error("No drivers found for this country");
    return response.json();
  },
};

export const teamsApi = {
  getAll: async (): Promise<Team[]> => {
    const response = await fetch(`${API_BASE_URL}/teams`);
    if (!response.ok) throw new Error("Failed to fetch teams");
    return response.json();
  },

  getById: async (teamId: string): Promise<Team[]> => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}`);
    if (!response.ok) throw new Error("Team not found");
    return response.json();
  },
};

export const tracksApi = {
  getAll: async (): Promise<Track[]> => {
    const response = await fetch(`${API_BASE_URL}/tracks`);
    if (!response.ok) throw new Error("Failed to fetch tracks");
    return response.json();
  },

  getByName: async (trackName: string): Promise<Track[]> => {
    const response = await fetch(`${API_BASE_URL}/tracks/${trackName}`);
    if (!response.ok) throw new Error("Track not found");
    return response.json();
  },

  getByCountry: async (country: string): Promise<Track[]> => {
    const response = await fetch(`${API_BASE_URL}/tracks/country/${country}`);
    if (!response.ok) throw new Error("No tracks found for this country");
    return response.json();
  },

  getByStatus: async (isActive: boolean): Promise<Track[]> => {
    const response = await fetch(`${API_BASE_URL}/tracks/status/${isActive}`);
    if (!response.ok) throw new Error("Failed to fetch tracks by status");
    return response.json();
  },
};
