import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Button from 'components/Button';
import './style.scss';


export const QuantityButton = ({
    value=1,
    onChange,
}) => (

    <div className="quantity-button">
        <Button 
            className="minus"
            onClick={() => onChange(-1)}
        >
            <FaMinus />
        </Button>
        <span className="qty">
            {value}
        </span>
        <Button 
            className="plus"
            onClick={() => onChange(1)}
        >
            <FaPlus />
        </Button>
    </div>
)

QuantityButton.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default QuantityButton;
