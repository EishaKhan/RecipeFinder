import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

// Function to get favorites from local storage
const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    } else {
        favorites = [];
    }
    return favorites;
};

const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('icecream');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
    const [showFavorite, setShowFavorite] = useState(false);
    // To be replaced with .env
    const APP_ID = "a9cd5c5f";
    const APP_KEY = "99ea990eb48b2e536165595aa415bbbb";
    const allMealsURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}&random=true`;


    // Function to fetch meals
    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const { data } = await axios(url);
            if (data.hits) {
                setMeals(data.hits.map(hit => hit.recipe));
            } else {
                setMeals([]);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    // Fetch all meals data on first render
    useEffect(() => {
        fetchMeals(allMealsURL + 'chicken'); // Default search term
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch all meals data on search
    useEffect(() => {
        if (!searchTerm) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchMeals(`${allMealsURL}${searchTerm}`);
    }, [searchTerm, allMealsURL]);

    // Select meal function
    const selectMeal = (label, favoriteMeal) => {
        let meal;
        if (favoriteMeal) {
            meal = favorites.find(meal => meal.label === label);
        } else {
            meal = meals.find(meal => meal.label === label);
        }

        setSelectedMeal(meal);
        setShowModal(true);
    };

    // Close modal function
    const closeModal = () => {
        setShowModal(false);
    };

    // Add to favorites function
    const addToFavorites = (label) => {
        const alreadyFavorite = favorites.find((meal) => meal.label === label);
        if (alreadyFavorite) {
            removeFromFavorites(label);
        } else {
            const meal = meals.find((meal) => meal.label === label);
            const updatedFavorites = [...favorites, meal];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    // Remove from favorites function
    const removeFromFavorites = (label) => {
        const updatedFavorites = favorites.filter(meal => meal.label !== label);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    // Toggle show favorite function
    const toggleShowFavorite = () => {
        setShowFavorite(prev => !prev);
    };

    return (
        <AppContext.Provider
            value={{
                loading,
                meals,
                setSearchTerm,
                showModal,
                selectedMeal,
                selectMeal,
                closeModal,
                addToFavorites,
                removeFromFavorites,
                favorites,
                showFavorite,
                setShowFavorite,
                toggleShowFavorite
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
