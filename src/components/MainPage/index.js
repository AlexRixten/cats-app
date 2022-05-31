import React from "react";
// import axios from "axios";
import Preloader from "../common/Preloader/Preloader";
import { CatCard } from "../CatCard";

const MainPage = (props) => {

    if (props.error) return `Error: ${props.error.message}`;
    if (!props.catCard) {
        return <Preloader />
    }

    return (
        <div className="cat__wrapper">
            {props.catCard?.map(item => <CatCard key={item.id} catCard={item} />)}
        </div>
    )
}

export default MainPage;
