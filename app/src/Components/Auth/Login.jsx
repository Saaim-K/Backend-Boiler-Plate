import React from 'react'
import styles from './Auth.module.css'

const Login = () => {
    return (
        <>
            <form id={styles.form} autoComplete="off">
                <div>
                    <label>
                        <input type="email" placeholder="Email" required />
                        <span className="required">Email</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="text" placeholder="Password" required />
                        <span className={styles.required}>Password</span>
                    </label>
                </div>
                <input type="checkbox" name="show_password" className={`${styles.show_password} ${styles.hidden}`} id={styles.show_password} />
                <label className={styles.label_show_password} htmlFor="show_password">
                    <span>Show Password</span>
                </label>
                <input type="submit" value="Log In" />
                {/* <div className="email">
                        <button>Forgot password?</button>
                    </div> */}
                {/* <div className="email">
                        <Link to={`/signup`}>Don't have an account ?</Link>
                    </div> */}
                <figure>
                    <div className={styles.body}></div>
                    <div className={`${styles.neck} ${styles.skin}`}></div>
                    <div className={`${styles.head} ${styles.skin}`}>
                        <div className={styles.eyes}></div>
                        <div className={styles.mouth}></div>
                    </div>
                    <div className={styles.hair}></div>
                    <div className={styles.ears}></div>
                    <div className={styles.shirt_1}></div>
                    <div className={styles.shirt_2}></div>
                </figure>
            </form>
        </>
    )
}

export default Login