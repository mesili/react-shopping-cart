import actionCreator from "helpers/actionCreator";

export const constants = {
    ADD: "cart/add",
    DEL: "cart/del",
    QUANTITY: "cart/quantity",
    ADD_COUPON: "cart/addCoupon",
    REMOVE_COUPON: "cart/removeCoupon",
    SELECT: "cart/select",
    STORE_COUPONS: "cart/storeCoupons",
    TOGGLE_DRAWER: "cart/toggleDrawer",
};

export const actions = {
    add: payload => actionCreator(constants.ADD, payload),
    del: payload => actionCreator(constants.DEL, payload),
    quantity: (productId, quantity) => actionCreator(constants.QUANTITY, {productId, quantity}),
    select: productId => actionCreator(constants.SELECT, productId),
    addCoupon: payload  => actionCreator(constants.ADD_COUPON, payload),
    removeCoupon: payload => actionCreator(constants.REMOVE_COUPON, payload),
    storeCoupons: payload => actionCreator(constants.STORE_COUPONS, payload),
    toggleDrawer: payload => actionCreator(constants.TOGGLE_DRAWER, payload),
};

const defaultState = {
    maxProducts: 0,          // Max product (0 = infinite)
    drawer: false,            // Used in cart drawer
    products: [],             // Products in the cart
    selection:[],             // Products selected for checkout
    prices:{                  // Prices shown in the cart 
        initialPrice: 0,
        couponEligiblePrice:0,
        couponPrice: 0,
        finalPrice: 0,
    },
    /* Note : coupons could have their own domain / state */
    coupon: null,             // Coupon index
    availableCoupons:[],      // Coupons available for this cart
};

const applyCoupon = (coupon, price) => {
    const discountValue = coupon.type === "rate" 
        ? price * (coupon.discountRate/100)
        : coupon.discountAmount;

    if (discountValue > price) return price;

    return discountValue;
};

const calculatePrices = (products, coupon) => {

    /* Value from products * quantity */
    const initialPrice = products.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);

    /* Value from products eligible to coupon discount */
    const couponEligiblePrice = products
        .filter(p => p.availableCoupon !== false)
        .reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);

    /* Value from products not eligible to coupon discount */
    const couponIneligiblePrice = initialPrice - couponEligiblePrice; 

    /* Value of the discount */
    const couponPrice = coupon 
        ? applyCoupon(coupon, couponEligiblePrice)
        : 0;

    /* Value from (products * quantity) - discount */
    const finalPrice = couponIneligiblePrice + (couponEligiblePrice - couponPrice);

    return {
        initialPrice,
        couponEligiblePrice,
        couponPrice: Math.floor(couponPrice),
        finalPrice: Math.floor(finalPrice),
    };

};

export const cart = (state = defaultState, {type, payload}) => {

    const retrieveCoupon = () => null === state.coupon
        ? null
        : state.availableCoupons[state.coupon];

    const reducers = {

        /* Adding product to cart */

        [constants.ADD]: () => {
            const { products, selection } = state;
            if (state.maxProducts && products.length >= state.maxProducts) {
                return state;
            }
            products.push(payload);
            const prices = calculatePrices(products.filter(p => selection.includes(p.id)), retrieveCoupon());
            return {
                ...state,
                products,
                prices,
            };
        },

        /* Removing product from cart */

        [constants.DEL]: () => {
            const { products, selection } = state;
            const productIndex = products.findIndex(p => p.id === payload);
            products.splice(productIndex,1);
            const selectionIndex = selection.indexOf(payload);
            selection.splice(selectionIndex,1);
            const prices = calculatePrices(products.filter(p => selection.includes(p.id)), retrieveCoupon());
            return {
                ...state, 
                products,
                prices, 
            };
        },

        /* Updating quantity of product in cart */

        [constants.QUANTITY]: () => {
            const { productId, quantity } = payload;
            const { products, selection } = state; 
 
            if (quantity > 0) {
                const productIdx = products.findIndex(p => p.id === productId); 
                products[productIdx].quantity = quantity;

                const prices = calculatePrices(products.filter(p => selection.includes(p.id)), retrieveCoupon());

                return {
                    ...state, 
                    products,
                    prices,
                };
            }

            return state;
        },

        /* Selecting product for checkout */

        [constants.SELECT]: () => {
            const productIndex = state.selection.indexOf(payload);
            const selection = [...state.selection];

            if (productIndex === -1) {
                selection.push(payload);
            } else {
                selection.splice(productIndex,1);
            }

            const prices = calculatePrices(state.products.filter(p => selection.includes(p.id)), retrieveCoupon());

            return {
                ...state, 
                selection,
                prices,
            };
        },

        /* Store available coupons */

        [constants.STORE_COUPONS]: () => {
            return {
                ...state,
                availableCoupons: payload
            };
        },


        /* Add coupon to current cart */

        [constants.ADD_COUPON]: () => {
            const { 
                products, 
                selection, 
                availableCoupons 
            } = state;

            const prices = calculatePrices(
                products.filter(p => selection.includes(p.id)),
                availableCoupons[payload]
            );

            return {
                ...state,
                prices,
                coupon: payload,
            };
        },

        /* Toggle the drawer (UI state) */

        [constants.TOGGLE_DRAWER]: () => {
            return {
                ...state,
                drawer:!state.drawer
            };
        },

    };

    if (reducers[type]) {
        return reducers[type]();
    }

    return state;

};
