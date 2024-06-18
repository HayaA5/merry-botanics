import { useState, useEffect } from 'react';
import '../styles/PlantGallery.css'
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
// import { FcPrevious } from "react-icons/fc";

export default function PlantGallery({ images }) {
    const [index, setIndex] = useState(0);
    // let timer1 = setTimeout(() => setShowLoading(true), 1000)
    console.log('tim', index)

    // let timer1 = setTimeout(() => setIndex(index => index === images.length - 1 ? 0 : (index + 1)), 1000)
    useEffect(() => {
        const timer1 = setTimeout(() => setIndex(index => index === images.length - 1 ? 0 : (index + 1)), 2000)

        return () => {
            clearTimeout(timer1);
        };
    }, [index]);


    return (
        <div className="images-container">
            {/* <IconContext.Provider value={{ color: "red", className: "caroussel-icon", backgroudColor: 'red' }}>
                <div>
                    <GrPrevious />
                </div>
            </IconContext.Provider>; */}
            {/* <GrPrevious /> */}
            <GrPrevious className='caroussel-icon prev' onClick={() => setIndex(index => index === 0 ? images.length - 1 : (index - 1))} size={25} />
            <img src={images[index]} className='image' />
            <GrNext className='caroussel-icon next' onClick={() => setIndex(index => index === images.length - 1 ? 0 : (index + 1))} size={25} />
        </div>
    )
}