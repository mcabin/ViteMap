import { MapObjectProvider } from "../contexts/MapContexts"
import Map from "../components/map/Map";
import MapObjectEditor from "../components/map/MapObjectEditor";
function MapPage() {
  return (
    <MapObjectProvider>
      <div className='h-full w-full flex flex-wrap'>
        <div className="bg-red-500 w-[80%] h-full">
            <Map />
        </div>
        <div className='bg-red-200 w-[20%] h-full'>
          <MapObjectEditor />
        </div>
      </div>
  </MapObjectProvider>)
}

export default MapPage;
