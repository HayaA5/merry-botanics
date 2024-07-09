import { useState, useEffect } from 'react';
import '../styles/PlantGallery.css'
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export default function PlantGallery({ images }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setIndex(index => index === images.length - 1 ? 0 : (index + 1)), 2000)
        return () => {
            clearTimeout(timer1);
        };
    }, [index]);

    return (
        <div className="images-container">
            <GrPrevious className='caroussel-icon prev' onClick={() => setIndex(index => index === 0 ? images.length - 1 : (index - 1))} size={25} />
            <img src={images[index]} className='image' />
            <GrNext className='caroussel-icon next' onClick={() => setIndex(index => index === images.length - 1 ? 0 : (index + 1))} size={25} />
        </div>
    )
}