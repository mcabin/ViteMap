import React, { useState, useRef, useEffect, use } from "react";
import type { MapObjectModel } from "./MapObject";
import MapObject from "./MapObject";
import {  useMapObjectContext } from "../../contexts/MapContexts";

export interface MapModel  {
    id: number;
    name: string;
    spritePath: string;
}

function Map() {
    const [maxZoom,setMaxZoom] = useState(3);
    const [minZoom,setMinZoom] = useState(1);
    const [scale, setScale] = useState<number>(minZoom);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState<boolean>(false);

    const [lastPos, setLastPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);
    const [mapModel, setMapModel] = useState<MapModel>({ id: 0, name: "World", spritePath: "src/assets/worldMap.jpg" });
    const imgRef = useRef<HTMLImageElement>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);

    //Map Object
    const { mapObjects, setMapObjects } = useMapObjectContext();
    const [objectIsDragged, setObjectIsDraged] = useState<boolean>(false);
    const [objectLastPosition, setObjectLastPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [draggedObjectId, setDraggedObjectId] = useState<number | null>(null);

    useEffect(() => {

        const container = containerRef.current;
        

        const containerObserver = container
            ? new ResizeObserver((entries) => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    setContainerSize({ width, height });
                    if(imgRef){
                        const imgTrueW=imgRef.current!.naturalWidth;
                        const imgTrueH=imgRef.current!.naturalHeight;
                        const imgWidthInContainer=height*(imgTrueW/imgTrueH);
                        if(imgWidthInContainer>width){
                            const imgHeightInContainer=width*(imgTrueH/imgTrueW);
                            console.log(imgHeightInContainer+" "+height)
                            setImgSize({width:width ,height:imgHeightInContainer})
                            console.log("Width")
                        }
                        else{
                            console.log("Height")
                            console.log(containerSize?.height+" "+height)
                            setImgSize({width:imgWidthInContainer ,height:height}) 
                        }
                    }
                }
            })
            : null;

        

        if (container && containerObserver) containerObserver.observe(container);
        
        return () => {
            if (containerObserver) containerObserver.disconnect();
        };
    }, [ ]);


    const handleStart = () => {
        if(mapObjects.length==0){
            const mapObjects: MapObjectModel[] = [{ id: 0, name: "", spritePath: "src/assets/pin.png", rotation: 0, scale: 1, position: { x:0, y: 0 } }]
            setMapObjects(mapObjects);

        }
        const mapModel: MapModel = { id: 0, name: "World", spritePath: "src/assets/worldMap.jpg" }
        setMapModel(mapModel)
    }
    //Zoom Molette
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;

        setScale((prev) => Math.min(Math.max(prev + delta, minZoom), maxZoom));
        var postX = position.x
        var postY = position.y
        if (postX > 0) {
            postX = 0;
        }
        if (postX < containerSize!.width - imgSize!.width * scale) {
            postX = containerSize!.width - imgSize!.width * scale;
        }
        if (postY < containerSize!.height - imgSize!.height * scale) {
            postY = containerSize!.height - imgSize!.height * scale;
        }
        if (postY > 0) {
            postY = 0;
        }
        setPosition({ x: postX, y: postY })
    }
    //Clic Droit:début du pan
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button === 0) {
            e.preventDefault();
        }
        else if (e.button === 2) {
            e.preventDefault();
            setIsPanning(true);
            setLastPos({ x: e.clientX, y: e.clientY });
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isPanning) {


            const dx = e.clientX - lastPos.x;
            const dy = e.clientY - lastPos.y;
            var newPosY = dy + position.y;
            var newPosX = dx + position.x;
            if (newPosX > 0) {
                newPosX = 0;
            }
            if (newPosX < containerSize!.width - imgSize!.width * scale) {
                newPosX = containerSize!.width - imgSize!.width * scale;
            }
            if (newPosY < containerSize!.height - imgSize!.height * scale) {
                newPosY = containerSize!.height - imgSize!.height * scale;
            }
            if (newPosY > 0) {
                newPosY = 0;
            }
            setPosition({ x: newPosX, y: newPosY });
            setLastPos({ x: e.clientX, y: e.clientY });
        }
       
    }

     const handleMouseMoveMapObjects = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!imgSize)
            return;
        if (objectIsDragged) {
            const rect = e.currentTarget.getBoundingClientRect(); // position et taille de la div

            const localNormX = (e.clientX - rect.left)/imgSize.width; 
            const localNormY = (e.clientY - rect.top)/imgSize.height;
            const dx = localNormX - objectLastPosition.x;
            const dy = localNormY - objectLastPosition.y;
            console.log(dx+" "+dy)
            setMapObjects(
                mapObjects.map(obj =>
                    obj.id === draggedObjectId
                        ? { ...obj, position: { x: dx + obj.position.x, y: dy + obj.position.y } }
                        : obj
                )
            );
            setObjectLastPosition({ x: localNormX, y: localNormY });
        }
     }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        //Right Click
        if (e.button === 2) {
            e.preventDefault();
            setIsPanning(false);
        }
        //Left Click
        if (e.button === 0 && objectIsDragged) {
            e.preventDefault();
            setObjectIsDraged(false);
            setDraggedObjectId(null);
        }
    };


    const handleOnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isPanning) {
            setIsPanning(false);
        }
        if (objectIsDragged) {
            setObjectIsDraged(false);
            setDraggedObjectId(null);
        }
    }

    const handleStartDrag = (id: number, e: React.MouseEvent<HTMLImageElement>) => {
        setDraggedObjectId(id);
        const rect = (e.currentTarget as HTMLElement).parentElement!.getBoundingClientRect(); // position et taille de la div

        const localNormX = (e.clientX - rect.left)/imgSize!.width; 
        const localNormY = (e.clientY - rect.top)/imgSize!.height;
        setObjectLastPosition({ x: localNormX, y: localNormY });
        console.log(objectLastPosition)
        setObjectIsDraged(true);
    }

    return (
            <div id="mapContainer" ref={containerRef} className="h-full w-full overflow-auto relative">

                <div id="mapLayer"
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseLeave={handleOnMouseLeave}
                    onLoad={handleStart}
                    style={{
                        position: 'absolute',
                        left: position.x,
                        top: position.y,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        width: imgSize ? imgSize.width : "auto",
                        height: imgSize ? imgSize.height : "auto",
                    }}
                >
                    <img src={mapModel.spritePath} alt={mapModel.name} ref={imgRef}
                        className="object-contain select-none w-full h-full"
                        style={{
                            position:"absolute",
                            transition: isPanning ? "none" : "transform 0.1s ease-out",
                        }} />
                    
                    <div style={{width:imgSize?.width,
                    height:imgSize?.height,
                    position:'absolute'
                    }}
                    onMouseMove={handleMouseMoveMapObjects}
                    id="mapObjectLayer"
                    >

                    {imgSize &&
                        mapObjects.map(obj => (
                            <MapObject
                                key={obj.id}
                                scale={scale}
                                position={position}
                                imgSize={imgSize}
                                model={obj}
                                startDrag={handleStartDrag}
                            />
                        ))
                    }
                    </div>

                </div>
            </div>
    );
}

export default Map;
