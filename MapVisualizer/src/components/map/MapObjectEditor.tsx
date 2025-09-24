import { useRef, useState } from 'react';
import {  useMapObjectContext } from "../../contexts/MapContexts";
import type { MapObjectModel } from './MapObject';
function MapObjectEditor() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputTextRef = useRef<HTMLSpanElement | null>(null);
    const [imagePreviewPath, setImagePreviewPath] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [imageScale, setImageScale] = useState<number>(1);
    const [sliderImageScaleValue, setsliderImageScaleValue] = useState<number>(50);
    const { mapObjects, setMapObjects } = useMapObjectContext();
    
    const handleFileLoadButtonClick = () => {
        fileInputRef.current?.click();
    }
    const handleInputImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files?.[0];
        if (imageFile) {
            setImagePreviewPath(URL.createObjectURL(imageFile));
            if (!imageName) {
                setImageName(imageFile.name);
            }
        }
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const content = event.target.value;
        setImageName(content)
    }

    const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setsliderImageScaleValue(val);

        let result: number;
        if (val <= 50) {
            // de 0 à 50 → map vers 0.1 à 1
            const t = val / 50; // normalisé 0 → 1
            result = 0.1 + t * (1 - 0.1);
        } else {
            // de 50 à 100 → map vers 1 à 3
            const t = (val - 50) / 50; // normalisé 0 → 1
            result = 1 + t * (5 - 1);
        }
        setImageScale(result);
    }

    const handleClickOnSpawn = () => {
        if (!imageName || !imagePreviewPath) return;
        const newMap: MapObjectModel = {
            id: 2324,
            name: imageName,
            spritePath: imagePreviewPath,
            rotation: 0,
            scale: imageScale,
            position: { x: 0, y: 0 }
        };
        setMapObjects([...mapObjects, newMap]);
    }

    return (
        <div className='w-full h-full overflow-auto relative flex flex-wrap justify-center'>
            {/* Afficheur de l'image objet*/}
            <div className='w-[85%] h-[33%] m-[5%] bg-red-400 border-2 border-red-400'>
                <div className='w-full h-[90%] overflow-auto bg-red-100'>
                    {imagePreviewPath &&
                        <img src={imagePreviewPath} className='w-full h-full object-contain' />
                    }
                </div>
                <div className='w-full h-[10%] flex items-center justify-center'>
                        <input type="text" onChange={handleNameChange} value={imageName? imageName:""} className='text-center'>
                        </input>
                </div>
            </div>
            {/* Editeur */}
            <div id="editor" className='w-[85%] h-[60%] border-2 border-red-400'>
                {/* Choix image */}
                <div id="img-uploader" className='flex-wrap w-[90%] h-[12%] ml-[7%] mt-[6%] '>
                    <label className="block   text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        <span className=''>Importer l'image du sprite de l'objet</span>
                    </label>
                    <div className='flex h-[60%] w-[90%] mt-[1.5%]'>

                        <button className=' !rounded-r-none !rounded-l-sm overflow-hidden flex items-center justify-center h-full w-[10%] !bg-amber-200'
                            onClick={handleFileLoadButtonClick}>
                            📂
                        </button>
                        <input accept="image/png" type="file" className='hidden' id='file-input-element' ref={fileInputRef} onChange={handleInputImageChange}></input>
                        <label htmlFor='file-input-element'
                            className="cursor-pointer bg-amber-100 text-black px-4 py-2 rounded-r-sm w-[80%] flex items-center"
                        >
                            <span ref={fileInputTextRef}>{imagePreviewPath ? imageName : "Importer une image"}</span>
                        </label>
                    </div>
                </div>
                
                {/* Choix de la taille de l'objet */}
                <div id="chose-size" className='ml-[7%] mt-[7%] w-[90%]'>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        <span>Changer la taille de l'objet</span>
                    </label>
                    <div className='flex w'>
                        <input type="range"
                        min={0}
                        max={100}
                        value={sliderImageScaleValue}
                        onChange={handleScaleChange}

                        ></input>
                        <span>{imageScale.toFixed(2)}</span>
                    </div>
                </div>
                {/* Spawn l'objet */}
                <div id="spawn-object" className='ml-[7%] mt-[7%] w-[90%]'>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        <span>Placer l'objet sur la carte</span>
                    </label>
                    <button onClick={handleClickOnSpawn}></button>
                </div>


            </div>
        </div>
    )
}

export default MapObjectEditor;
