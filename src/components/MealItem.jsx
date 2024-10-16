import { useContext, useState } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";
import {CartContext} from "../store/CartContext.jsx";
import Snackbar from '@mui/material/Snackbar';
import '@fortawesome/fontawesome-free/css/all.css';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import UserProgressContext from "../store/UseProgressContext.jsx";

export default function MealItem({meal}) {
   const [open, setOpen] = useState(false);
   const cartCtx = useContext(CartContext);
   const [snackbarMsg, setSnackbarMsg] = useState('');
   const userProgressCtx = useContext(UserProgressContext);
  
   
   function handleAddMealToCart() {
    cartCtx.addItem(meal);
    setOpen(true);
    setSnackbarMsg(`${meal.name} added to your cart. YAY!!`);
   
   }


   function handleClose(event, reason){
       if (reason === 'clickaway'){
        return;
       }
       setOpen(false);
   }
  
    return (
    <li className={userProgressCtx.theme === "light-theme"?"meal-item-light":"meal-item"}>
        <article style={{ position: "relative", display: "inline-block" }}>
        <img 
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            
            <div   style={{
                position: "absolute",
                top: "10px",
                right: "10px", 
                zIndex: 1, 
                backgroundColor: "transparent", 
                borderRadius: "50%",
                padding: "5px",
                display:"flex"
              }}>
        <FormControlLabel
         
             control = {
                <Checkbox
                style={{color:'#ffc404'}}
                   icon = {<FavoriteBorderIcon />}
                   checkedIcon = {<FavoriteIcon />}
                />
             }

          />
          <CenterFocusStrongIcon 
          style={{ color: meal.category === "veg" ? '#0d7828': "#6e0d10",marginTop:"8px"
          }}/>
          
          </div>
          
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">
                    {currencyFormatter.format(meal.price)}
                </p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                <Snackbar
                   open={open}
                   autoHideDuration={5000}
                    onClose={handleClose}
                    message= {snackbarMsg}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
            </p>
        </article>
    </li>
);
}