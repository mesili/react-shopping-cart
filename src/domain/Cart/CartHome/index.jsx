import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'domain/Layout';
import { CartPrice, CartProductList } from 'domain/Cart';
import './style.scss'


export const CartHome = () => {

    const { list } = useSelector(state => state.cart) 

    return (
        <Layout>
            <div className="cart-home">

                <div className="recap">
                    <div className="products">
                        <h3>Select the products to checkout</h3>
                        <CartProductList 
                            products={list} 
                        />
                    </div>

                    <aside className="total-price">
                        <CartPrice />
                    </aside>

                </div>

            </div>
        </Layout>
    );
}

export default CartHome;
