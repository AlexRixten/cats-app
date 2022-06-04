import React, { useContext } from "react";
import { Context } from "../useContext";
import './CatCard.css'

export const CatCard = ({ catCard }) => {

    const { toggleLike } = useContext(Context)

    return (
        <div className="cat__card">
            <img src={catCard.url} alt="cat" />
            <button className="cat__btn"
                onClick={() => toggleLike(catCard.id)}
            >
                <i className={catCard.love ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            </button>
        </div>
    )
}