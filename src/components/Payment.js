import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../contexts/CartContext'
import { UserContext } from "../contexts/UserContext";
import api from '../functions/API_Calls/apiCalls'
import { orderConfirmationMsg } from '../datas/emailTemplate'
import process from "process";
// import { v4 } from 'uuid';
import ShortUniqueId from "short-unique-id";
import '../styles/Payment.css'


const Payment = () => {
    const navigate = useNavigate();
    const [user,] = useContext(UserContext)
    const [cart,] = useContext(CartContext)
    const { randomUUID } = new ShortUniqueId({ length: 10 });

    function handleClick() {
        const url = `${process.env.REACT_APP_BASE_PATH}/api/orders/addorder`
        const cartElmts = cart.reduce((acc, article) => [...acc, { qty: article.amount, barcode: article.barcode }], [])
        const total = cart.reduce((acc, article) => acc + article.amount * article.price, 0)

        const data = {
            receiptNumber: randomUUID(), //v4(), //create a random unique id (string)
            total: total,
            email: user.email,
            cart: cartElmts
        }

        if (!user.email) {
            navigate('/login');
        } else {
            //save in DB the order, update stock in DB and send a confirmation email
            const data2 = orderConfirmationMsg(user.email, user.fullName, `order confirmation- order number: ${data.receiptNumber} at merry botanics`, cart)
            const url2 = `${process.env.REACT_APP_BASE_PATH}/api/email/sendemail`
            if (data2) {
                const response = api.post(url, data).then(() => api.post(url2, data2)).then(setTimeout(() => navigate('/receipt'), 1000));
            }
        }
    }

    return (
        <div>
            <button
                className='payment-btn'
                onClick={handleClick}
            >
                Payment
            </button>
        </div>
    )

}
export default Payment