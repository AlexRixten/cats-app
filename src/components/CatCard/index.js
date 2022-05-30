import React, { useState, useEffect } from "react";
import { store } from '../../redux/store';
import { useDispatch } from "react-redux";
import { addCatItemAction, deleteCatItemAction } from "../../redux/reducer/catReducer";
import './CatCard.css'

export const CatCard = ({ catCard }) => {

    const catsList = store.getState().app.catsList
    const dispatch = useDispatch();

    const [love, setLove] = useState(false)

    useEffect(() => {
        localStorage.setItem('cats', JSON.stringify(catsList))
    }, [catsList])

    const toggleLove = () => {
        if (!love) {
            dispatch(addCatItemAction([catCard]))
        }
        if (love) {
            dispatch(deleteCatItemAction(catCard.id))
        }
        setLove(!love)
    }

    return (
        <div className="cat__card">
            <img src={catCard.url} alt="cat" />
            <button className="cat__btn" onClick={toggleLove}><i className={love ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></button>
        </div>
    )
}