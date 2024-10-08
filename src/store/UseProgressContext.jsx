import { createContext, useState } from 'react';

const UserProgressContext = createContext({
    progress: '',
    selectedOption : 'all',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
    filterValue: () => {}
});

export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('');
    const [selectedOption, setSelectedOption] = useState('all');

    function showCart(){
        setUserProgress('cart');
    }

    function hideCart(){
        setUserProgress('');
    }

    function showCheckout(){
        setUserProgress('checkout');
    }

    function hideCheckout(){
        setUserProgress('');
    }

   

    function filterValue(selectedValue){
        
        setSelectedOption(selectedValue);
      
    }

    const useProgressCtx = {
        progress: userProgress,
        selectedOption,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        filterValue 
    };

    return (
       <UserProgressContext.Provider value={useProgressCtx}>
         {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;