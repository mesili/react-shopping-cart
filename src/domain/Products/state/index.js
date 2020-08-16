import actionCreator from "helpers/actionCreator";

export const constants = {
    SET:"product/set",
};

export const actions = {
    set: payload => actionCreator(constants.SET, payload)
};


const defaultState = {
    list:[]
};

export const products = (state = defaultState, {type, payload}) => {

    const reducers = {

        /* Populating products */

        [constants.SET]: () => {

            /* Sorting by score DESC by default */
            payload.sort((a,b) => b.score - a.score);

            return {
                ...state,
                list: payload
            };

        }

    };

    if (reducers[type]) {
        return reducers[type]();
    }

    return state;

};
