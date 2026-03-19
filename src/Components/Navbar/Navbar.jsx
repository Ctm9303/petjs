import React, {useState} from 'react';
import './navbar.scss';
import { MdOutlinePets } from "react-icons/md";
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const [active, setActive] = useState('navBar')
    const { count } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const showNav = () => {
        setActive('navBar activeNavbar')
    }
    const removeNav = () => {
        setActive('navBar')
    }
    return (
        <section className='navbarSection'>
            <header className='header'>
                <div className='headerInner'>
                    <div className='logoDiv'>
                        <Link to="/" className='logo flex' onClick={removeNav}>
                            <h1><MdOutlinePets className="icon" />PetShop</h1>
                        </Link>
                    </div>
                    <nav className={active}>
                        <ul className='navList flex'>
                            <li className='navItem'>
                                <Link to="/" className='navLink' onClick={removeNav}>Home</Link>
                            </li>
                            <li className='navItem'>
                                <Link to="/products" className='navLink' onClick={removeNav}>Products</Link>
                            </li>
                            <li className='navItem'>
                                <Link to="/cart" className='navLink' onClick={removeNav}>
                                    Cart{count ? ` (${count})` : ""}
                                </Link>
                            </li>
                            <li className='navItem'>
                                {isAuthenticated ? (
                                    <button
                                        className='navLink'
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            removeNav();
                                        }}
                                        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                                    >
                                        Logout{user?.name ? ` (${user.name})` : ""}
                                    </button>
                                ) : (
                                    <Link to="/login" className='navLink' onClick={removeNav}>Login</Link>
                                )}
                            </li>
                            <li className='navItem'>
                                <Link to="/contact" className='navLink' onClick={removeNav}>Contact</Link>
                            </li>
                            <li>
                                <Link to="/checkout" className='btn' onClick={removeNav}>CHECKOUT</Link>
                            </li>
                        </ul>
                        <div onClick={removeNav} className='closeNavbar ' tabIndex={0} role="button" aria-label="Close Menu">
                            <AiFillCloseCircle className='icon' />
                        </div>
                    </nav>
                    {/* NÚT MENU PHẢI NẰM TRONG headerInner */}
                    <div onClick={showNav} className="toggleNavbar" tabIndex={0} role="button" aria-label="Open Menu"> 
                        <TbGridDots className='icon' />
                    </div>
                </div>
            </header>
        </section>
    )
}

export default Navbar;