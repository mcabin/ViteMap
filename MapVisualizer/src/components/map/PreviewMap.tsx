import type { MapModel } from "./Map";

interface MapPreviewProps {
  map: MapModel;
  onSelect?: (map: MapModel) => void;
}

function PreviewMap({ map, onSelect }: MapPreviewProps) {


  return (
    <div
      className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition "
      onClick={() => onSelect?.(map)}
    >
      <img
        src={map.spritePath}
        alt={map.name}
        className="w-full h-[80%] object-cover"
      />
      <div className="p-2 text-center font-semibold">{map.name}</div>
    </div>
  )
}

export default PreviewMap;