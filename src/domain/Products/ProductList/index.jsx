import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductItem } from 'domain/Products';
import Info from 'components/Info';
import { actions } from 'domain/Cart/state';
import './style.scss'


export const ProductList = () => {

    const dispatch = useDispatch()

    /* Luckiy, list is not a javascript reserved keyword */
    const { list }  = useSelector(state => state.products) 
    const { drawer }  = useSelector(state => state.cart) 

    const handleClick = () => drawer && dispatch(actions.toggleDrawer())

    if (!list || !list.length) {
        return <Info>No product to display.</Info>
    }


    return (
        <div className="product-list" onClick={handleClick}>
            {list.map(({id, title, coverImage, price, score},i) => (
                <ProductItem 
                    id={id}
                    title={title}
                    price={price}
                    score={score}
                    picture={coverImage}
                    key={`productlist_item_${id}`} 
                />
            ))}
        </div>
    );

}

export default ProductList
