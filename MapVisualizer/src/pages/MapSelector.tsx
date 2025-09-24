import { useEffect, useState } from "react";
import * as MapService from "../services/MapApi"
import type { MapModel } from "../components/map/Map";
import PreviewMap from "../components/map/PreviewMap";
import CreateMap from "../components/map/CreateMap";
function MapSelector() {
  const [maps, setMaps] = useState<MapModel[]>([]);
  const [selected, setSelected] = useState<MapModel | null>(null);
  const [createMapOpen, setIsCreateMapOpen] = useState(false);



  useEffect(() => {
    MapService.getAllMaps().then(data => setMaps(data))
      .catch(err => {
        console.log(err);
        setMaps([]);
      });
    console.log(maps)
  }, [])

  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select a map</h2>
      <div className="grid grid-cols-4 gap-4">
        {maps.map(map => (
          <PreviewMap
            key={map.id}
            map={map}
            onSelect={setSelected}
          />
        ))}
        {/* Div contenant le bouton pour ajouter une nouvelle map */}
        <div className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-wrap items-center justify-center"
          onClick={() => setIsCreateMapOpen(true)}>
          <span className="text-3xl">Créer une nouvelle carte</span>
        </div>
      </div>
      <CreateMap onClose={() => setIsCreateMapOpen(false)} isOpen={createMapOpen}></CreateMap>

    </div>
  )
}

export default MapSelector;