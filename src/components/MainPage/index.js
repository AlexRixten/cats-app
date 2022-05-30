import React, { useState, useEffect } from "react";
import axios from "axios";
import Preloader from "../common/Preloader/Preloader";
import { CatCard } from "../CatCard";

const MainPage = (props) => {

    const [catCard, setCatCard] = useState()
    const [error, setError] = useState(null)


    useEffect(() => {
        axios.get(`https://api.thecatapi.com/v1/images/search?limit=15`)
        .then((response) => {
            console.log(response)
            setCatCard(response?.data);
        }).catch(error => {
            setError(error);
          });
      }, []);
    
    if (error) return `Error: ${error.message}`;
    if (!catCard) {
        return <Preloader />
    }

    return (
        <div className="cat__wrapper">
            {catCard?.map(item => <CatCard key={item.id} catCard={item} />)}
        </div>
    )
}

export default MainPage;
