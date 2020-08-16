import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'domain/Layout';
import defaultProducts from 'data/productItems';
import { ProductList } from 'domain/Products';
import { CartDrawer } from 'domain/Cart';
import { actions } from 'domain/Products/state';


export const ProductsHome = () => {

    const dispatch = useDispatch()

    /* Async product retrieval */
    useEffect(() => { 
        dispatch(actions.set(defaultProducts))
    }, [ dispatch ])

    /* TODO : Show a loader while there is no products loaded */

    return (
        <Layout>
            <CartDrawer />
            <ProductList />
        </Layout>
    );
    
}

export default ProductsHome
