import CareScale from './CareScale'
import '../styles/PlantItem.css'
import { useContext, useRef, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
function PlantItem({ cover, name, water, light, price ,barcode, stock, stockReal}) {
	const [actualStock, setActualStock]=useState(stockReal);
	const [cart,updateCart]=useContext(CartContext);	
	const [user, ]=useContext(UserContext);
useEffect(
	updateActualStock,[cart]
)
 function updateActualStock(){
 	const plantInCart = cart.find((plant) => plant.barcode === barcode) ;
 	setActualStock( plantInCart?stock-plantInCart.amount:stock);
 }
	function addToCart(barcode,name, price) {
		const currentPlantAdded = cart.find((plant) => plant.barcode === barcode)
		if (currentPlantAdded) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			updateCart([
				...cartFilteredCurrentPlant,
				{barcode, name, price, amount: currentPlantAdded.amount + 1 }
			])
		} else {
			updateCart([...cart, { barcode,name, price, amount: 1 }])
		}
	}

	return (
		<li className='mb-plant-item'>
			<span className='mb-plant-item-price'>{price}$</span>
			{/* <div className='mb-plant-item-cover'> */}
			<img className='mb-plant-item-cover' src={cover} alt={`${name} cover`} />
			{/* <img src={cover} alt={`${name} cover`} /> */}
			{/* </div> */}
			{name}
			<div>
				<CareScale careType='water' scaleValue={water} key={`water ${water}`} />
				<CareScale careType='light' scaleValue={light} key={`light ${light}`} />
			</div>
			<button onClick={() =>{ addToCart(barcode,name, price); updateActualStock(); }} className={`mb-add-btn ${actualStock<=0? 'btn-disabled' : ''}`} disabled={actualStock<=0}>Add</button>
			
		</li>
	)
}

export default PlantItem