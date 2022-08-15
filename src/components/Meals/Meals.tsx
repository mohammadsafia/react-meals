import React from 'react';
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

interface PropsMeals {
}

const Meals: React.FC<PropsMeals> = () => {
    return (
        <>
            <MealsSummary/>
            <AvailableMeals/>
        </>
    );
};

export default Meals;