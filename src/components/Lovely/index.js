import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { addCatItemAction } from "../../redux/reducer/catReducer";
import { store } from '../../redux/store';
import { CatCard } from "../CatCard";

export const Lovely = () => {

    const catsList = store.getState().app.catsList
    const dispatch = useDispatch()
    const [catCard, setCatCard] = useState()

    useEffect(() => {
        const cats = localStorage.getItem('cats') || []
        if(cats.length !== 0){
            setCatCard(JSON.parse(cats))
        }
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