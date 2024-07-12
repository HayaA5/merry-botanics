import { AiOutlineClose } from "react-icons/ai";
import { useState, useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import '../styles/CartItem.css'
import { CiTrash } from "react-icons/ci";

function CartItem({ name, index, price, amount, stock, cover }) {
    const [isHovered, setIsHovered] = useState(false);
    const [cart, updateCart] = useContext(CartContext);

    const handleOnMouseLeave = () => {
        setIsHovered(false);
    };
    const handleOnMouseEnter = () => {
        setIsHovered(true);
    };

    function removeFromCart(name) {
        const cartFilteredCurrentPlant = cart.filter(
            (plant) => plant.name !== name
        )
        updateCart([
            ...cartFilteredCurrentPlant
        ])
    }

    function updateQtyInCart(e, name) {
        if (Number(e.target.value) === 0) {
            removeFromCart(name)
        } else {
            updateCart(cart.map(plant => plant.name === name ? { ...plant, amount: e.target.value } : plant))
        }
    }

    return (
        <div className='one-article-in-cart' key={`${name}-${index}`}>
            <div className="one-article-container">
                <div className="one-article-info">
                    <img src={cover} className="one-article-img" />
                    {name}
                    <input type='number' className='input-qty' min={0} max={stock} onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => updateQtyInCart(e, name)} value={amount} />
                </div>
                <div className="one-article-total">{amount * price}$</div>
            </div>
            <div className='close-icon-container'
                onMouseOver={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}>
                <CiTrash className='empty-cart-icon' onClick={() => removeFromCart(name)} />
                {/* <AiOutlineClose className='close-icon'
                    onClick={() => removeFromCart(name)}
                /> */}
                <div className={`cart-details-message ${isHovered ? '' : 'invisible'}`}>remove</div>
            </div>
        </div>
    )
}
export default CartItem
