import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

export const Info =  props => (<div className="info" {...props} />)

Info.propTypes = {
    children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string
        ]).isRequired
}

export default Info;
