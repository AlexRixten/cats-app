import React from "react"

const CAT_ITEM = "CAT_ITEM";
const CAT_DELETE_ITEM = "CAT_DELETE_ITEM"

const initialState = {
    catsList: [],
}

export const catReducer = (state = initialState, action) => {
    // const {type, payload} = action

    switch (action.type) {
        case CAT_ITEM:
            return {
                ...state,
                catsList: [...state.catsList, ...action.payload ]
            }
            case CAT_DELETE_ITEM:
                return {
                    ...state,
                    catsList: state.catsList.filter(item => item.id !== action.payload)
                }
        default: return state
    }
}

export const addCatItemAction = (payload) => ({ type: CAT_ITEM, payload })
export const deleteCatItemAction = (payload) => ({ type: CAT_DELETE_ITEM, payload })
