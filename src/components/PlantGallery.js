import '../styles/PlantGallery.css'

export default function PlantGallery({ images }) {
    // console.log(images)
    return (
        <div className="images-container">

            {images.map(image => <img src={image} className='image' />)}
        </div>

    )
}