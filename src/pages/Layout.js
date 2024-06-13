import Header from '../components/Header'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import ShoppingList from '../components/ShoppingList'
import '../styles/Layout.css'
import { CartProvider } from '../contexts/CartContext'
//import { useLocation } from "react-router-dom";
import { Popup2Provider } from '../contexts/PopupContext'
import Popup from '../components/Popup'

function Layout() {

	//const location = useLocation();
	// let cartFromLocalStorage = location.state?.cart;
	// let logout = location.state?.logout;


	return (
		<div>
			<Popup2Provider>
				<Header />
				<CartProvider>
					<div className='mb-layout-inner'>
						{/* <Cart cartLS={cartFromLocalStorage} logout={logout}/> */}
						<Cart />
						<ShoppingList />
					</div>
				</CartProvider>
				<Popup />
				<Footer />
			</Popup2Provider>
		</div>
	)
}
export default Layout