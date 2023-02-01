import React from 'react'
import useState from 'react'
import axios from 'axios'
import styles from './Auth.module.css'

let baseUrl = '';
if (window.location.href.split(':')[0] === 'http') { baseUrl = 'http://localhost:5000' }


const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { name, email, password }
    try {
      axios.post(`${baseUrl}/signup`, { data })
      console.log("Login Successful")
    }
    catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <>
      <form id={styles.form} autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label>
            <input type="text" placeholder="Full Name" required onChange={(e) => { setName(e.target.value) }} />
            <span className="required">Full Name</span>
          </label>
        </div>
        <div>
          <label>
            <input type="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
            <span className="required">Email</span>
          </label>
        </div>
        <div>
          <label>
            <input type="text" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
            <span className={styles.required}>Password</span>
          </label>
        </div>
        {/* <input type="checkbox" name="show_password" className={`${styles.show_password} ${styles.hidden}`} id={styles.show_password} />
                <label className={styles.label_show_password} htmlFor="show_password">
                    <span>Show Password</span>
                </label> */}
        <input type="submit" value="Sign Up" />
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


      <h1>{name}</h1>
      <h1>{email}</h1>
      <h1>{password}</h1>
    </>
  )
}
export default Signup