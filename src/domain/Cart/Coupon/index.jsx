import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTicketAlt, FaCheckSquare, FaSquare } from 'react-icons/fa';
import couponData from 'data/coupons';
import { actions } from 'domain/Cart/state';
import './style.scss'

export const Coupon = () => {

    const dispatch = useDispatch();

    const { 
        prices, 
        coupon,
        availableCoupons,
    } = useSelector(state => state.cart)

    const handleClick = idx => dispatch(actions.addCoupon(idx))

    useEffect(() => {
        /* async loading simulation */
        dispatch(actions.storeCoupons(couponData))
    },[dispatch])

    if (prices.couponEligiblePrice === 0) return null

    else if (!availableCoupons) { return null }

    return (
        <ul className="coupon-selector">
            {availableCoupons.map( ({type, title, discountRate}, i) => (
                <li 
                    key={`coupon_idx_${i}`}
                >
                    <button 
                        className={coupon === i ? 'active' : ''}
                        onClick={() => handleClick(i)}
                    >
                        {coupon === i 
                            ? <FaCheckSquare /> 
                            : <FaSquare /> 
                        }
                        <FaTicketAlt /> 
                        {title} 
                    </button>
                </li>
            ))}

            <li>
                <button 
                    className={coupon === null ? 'active' : ''}
                    onClick={() => handleClick(null)}
                >
                    {coupon === null 
                        ? <FaCheckSquare /> 
                        : <FaSquare /> 
                    }
                    <FaTicketAlt /> 
                    No coupon
                </button>
            </li>
        </ul>
    )
}

export default Coupon;
