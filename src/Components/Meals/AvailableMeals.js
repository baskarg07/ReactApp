import {useEffect, useState} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from '../MealItem/MealItem';

const AvailableMeals = () => {
    const [meals,setMeals] = useState([]);
    const [httpError,setHttpError] = useState(null);

   useEffect(()=>{
   const fetchMeals = async() => {
     const response = await fetch('https://food-order-a2z-default-rtdb.firebaseio.com/Meals.json');
     if(!response.ok) {
      throw new Error("Something went wrong!!!");
     }
     const resData = await response.json();

     const loadedMeals = [];

     for(const key in resData) {
        loadedMeals.push({
            id: key,
            name : resData[key].Name,
            description : resData[key].Description,
            price: resData[key].Price
        });
     }
     setMeals(loadedMeals);
    }

      fetchMeals().catch(error => {
       setHttpError(error.message);
      });


},[]);

if(httpError) {
    <section className={classes.meals}>
          <p>Something went wrg....</p>
        </section>
}
  const mealsList = meals.map((meal) => (<MealItem name={meal.name}
  description={meal.description} price={meal.price} id={meal.id} /> ));

  return (
    <section className={classes.meals}>
      <ul>
      <Card>
      {mealsList}
      </Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;