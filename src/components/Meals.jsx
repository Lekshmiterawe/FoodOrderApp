import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import { useContext } from "react";
import UserProgressContext from "../store/UseProgressContext.jsx";

const requestConfig = {};

export default function Meals(){
  const userPrgCtx = useContext(UserProgressContext);


  const { 
    data: loadedMeals, 
    isLoading, 
    error 
  } = useHttp('http://localhost:3000/meals', requestConfig, [],"all");

    if(isLoading){
      return <p className="center">Fetching meals...</p>;
    }

    if(error){
      return <Error title="Failed to fetch meals" message={error} />
    }
    
    

    const filteroptions = () => {
     
      if(userPrgCtx.selectedOption === "veg"){
       
        return loadedMeals.filter((element) => element.category === "veg");
      }else if(userPrgCtx.selectedOption === "non-veg"){
       
        return loadedMeals.filter((element) => element.category === "non-veg");
      }else{
        return loadedMeals;
      }
    }
  

    return (
        <ul id="meals" >
             {filteroptions()?.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
            </ul>
           );
}