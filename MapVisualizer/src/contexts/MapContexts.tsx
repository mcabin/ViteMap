import { createContext, useContext, useState } from "react";
import type { MapObjectModel } from "../components/MapObject";

type MapObjectContextType = {
  mapObjects: MapObjectModel[];
  setMapObjects: React.Dispatch<React.SetStateAction<MapObjectModel[]>>;
};

const MapObjectContext = createContext<MapObjectContextType | undefined>(undefined);

export const MapObjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapObjects, setMapObjects] = useState<MapObjectModel[]>([]);


  return (
    <MapObjectContext.Provider value={{ mapObjects, setMapObjects }}>
      {children}
    </MapObjectContext.Provider>
  );
};

export const useMapObjectContext = () => {
  const context = useContext(MapObjectContext);
  if (!context) {
    throw new Error("useMapObjectContext must be used within a MapObjectProvider");
  }
  return context;
};
