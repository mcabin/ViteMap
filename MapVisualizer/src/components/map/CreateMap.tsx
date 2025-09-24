import { getImageDimensions } from "../../services/HandleImage";
import Modal from "../Modal";
import { useRef, useState } from 'react';

interface CreateMapProps {
    isOpen: boolean;
    onClose: () => void;
}
function CreateMap({ isOpen, onClose }: CreateMapProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputTextRef = useRef<HTMLSpanElement | null>(null);
    const [imagePreviewPath, setImagePreviewPath] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [imageSize,setImageSize]=useState<{width:number,height:number}|null>(null);
    const handleFileLoadButtonClick = () => {
        fileInputRef.current?.click();
    }
    const handleInputImageChange =async (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files?.[0];
        if (imageFile) {
            setImageSize(await getImageDimensions(imageFile))
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





    return (
        <Modal isOpen={isOpen} onClose={onClose} name="Créer une nouvelle carte">
            {/* Choix image */}
            <div id="img-uploader" className='flex flex-wrap w-[95%] justify-center '>

                <input type="text" className="rounded-sm border-1 border-black w-[90%]" placeholder="Nom de la nouvelle carte" onChange={handleNameChange}></input>
                {imagePreviewPath &&
                    <img src={imagePreviewPath}></img>
                }
                <div className='flex h-8 w-150 mt-1'>
                    <button className=' !rounded-r-none !rounded-l-sm overflow-hidden flex items-center justify-center h-full w-[10%] !bg-amber-200'
                        onClick={handleFileLoadButtonClick}>
                        📂
                    </button>
                    <input accept="image/png" type="file" className='hidden' id='file-input-element' ref={fileInputRef} onChange={handleInputImageChange}></input>
                    <label htmlFor='file-input-element'
                        className="cursor-pointer bg-amber-100 text-black px-4 py-2 rounded-r-sm w-[40%] flex items-center"
                    >
                        <span ref={fileInputTextRef}>{imagePreviewPath ? "Choisir une autre image" : "Importer une image"}</span>
                    </label>
                    {imageSize && 
                        <span className="text-center ml-6 mt-1">Dimension: {imageSize.width} X {imageSize.height}</span>
                    }
                </div>
                <div>
                    <button className={imageName && imagePreviewPath?"!bg-lime-400 rounded-xl text-white m-3 hover:!bg-green-600":"!bg-gray-300 bg-"}>
                         {imageName&& imagePreviewPath?"Créer la carte ✅": "Ajouter une image et un nom🔒​"}
                    </button>
                </div>
            </div>
        </Modal>

    )
}

export default CreateMap;

