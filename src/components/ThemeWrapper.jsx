import React, { useContext, useMemo, useState } from 'react';
import Header from "./Header.jsx";
import Meals from "./Meals.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import  DarkTheme  from "../store/DarkTheme.jsx";
import LightTheme from "../store/LightTheme.jsx"
import { ThemeProvider } from "@emotion/react";
import UserProgressContext from '../store/UseProgressContext.jsx';

function ThemeWrapper(){

    const userProgressCtx = useContext(UserProgressContext); 
    console.log(userProgressCtx.theme,"theme");
    return(
        <div className= {userProgressCtx.theme === "light-theme"?"container-light ":"container-dark"}>
        <ThemeProvider  theme= {userProgressCtx.theme ==="light-theme"?LightTheme:DarkTheme}>
            <Header />
            <Meals />
            <Cart />
            <Checkout />
        </ThemeProvider >
        </div>
    )
}

export default ThemeWrapper;