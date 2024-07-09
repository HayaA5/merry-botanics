function contactMessage(email, title) {
    const msg =
        `<div style=" font-family: Edu TAS Beginner, cursive; color: rgba(49, 181, 114, 1);">
        <h1 style="font-weight: 600; font-size: 20px;">
            Welcome to Merry Botanics!!
        </h1>
        <p style=" font-size: 15px;">
            We will be in touch with you in the future and send you offers.
        </p>
        <p style=" font-size: 12px;">
            Merry botanics team
        </p>
    </div>`

    return { email: email, title: title, html: msg };
}

function orderConfirmationMsg(email, userName, title, cart) {
    if (!email || !title || !cart) {
        return false
    }
    const total = cart.reduce((acc, article) => acc + article.amount * article.price, 0)
    const cartItems = () => {
        let str = "";
        cart.map((item) => {
            str += `${item.name} - ${item.amount} piece${item.amount > 1 ? 's' : ''} at  ${item.price} $ = ${item.price * item.amount} $ <br>`;
        });
        return str;
    };

    const msg =
        `<div style=" font-family: Edu TAS Beginner, cursive; color: rgba(49, 181, 114, 1);">
            <h1 style="font-weight: 600; font-size: 25px;">
                Order confirmation
            </h1>
            <p style=" font-size:20px; padding-top:10px">
                Hello ${userName} !
                <br>
                Thank you for buying by us!
                <br>
                Your order has been saved and you will get it in one week
                <br>
                <h2>Details</h2>
                ${cartItems()}
                <div style=" font-size:20px; padding-top:8px;">
                <h2>Total</h2> ${total} $
                <p>Merry botanics team</p>
                </div>
            </p>
</div>`

    return { email: email, title: title, html: msg };
}

export { contactMessage, orderConfirmationMsg }