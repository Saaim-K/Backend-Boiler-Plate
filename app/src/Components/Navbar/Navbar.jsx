import React from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { GlobalContext } from '../../Context/Context';
import styles from './Navbar.module.css'
import Home from '../../Pages/Home'
import About from '../../Pages/About'
import Card from '../Card/Card'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'


const Navbar = () => {
    let { state, dispatch } = useContext(GlobalContext);

    return (
        <>
            <div className={styles.nav}>
                <input type="checkbox" id={styles.check} />
                <div className={styles.header}>
                    <div className={styles.title}>
                        Login/Signup
                    </div>
                </div>
                <div className={styles.btn}>
                    <label htmlFor={styles.check}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                {(state.isLogin === true) ?
                    <div className={styles.links}>
                        <Link to="/" className={styles.a}>Home</Link>
                        <Link to="about" className={styles.a}>About</Link>
                        <Link to="product" className={styles.a}>Product</Link>
                        <Link to="/" className={styles.a}>Logout</Link>
                    </div>
                    : <div className={styles.links}>
                        <Link to="/" className={styles.a}>Login</Link>
                        <Link to="signup" className={styles.a}>Signup</Link>
                    </div>}
            </div>

            {(state.isLogin === true) ?
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="product" element={<Card />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            }
        </>
    )
}

export default Navbar