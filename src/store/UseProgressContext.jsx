import { createContext, useState } from 'react';

const UserProgressContext = createContext({
    progress: '',
    selectedOption : 'all',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
    filterValue: () => {},
    showTheme: () => {}
});

export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('');
    const [selectedOption, setSelectedOption] = useState('all');
    const [theme,setTheme] = useState('dark-theme');
    
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
    
    function showTheme(checked){
       console.log(checked, 'value');
        if(checked){
            setTheme('light-theme');
        }else{
        setTheme('dark-theme');
        }
        //console.log(theme);
    }
   
    function filterValue(selectedValue){
        setSelectedOption(selectedValue);
    }

    const useProgressCtx = {
        progress: userProgress,
        selectedOption,
        theme,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        filterValue,
        showTheme 
    };

    return (
       <UserProgressContext.Provider value={useProgressCtx}>
         {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;