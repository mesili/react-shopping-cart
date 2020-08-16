import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaCartArrowDown } from 'react-icons/fa'
import { useToasts } from 'react-toast-notifications'
import Button from 'components/Button'
import { actions } from 'domain/Cart/state';
import './style.scss'



const AddLabel = () => (
    <>
        <FaCartArrowDown /> Add to cart
    </>
)

const RemoveLabel = () => (
    <>
        <FaTrash /> Remove
    </>
)

export const CartButton = ({productId}) => {
    
    const dispatch = useDispatch()

    const { list } = useSelector(state => state.products)
    const { maxProducts, products } = useSelector(state => state.cart)

    const { addToast } = useToasts()

    const active = products.filter(e => e.id === productId).length > 0

    const handleClick = async () => {

        if (active) {

            return dispatch(actions.del(productId))

        } else if (maxProducts && products.length >= maxProducts) {

            return addToast(`You can add up to ${maxProducts} products to your cart.`, { appearance: 'error' })

        }

        const product = list.filter(e => e.id === productId)

        if (product.length) {
            await dispatch(actions.add({
                ...product[0],
                quantity:1,
           }))

            dispatch(actions.toggleDrawer())
        }
    }

    return (
        <Button 
            className={`add-to-cart ${active ? 'active' : ''}`}
            onClick={handleClick}
        >
            {active ? <RemoveLabel /> : <AddLabel />  }
        </Button>
    )

}

CartButton.propTypes = {
    productId: PropTypes.number.isRequired,
}

export default CartButton
