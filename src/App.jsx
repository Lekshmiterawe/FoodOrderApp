import React, { useContext, useMemo, useState } from 'react';
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import  CartContextProvider  from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UseProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import  ThemePro  from "./store/DarkTheme.jsx";
import { ThemeProvider } from "@emotion/react";
import ThemeSettings from './components/UI/ThemeSettings.jsx';
import UserProgressContext from './store/UseProgressContext.jsx';
import ThemeWrapper from './components/ThemeWrapper.jsx'

function App() {

  
  return (
  //  <ThemeSettings>
    <UserProgressContextProvider>
     <CartContextProvider>
       <ThemeWrapper />
     </CartContextProvider>
    </UserProgressContextProvider>
  //  </ThemeSettings>
  );
}

export default App;
