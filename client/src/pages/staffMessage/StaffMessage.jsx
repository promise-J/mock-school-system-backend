import React, { useState, useEffect, useRef } from 'react'
import './staffMessage.css'
import Layout from '../../components/Layout/Layout'
import { useSelector } from 'react-redux';
import MessageFeed from './MessageFeed';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

const StaffMessage = () => {
    const parentRef = useRef(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [content,setContent] = useState('')
    const [cb, setCb] = useState(false)
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
          parentRef.current?.scrollIntoView({
            // bottom: 0,
            // left: 0,
            behavior: 'smooth'
          });
      });


    useEffect(()=>{
       const getMessages = async() =>{
         try {
             setLoading(true)
             const res = await axios.get('/message')
             setMessages(res.data)
             setLoading(false)
         } catch (error) {
             console.log(error)
         }
       }
       getMessages()
    },[cb])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!content) return
        try {
            await axios.post('/message', {sender: user?.user.id, message: content})
            setCb(!cb)
        } catch (error) {
            console.log(error)
        }
        setContent('')
    }

    return (
        <Layout>
        <div className='dashboard staffMessage'>
            <div className="staffHeading">
                <div className="staffAvatar">
                    <span>{user?.user.loginID[0]}</span>
                    <span>{user?.user.loginID}</span>
                </div>
            </div>
            <div className="staffMessageBody">
            <p className='staffWelcomeHead'>Welcome to Resonance family</p>
            {
                loading ? <CircularProgress style={{margin: '40px 50px', fontSize: 50}} /> :
            <div ref={parentRef} className="staffMessageContainer">
            {
                messages?.map(m=>(
                    <MessageFeed key={m._id} message={m} messages={messages} setMessages={setMessages} />
                ))
            }
            </div>
            }
            </div>
            <div className="messageBottom">
               <form onSubmit={handleSubmit} className="messageBottomInputD">
                   <input type="text" value={content} name='content' onChange={(e)=> setContent(e.target.value)} className="messageBottom" placeholder='Type a message' />
                   <button className="messageBottomSubmit">SEND</button>
               </form>
            </div>
        </div>
        </Layout>
    )
}

export default StaffMessage
