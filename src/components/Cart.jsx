import { useContext } from "react";
import Modal from "./UI/Modal.jsx"
import { CartContext } from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UseProgressContext.jsx";
import CartItem from "./CartItem.jsx";


export default function Cart() {
    const cartCtn = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtn.items.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.price,
     0
    );
     
    function handleCloseCart(){
      userProgressCtx.hideCart();
    }
    
    function handleGoToCheckout(){
      userProgressCtx.showCheckout();
      //console.log('clicked');
    }

    return (
       <Modal 
       className="cart" 
       open={userProgressCtx.progress === 'cart'} 
       onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null }
       >
          <h2>Your Cart</h2>
          <ul>
              {cartCtn.items.map((item) => (
               <CartItem 
                   key={item.id} 
                   name={item.name} 
                   quantity={item.quantity} 
                   price={item.price}
                   onIncrease={() => cartCtn.addItem(item)}
                   onDecrease={() => cartCtn.removeItem(item.id)}
                />
                ))}
          </ul>
          <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
          <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>
              Close
            </Button>
            {cartCtn.items.length > 0 && (
              <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
              
             )}
          </p>
        </Modal>
    );
}