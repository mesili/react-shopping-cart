import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { CartPrice, CartProductList } from 'domain/Cart';
import { actions } from 'domain/Cart/state';
import './style.scss';


export const CartDrawer = () => {

    const dispatch = useDispatch()

    const { drawer, list } = useSelector(state => state.cart) 

    const toggle = () => dispatch(actions.toggleDrawer())

    /* A good addition would be a click event listener on <body>
     * to close the drawer on whatever click outside of .cart-drawer
     */

    useEffect(() => {
        if (drawer) {
            document.querySelector('body').classList.add('no-scroll')
        }else {
            document.querySelector('body').classList.remove('no-scroll')
        }
    }, [drawer])

    return (

        <div className={`cart-drawer ${drawer ? 'pulled' : ''}`}>

            <div className="inner">

                <div className="products">
                    <h3>Select the  products to checkout</h3>
                    <CartProductList 
                        products={list} 
                    />
                </div>

                <CartPrice />

            </div>

            <div className="puller" onClick={toggle}>
                <FaShoppingCart /> 
            </div>

        </div>
    )
}

export default CartDrawer;
