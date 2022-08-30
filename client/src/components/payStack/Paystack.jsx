import React, { useState, useEffect } from "react"
import "./paystack.css"
import Img from  '../../images/payment.png'
import PaystackPop from '@paystack/inline-js'
import {useNotify} from '../../customHooks'
import { axiosRequest } from "src/utils/axiosRequest"
// import axios from "axios"
const {REACT_APP_PAYSTACK_SECRET} = process.env


const Paystack = () => {
  const notify = useNotify()
  console.log(REACT_APP_PAYSTACK_SECRET)

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [cardNo, setCardNo] = useState(0)
  const [amount, setAmount] = useState(0)

  useEffect(()=>{
      setAmount(cardNo * 55000)
  },[cardNo, amount])

  const payWithPaystack = (e)=>{
      e.preventDefault()
      if(cardNo <= 0) return notify('error', 'Scratch Card must be atleast 1')
      if(!email || !name) return notify('error', 'Details must be provided')
      const paystack = new PaystackPop()
      paystack.newTransaction({
          key: REACT_APP_PAYSTACK_SECRET,
          amount,
          email,
          onSuccess: async(transaction) =>{
                try {
                    const res = await axiosRequest.post(`/scratch?number=${cardNo}`)
                    console.log(res.data)
                } catch (error) {
                    notify('error', 'Something went Wrong')
                }
              return notify('success', 'Thank you for doing business with us! Come back soon')
          },
          onClose: () => notify('success', 'See you later! Have a nice day!'),
      })
  }


  return (
    <div className="paystack">
      <div className="container">
        <div className="item">
          <img src={Img} alt='' />
          <div className="item-details">
            {cardNo > 0 ? <p style={{color: 'green', fontWeight: 600}}>{cardNo} Scratch Card</p> 
            : <p style={{color: 'red', fontStyle: 'italic'}}>Quantity must be atleast 1</p>}
            {amount > 0 && <p>(NGN) #{amount/100}</p>}
          </div>
        </div>
        <div className="checkout-form">
          <form>
            <div>
            <span>Name</span>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <span>Email</span>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
            <span>Quantity</span>
            <input
              type="number"
              id="phone"
              value={cardNo}
              placeholder="Phone Number"
              onChange={(e) => {
                  if(e.target.value < 0) return
                //   computeAmount(e.target.value)
                  setCardNo(e.target.value)
              }}
              />
            </div>
            <div>
              {/* <PaystackButton className="payStackButton" {...componentProps} /> */}
              <button className="payStackButton" onClick={payWithPaystack} type='submit'>Pay Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Paystack