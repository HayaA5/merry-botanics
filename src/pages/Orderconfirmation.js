import { Link } from "react-router-dom"
import '../styles/Orderconfirmation.css'

function Orderconfirmation() {
    return (
        <div className="fadeIn confirmation">
            <p>
                Thank you for buying by us!
            </p>
            <p>
                You will soon get an email with order details.
            </p>
            <p>
                Come back to our website <Link to="/">Merry Botanics</Link>
            </p>
        </div>
    )

};

export default Orderconfirmation

