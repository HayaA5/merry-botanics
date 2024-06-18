import CareScale from './CareScale'
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PopupContext2 } from '../contexts/PopupContext';
import PlantGallery from './PlantGallery';
import '../styles/PlantItem.css'

function PlantItem({ cover, name, water, light, price, barcode, stock, stockReal, description, images }) {
	const [actualStock, setActualStock] = useState(stockReal);
	const [cart, updateCart] = useContext(CartContext);
	const [imageHovered, setImageHovered] = useState(false);
	const [loading, setLoading] = useState(false)
	const { popup, setPopup } = useContext(PopupContext2)
	const handleOnMouseLeave = () => {
		setImageHovered(false);
	};
	const handleOnMouseEnter = () => {
		setImageHovered(true);
	};

	useEffect(
		updateActualStock, [cart]
	)
	function updateActualStock() {
		const plantInCart = cart.find((plant) => plant.barcode === barcode);
		setActualStock(plantInCart ? stock - plantInCart.amount : stock);
	}
	function addToCart(barcode, name, price) {
		const currentPlantAdded = cart.find((plant) => plant.barcode === barcode)

		if (currentPlantAdded) {
			updateCart(cart.map(plant => plant.barcode === barcode ?
				{ ...plant, amount: Number(currentPlantAdded.amount) + 1 } :
				plant
			))
		} else {
			updateCart([...cart, { barcode, name, price, amount: 1, stock, cover }])
		}
	}

	return (
		<li className='mb-plant-item'>
			<span className={`mb-plant-item-price ${imageHovered && 'price-is-hovered'}`}>{price}$</span>
			{imageHovered
				?
				<div className='plant-description' onMouseLeave={handleOnMouseLeave}>{description}</div>
				:
				<img className='mb-plant-item-cover' src={cover} alt={`${name} cover`}
					onMouseOver={handleOnMouseEnter} />
			}
			<div className='mb-plant-item-name'>
				{name}
			</div>
			<div>
				<CareScale careType='water' scaleValue={water} key={`water ${water}`} />
				<CareScale careType='light' scaleValue={light} key={`light ${light}`} />
			</div>
			<div className='btns-container'>
				<button onClick={() => {
					setLoading(true);
					addToCart(barcode, name, price);
					updateActualStock();
					setTimeout(() => setLoading(false), 3700);
				}}
					className={`mb-btn mb-add-btn ${actualStock <= 0 ? 'btn-disabled' : ''} ${loading ? 'loading' : ''}`}
					disabled={actualStock <= 0}>
					<span>Add</span>
					<div class="cart">
						<AiOutlineShoppingCart />
					</div>
				</button>
				<button className='mb-btn' onClick={() => setPopup(
					<PlantGallery images={images} />
				)}><span>More images</span></button>
			</div>
		</li>
	)
}

export default PlantItem