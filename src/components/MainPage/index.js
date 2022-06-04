import React from "react";
// import axios from "axios";
import Preloader from "../common/Preloader/Preloader";
import { CatCard } from "../CatCard";

const MainPage = ({ catCard,error}) => {

    if (error) return `Error: ${error.message}`;
    
    if (!catCard) {
        <Preloader />
        return 
    }

    return (
        <div id="cat__wrapper" className="cat__wrapper">
            {catCard?.map(item => <CatCard key={item.id} catCard={item} />)}
        </div>
    )
}

export default MainPage;
