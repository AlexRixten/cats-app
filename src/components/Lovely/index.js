import React, { useState, useEffect } from "react";
import { store } from '../../redux/store';
import { CatCard } from "../CatCard";

export const Lovely = () => {

    const catsList = store.getState().app.catsList

    const [catCard, setCatCard] = useState([])

    useEffect(() => {
        const cats = localStorage.getItem('cats') || []
        setCatCard(JSON.parse(cats))
    }, [catsList])
    

    return (
        <>
        {catCard ? 
        <div className="cat__wrapper">
            {catCard?.map(item => <CatCard key={item.id} catCard={item} />)}
        </div>
        : null}
        </>
    )
}