import { createContext, useReducer  } from "react";

//create a context
export const CartContext = createContext({
    items: [],
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
         const updatedItems = [...state.items];
       //if the item exits it updates the quantity  
        if (existingCartItemIndex > -1){
         const existingItem = state.items[existingCartItemIndex] 
         const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1
            };
          updatedItems[existingCartItemIndex] = updatedItem;
        
        }else{
          //else add it to cart with quant 1
          updatedItems.push({...action.item, quantity: 1 });
      }

     return { ...state, items: updatedItems };
    }

   case 'REMOVE_ITEM':{
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
         );

         if (existingCartItemIndex === -1) return state;

         const existingCartItem = state.items[existingCartItemIndex];
         const updatedItems = [...state.items];

        // if the quant = 1, remove the item from cart
         if (existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex, 1);
         }else {
            //else decrease the quantity
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
         }

         return { ...state, items: updatedItems };

    }
     case 'CLEAR_CART':{
          return {...state, items: [] };
     }

        default:
            return state;
}
}
export function  CartContextProvider  ({ children }) {
    //useReducer to manage the cartReducer
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] });
  
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