import React, { useMemo } from 'react';
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import  CartContextProvider  from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UseProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import  ThemePro  from "./store/ThemePro.jsx";
import { ThemeProvider } from "@emotion/react";
     
function App() {
  return (
    <UserProgressContextProvider>
     <CartContextProvider>
     <ThemeProvider theme={ThemePro}>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        </ThemeProvider >
     </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
