import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom';
import Payment from './Payment';
import { AiOutlineShoppingCart } from "react-icons/ai";
import '../styles/Cart.css'
// import { Tooltip } from 'react-tooltip'
import CartItem from './CartItem';
//function Cart({cartLS,logout}){
function Cart() {
	const location = useLocation();
	const logout = location.state?.logout;
	const [user,] = useContext(UserContext);
	const [cart, updateCart] = useContext(CartContext);
	const [isOpen, setIsOpen] = useState(true)
	const [messageLogIn, setMessageLogIn] = useState('');

	const total = cart.reduce(
		(acc, plantType) => acc + plantType.amount * plantType.price,
		0
	)

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
						{cart.map(({ name, price, amount, stock, cover }, index) => (
							<CartItem name={name}
								index={index}
								price={price}
								amount={amount}
								stock={stock}
								cover={cover}
							/>
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
				className='mb-cart-toggle-button closed'
				onClick={() => setIsOpen(true)}
			>
				Open cart
			</button>
		</div>
	)
}

export default Cart