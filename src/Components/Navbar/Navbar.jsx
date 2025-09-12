import React, {useState} from 'react';
import './navbar.scss';
import { MdOutlinePets } from "react-icons/md";
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

const Navbar = () => {
    const [active, setActive] = useState('navBar')
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
                        <a href="/" className='logo flex'>
                            <h1><MdOutlinePets className="icon" />PetShop</h1>
                        </a>
                    </div>
                    <nav className={active}>
                        <ul className='navList flex'>
                            <li className='navItem'>
                                <a href="/" className='navLink'>Home</a>
                            </li>
                            <li className='navItem'>
                                <a href="/about" className='navLink'>About</a>
                            </li>
                            <li className='navItem'>
                                <a href="/services" className='navLink'>Services</a>
                            </li>
                            <li className='navItem'>
                                <a href="/contact" className='navLink'>Contact</a>
                            </li>
                            <li>
                                <button className='btn' type="button">
                                    BUY NOW
                                </button>
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