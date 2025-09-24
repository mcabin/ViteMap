
type MapObjectProp = {
  scale: number;
  position: { x: number; y: number };
  model:MapObjectModel;
  imgSize:{ width: number; height: number };
  startDrag:(id:number, e: React.MouseEvent<HTMLImageElement>)=>void;
};

export interface MapObjectModel  {
  id: number;
  name: string;
  spritePath: string;
  rotation:number;
  scale:number;
  position: { x: number; y: number };
};

function MapObject({model,startDrag ,scale,imgSize}: MapObjectProp) {
  

  const handleMouseDown=(e: React.MouseEvent<HTMLImageElement>)=>{
    if(e.button==0){
      e.preventDefault();
      startDrag(model.id, e);
    }
    if(e.button==2){
      e.preventDefault();
    }
  }      


    return (
        <img
            style={{
              width:imgSize.width*0.1,
              height:imgSize.height*0.1,
                position:"absolute",
                transform: `translate(${model.position.x*(imgSize.width)}px, ${model.position.y*(imgSize.height)}px ) scale(${model.scale})`,
                transformOrigin:"top left"
            }}
            src={model.spritePath}
            onMouseDown={handleMouseDown}
        />
    );
}
export default MapObject;
export type { MapObjectProp };