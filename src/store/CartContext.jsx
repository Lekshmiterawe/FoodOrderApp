import { createContext, useReducer, useEffect  } from "react";

//create a context
export const CartContext = createContext({
    items: [],
    isVeg : false,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

//Reducer Function for different cart actions
function cartReducer(state, action) {
    switch(action.type){
        case 'ADD_ITEM': {
       //checking for existing items      
       const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id 
         );
         const updatedCartItems = [...state.items];

       //if the item exits it updates the q uantity  
        if (existingCartItemIndex > -1){
            // already existing item
         const existingItem = state.items[existingCartItemIndex] 
         const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1
            };
          updatedCartItems[existingCartItemIndex] = updatedItem;
        
        }else{
          //else add it to cart with quant 1
          updatedCartItems.push({...action.item, quantity: 1 });
      }

     return { ...state, items: updatedCartItems };
    }

   case 'REMOVE_ITEM':{
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
         );

        // if (existingCartItemIndex === -1) return state;

         const existingCartItem = state.items[existingCartItemIndex];
         const updatedCartItems = [...state.items];

        // if the quant = 1, remove the item from cart
         if (existingCartItem.quantity === 1){
            updatedCartItems.splice(existingCartItemIndex, 1);
         }else {
            //else decrease the quantity
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedCartItems[existingCartItemIndex] = updatedItem;
         }

         return { ...state, items: updatedCartItems };

    }
     case 'CLEAR_CART':{
          return {...state, items: [] };
     }

        default:
            return state;
}
}
export function  CartContextProvider  ({ children }) {

    const initialCart = JSON.parse(localStorage.getItem("cartItems")) || { items: [] };
    //useReducer to manage the cartReducer
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, initialCart);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }, [cart]);

    //dispatching each actions
    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item});
    }

   

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }
    
    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART'});
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContextProvider;