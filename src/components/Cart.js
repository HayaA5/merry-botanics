import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom';
import Payment from './Payment';
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import '../styles/Cart.css'
import { Tooltip } from 'react-tooltip'
// import './tooltip-styles.css';

//function Cart({cartLS,logout}){
function Cart() {

	const location = useLocation();
	const logout = location.state?.logout;
	const [user,] = useContext(UserContext);
	const [cart, updateCart] = useContext(CartContext);
	const [isOpen, setIsOpen] = useState(true)
	const [messageLogIn, setMessageLogIn] = useState('');
	const [isHovered, setIsHovered] = useState(false);

	const total = cart.reduce(
		(acc, plantType) => acc + plantType.amount * plantType.price,
		0
	)

	function removeFromCart(name) {
		const cartFilteredCurrentPlant = cart.filter(
			(plant) => plant.name !== name
		)
		updateCart([
			...cartFilteredCurrentPlant
		])
	}

	function updateQtyInCart(e, name) {
		const value = e.target.value
		console.log('hhh', value)
		// console.log('haya ', name)
		// console.log('aminov', value)
		updateCart(cart.map(plant => plant.name === name ? { ...plant, amount: value } : plant))
		// let x = cart.map(plant => {
		// 	// return { ...plant, amount: plant.amount + 7 }
		// 	// console.log('nam ', name)
		// 	// console.log('plant.nam ', plant.name)
		// 	if (plant.name === name) {
		// 		let a = { ...plant, amount: plant.amount + 1 };
		// 		// console.log('a', a)
		// 		return a; //{ ...plant, amount: plant.amount + 1 };
		// 		// console.log('a', a)
		// 	} else {
		// 		let b = plant;
		// 		// console.log('b', b)
		// 		return plant;

		// 	}
		// })
		// updateCart(x)
		console.log('x:', cart)

	}
	const handleOnMouseLeave = () => {
		// setIsHovered(false);
	};
	const handleOnMouseEnter = () => {
		// setIsHovered(true);
	};
	useEffect(() => {
		document.title = `MB: ${total}$ shopping`
	}, [total])

	useEffect(() => {
		//localStorage.setItem('cart', JSON.stringify(cart));
		setMessageLogIn('Aware! You are not logged in- data will be lost!');
	}, [cart]

	)
	useEffect(() => {
		logout && updateCart([])
	}, [logout])

	return isOpen ? (
		<div className='mb-cart'>
			<div className='shopping-cart-icon-container'>
				<AiOutlineShoppingCart className='shopping-cart-icon' />
				<button
					className='mb-cart-toggle-button'
					onClick={() => setIsOpen(false)}
				>
					close
				</button>

			</div>
			{cart.length > 0 ? (
				<div>
					<h2>Cart</h2>
					{!user.email && <div className='message-login'>{messageLogIn}</div>}

					<ul>
						{cart.map(({ name, price, amount, stock }, index) => (
							// <div className='one-article-container'>
							// <div>
							<div className='one-article-in-cart' key={`${name}-${index}`}>
								<div>
									{name} {price}$ x
									{/* <input type='number' step={1} size={2} maxLength={2} value={amount} width='5px' /> */}
									<input type='number' className='input-qty' min={0} max={stock} onKeyDown={(e) => e.preventDefault()} onChange={(e) => updateQtyInCart(e, name)} value={amount} />
								</div>
								<div className='close-icon-container'>
									<div>
										<AiOutlineClose className='close-icon'
											onMouseOver={handleOnMouseEnter}
											onMouseLeave={handleOnMouseLeave}
											onClick={() => removeFromCart(name)}
											id="remove-cross-icon"
										/>
										<h5>
											<Tooltip anchorSelect="#remove-cross-icon" class='tooltip-a'>
												remove
											</Tooltip>
										</h5>
									</div>
									{/* <div> */}
									{/* <div className={`details-message ${isHovered ? '' : 'invisible'}`}>remove</div> */}
									{/* {isHovered ? <div className='details-message'>remove</div> : <div className='details-message'></div>} */}

									{/* </div> */}
								</div>



								{/* <button className='cart-btn' onClick={() => {  }}>remove </button> */}
							</div>


							// </div>
						))}
					</ul>
					<h3>Total :{total}$</h3>
					<div className='cart-btns-container'>
						<button className='cart-btn' onClick={() => updateCart([])}>Empty cart</button>
						<Payment cart={cart} />
					</div>
				</div>
			) : (
				<div>Your cart is empty</div>
			)}
		</div>
	) : (
		<div className='mb-cart-closed'>
			<button
				className='mb-cart-toggle-button'
				onClick={() => setIsOpen(true)}
			>
				Open cart
			</button>
		</div>
	)
}

export default Cart