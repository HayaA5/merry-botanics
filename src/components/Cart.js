import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom';
import Payment from './Payment';
import { AiOutlineShoppingCart } from "react-icons/ai";
import '../styles/Cart.css'
import CartItem from './CartItem';
import { CiTrash } from "react-icons/ci";
import { TbTrash } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
//function Cart({cartLS,logout}){
function Cart() {
	const location = useLocation();
	const logout = location.state?.logout;
	const [user,] = useContext(UserContext);
	const [cart, updateCart] = useContext(CartContext);
	const [isOpen, setIsOpen] = useState(false)
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
	}, [])

	useEffect(() => {
		logout && updateCart([])
	}, [logout])

	return isOpen ? (
		<div className='mb-cart'>
			<div className='shopping-cart-icon-container'>
				{cart.length > 0 ? <CiTrash className='empty-cart-icon' onClick={() => updateCart([])} /> : <div></div>}
				<div>
					<AiOutlineShoppingCart className='shopping-cart-icon light' />
					<span class='badge badge-light'><p className='cart-qty'>  {cart.length}</p> </span>
				</div>
				<button
					className='mb-cart-toggle-button'
					onClick={() => setIsOpen(false)}
				>
					<AiOutlineClose className='close-icon' />
					{/* close */}
				</button>
			</div>
			{cart.length > 0 ? (
				<div>
					{/* <CiTrash className='empty-cart-icon' /> */}
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
						{/* <button className='cart-btn empty' onClick={() => updateCart([])}>Empty cart</button> */}
						<Payment cart={cart} />
					</div>
				</div>
			) : (
				<></>
				// <div>Your cart is empty</div>
			)}
		</div>
	) : (
		<div className='mb-cart-closed'>
			<button
				className='mb-cart-toggle-button closed'
				onClick={() => setIsOpen(true)}
			>
				<div className='shopping-cart-icon-container'>
					<AiOutlineShoppingCart className='shopping-cart-icon dark' />
					<span class='badge badge-dark'><p className='cart-qty'> {cart.length} </p></span>
				</div>
			</button>
		</div>
	)

}

export default Cart