import React, { useState, useEffect } from "react";
import { store } from '../../redux/store';
import { useDispatch } from "react-redux";
import { addCatItemAction, deleteCatItemAction } from "../../redux/reducer/catReducer";
import './CatCard.css'

export const CatCard = ({ catCard }) => {

    const catsList = store.getState().app.catsList
    const dispatch = useDispatch();

    const [love, setLove] = useState(catCard.love)


    const toggleLove = () => {
        if (!love) {
            dispatch(addCatItemAction([{...catCard, love:true}]))
            catCard.love = true
        }
        if (love) {
            dispatch(deleteCatItemAction(catCard.id))
            catCard.love = false
        }
        setLove(!love)
    }

    return (
        <div className="cat__card">
            <img src={catCard.url} alt="cat" />
            <button className="cat__btn" onClick={toggleLove}><i className={catCard.love ? "fa-solid fa-heart" : (love ? "fa-solid fa-heart" : "fa-regular fa-heart")}></i></button>
        </div>
    )
}