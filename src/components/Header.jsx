import { useContext, useState, useRef, useEffect, useMemo } from 'react';
import logoImg from "../assets/logo.jpg"
import sree from '../assets/sreeragsk.png';
import Button from './UI/Button';
import {CartContext}  from '../store/CartContext';
import UserProgressContext from '../store/UseProgressContext';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

const requestConfig ={};
export default function Header(){
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [filter, setFilter] = useState('');
  //const toggleData = JSON.parse(localStorage.getItem("toggleItem")) ;
  const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('lightTheme')) || false);
  
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  //const lab = checked ? "Light" : "";

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  

  const handleChangeTheme = (event) =>{
    userProgressCtx.showTheme(!checked);
    setChecked(!checked);
   
  
  }
  
  //console.log(checked,"checked3");

  useEffect(() => {
    localStorage.setItem('lightTheme', JSON.stringify(checked));
  }, [checked]);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false); // Close the menu if click is outside
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [menuRef]);
    

const handleSelect = (event) => {
  const selectedValue = event.target.value; 
  userProgressCtx.filterValue(selectedValue); // Get selected value
  setFilter(selectedValue);
};

    return (
    <header id="main-header" >
        <div id="title" >
            <img src={sree} alt="a restaurent"/>
            <h1 className={userProgressCtx.theme === "light-theme"?"hlight":""}> S'CHEF RESTO</h1>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <FormControlLabel 
              control={
                <Switch  
                    checked={checked}
                    onChange={handleChangeTheme}
                    inputProps={{ 'aria-label': 'controlled '}}
                />}
              label="light"/>
            <FormControl style={{width:"auto",marginRight: '20px'}}>
             
                {/* <InputLabel style={{ color: "#ffc404"}} id="demo-simple-select-label">Filter</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  label="filter"
                 // style={{ color: "#ffc404"}}
                 style={{ color: userProgressCtx.theme === "light-theme"?"#1a1506":"#ffc404"}}
                  onChange={(e) => {
                    handleSelect(e);   
                  }}
                  
                  IconComponent={(props) => (
                    <FilterAltOutlinedIcon {...props} 
                    style={{ color: userProgressCtx.theme === "light-theme"?"#1a1506":"#ffc404",
                             transform: 'rotate(0deg)'}} />
                  )}
                >
                  <MenuItem value="veg">Veg</MenuItem>
                  <MenuItem value="non-veg">Non-Veg</MenuItem>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
           
             
            <nav style={{ display: 'inline-block' }}>
            <Button textOnly onClick={handleShowCart} 
            style={{ color: userProgressCtx.theme === "light-theme"?"#1a1506":"#ffc404"}}>
               <ShoppingCartIcon  
               style={{ color: userProgressCtx.theme === "light-theme"?"#1a1506":"#ffc404",
                        transform: 'rotate(0deg)'}} />
              ({totalCartItems})
            </Button>
        </nav>
        </div> 
    </header>
    );
}

