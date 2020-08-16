import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

export const Button = ({
    className='', 
    block=false, 
    ...rest
}) => (
    <button 
        {...rest} 
        className={`button ${className} ${block ? 'button-block' : ''}`} 
    />
)

Button.propTypes = {
    className: PropTypes.string,
    block: PropTypes.bool,
}

export default Button
