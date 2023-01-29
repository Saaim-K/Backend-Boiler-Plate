import React from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
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

                <div className={styles.links}>
                    <a>Home</a>
                    <a>About</a>
                    <a>Contact</a>
                    <a>Gallery</a>
                    <a>Logout</a>
                </div>
            </div>
        </>



    )
}

export default Navbar