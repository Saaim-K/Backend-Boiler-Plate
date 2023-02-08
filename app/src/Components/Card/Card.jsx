import React, { useState } from 'react'
import axios from 'axios'
import styles from './Card.module.css'


let baseURL = ''
if (window.location.href.split(':')[0] === 'http') {
   baseURL = 'http://localhost:5000'
}

const Card = () => {
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')

   const addProduct = async (e) => {
      e.preventDefault()
      console.log(name, price)
      await axios.post(`${baseURL}/product`, { name, price })
         .then((response) => {
            console.log("Response Sent ", response.data);
         })
         .catch((err) => {
            console.log("Error Occured ", err);
         })
   }



   return (
      <>
         <form onSubmit={addProduct}>
            <input className={styles.class} type="text" onChange={(e) => { setName(e.target.value) }} />
            <input className={styles.class} type="number" onChange={(e) => { setPrice(e.target.value) }} />
            <input className={styles.class} type="submit" />
         </form>
      </>
   )
}

export default Card