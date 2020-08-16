import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.scss'

export const Layout = ({ children }) => (
    <div id="main-layout">

        <header>
            <h2>Shopping Cart</h2>
            <ul>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </header>

        <main>
            {children}
        </main>

        <footer>
            Author : <a href="https://sebastien.mesili.fr">Sebastien Mesili</a> - <a href="https://github.com/mesili/">github</a>
        </footer>

    </div>
)

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
}

export default Layout
