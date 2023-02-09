import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Card.module.css'


let baseURL = ''
if (window.location.href.split(':')[0] === 'http') {
   baseURL = 'http://localhost:5000'
}

const Card = () => {
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const [products, setProducts] = useState([])
   const [addProduct, setAddProduct] = useState(false)



   // ---------------------------------------- Create Product ----------------------------------------
   const createProduct = (e) => {
      e.preventDefault();
      axios.post(`${baseURL}/product`, { name, price })
         .then(response => {
            console.log("Response Sent ", response.data);
            setAddProduct(!addProduct)
            console.log('Product added Succesfully 👍')
         })
         .catch(error => {
            console.log('Error occured while adding product ❌', error)
         })
   }
   // ---------------------------------------- Create Product ----------------------------------------

   // ---------------------------------------- Get Product ----------------------------------------
   useEffect(() => {
      const allProducts = async () => {
         try {
            const response = await axios.get(`${baseURL}/products`)
            // setProducts(response.data.data)//New Product at the bottom
            setProducts(response.data.data.reverse())//New Product at the top
            // console.log('Product fetched Succesfully 👍')
         }
         catch (error) {
            console.log('Error occured while fetching product ❌', error)
         }
      }
      allProducts()

      //   // ---------- Cleanup Function ----------
      return () => { allProducts() }
      //   // ---------- Cleanup Function ----------

   }, [addProduct])
   // ---------------------------------------- Get Product --------------------------------------------------------------------------------


   // ---------------------------------------- Delete Product ----------------------------------------
   const deleteAll = (e) => {
      e.preventDefault();
      axios.delete(`${baseURL}/products`)
         .then((response) => {
            console.log("Response Sent ", response.data);
            setAddProduct(!addProduct)
            console.log(' Succesfully Deleted All Products👍')
         })
         .catch(error => {
            console.log('Error in Deleting All Products ❌', error)
         })
   }

   const deleteFunction = async (id) => {
      try {
         const response = await axios.delete(`${baseURL}/product/${id}`)
         console.log("response: ", response.data);
         setAddProduct(!addProduct)
         console.log('Product deleted Succesfully 👍')
      } catch (error) {
         console.log('Error occured while deleting product ❌', error)
      }
   }

   // ---------------------------------------- Delete Product ----------------------------------------

   return (
      <>
         <form onSubmit={createProduct}>
            <input className={styles.class} type="text" onChange={(e) => { setName(e.target.value) }} />
            <input className={styles.class} type="number" onChange={(e) => { setPrice(e.target.value) }} />
            <input className={styles.class} type="submit" />
            <input className={styles.class} type="submit" value='Delete' onClick={deleteAll} />
         </form>
         <hr />

         {
            products.map((product, i) => {
               return (
                  <div key={i}>
                     <h1>{product.name}</h1>
                     <p>{product.price}</p>
                     <button onClick={() => { deleteFunction(product._id) }}>Delete</button>
                  </div>
               )
            })
         }

      </>
   )
}

export default Card