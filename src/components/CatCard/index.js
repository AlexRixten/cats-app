import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { addCatItemAction, deleteCatItemAction } from "../../redux/reducer/catReducer";
import './CatCard.css'

export const CatCard = ({ catCard }) => {

    // const catsList = store.getState().app.catsList
    const dispatch = useDispatch();


    const [love, setLove] = useState(catCard.love)


    const toggleLove = () => {
        if (!love) {
            dispatch(addCatItemAction([{...catCard, love:true}]))
            catCard.love = true
        }
        if (love) {
            dispatch(deleteCatItemAction(catCard.id))
        }
        setLove(!love)
    }
    console.log()

    return (
        <div className="cat__card">
            <img src={catCard.url} alt="cat" />
            <button className="cat__btn" onClick={toggleLove}><i className={catCard.love ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></button>
        </div>
    )
}