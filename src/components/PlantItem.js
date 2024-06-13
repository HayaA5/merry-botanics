import CareScale from './CareScale'
import '../styles/PlantItem.css'
import { useContext, useRef, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { PopupContext2 } from '../contexts/PopupContext';
import PlantGallery from './PlantGallery';

function PlantItem({ cover, name, water, light, price, barcode, stock, stockReal }) {
	const [actualStock, setActualStock] = useState(stockReal);
	const [cart, updateCart] = useContext(CartContext);
	const [user,] = useContext(UserContext);
	const [imageHovered, setImageHovered] = useState(false);
	const [loading, setLoading] = useState(false)
	const { popup, setPopup } = useContext(PopupContext2)
	// console.log('pop', popup)
	const handleOnMouseLeave = () => {
		setImageHovered(false);
		// console.log('leave');
	};
	const handleOnMouseEnter = () => {
		setImageHovered(true);
		// console.log("enter")
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
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			updateCart([
				...cartFilteredCurrentPlant,
				{ barcode, name, price, amount: currentPlantAdded.amount + 1, stock }
			])
		} else {
			updateCart([...cart, { barcode, name, price, amount: 1, stock }])
		}
	}

	return (
		<li className='mb-plant-item'>
			<span className='mb-plant-item-price'>{price}$</span>
			{/* <div className='mb-plant-item-cover'> */}
			{imageHovered ? <div className='plant-description' onMouseLeave={handleOnMouseLeave}>plant dscription ------------------------blab blab bal</div>
				:
				<img className='mb-plant-item-cover' src={cover} alt={`${name} cover`}
					onMouseOver={handleOnMouseEnter} />
			}


			{/* <img src={cover} alt={`${name} cover`} /> */}
			{/* </div> */}
			{name}
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
					{/* <input type='number' step={1} minLength={1} maxLength={2} width='10px' /> */}
					<div class="cart">
						<AiOutlineShoppingCart />
						{/* <svg viewBox="0 0 36 26">
						<AiOutlineShoppingCart />
						<polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
						<polyline points="15 13.5 17 15.5 22 10.5"></polyline>
					</svg> */}
					</div>
				</button>
				{/* <button onClick={() => setPopup(<img src={cover} width="100px" height="100px" />)}>mor imag</button> */}
				<button className='mb-btn' onClick={() => setPopup(
					// "gggggggggg"
					<PlantGallery images={[cover, cover, cover, cover, cover, cover, cover, cover, cover]} />
					// <div>
					// 	<img src={cover} width="100px" height="100px" />
					// 	<img src={cover} width="100px" height="100px" />
					// 	<img src={cover} width="100px" height="100px" />
					// </div>
				)}>more images</button>
			</div>

		</li>
	)
}

export default PlantItem