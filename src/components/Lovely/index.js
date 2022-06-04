import React from "react";
import { store } from '../../redux/store';
import { CatCard } from "../CatCard";

export const Lovely = () => {


    const catsList = store.getState().app.catsList

    return (
        <>
            {catsList ?
                <div className="cat__wrapper">
                    {catsList?.map(item => <CatCard key={item.id} catCard={item} />)}
                </div>
                : null}
        </>
    )
}