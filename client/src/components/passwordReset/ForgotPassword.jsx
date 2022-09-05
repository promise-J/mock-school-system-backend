// import axios from 'axios';
import axios from 'axios';
import React, { useState } from 'react';
import './passwordReset.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async () => {
        if (!email) {
            setError('Email is not provided...')
            return setTimeout(() => {
                setError('')
            }, (3000));
        }
        try {
            await axios.post('/users/forgotEmail', {email})
            setEmail('')
            setSuccess(`Email sent to ${email}. Check it out.`)
            return setTimeout(()=>{
                setSuccess('')
            }, 3000)
        } catch (error) {
            setError('Email is not provided...')
            return setTimeout(() => {
                setError('')
            }, (3000));
        }
    }

    return <div className='forgotPassword'>
        <div className="forgotPasswordContainer">
            {error && <p>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
            <h1>Enter registered Email here</h1>
            <input placeholder='email here' type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>;
};

export default ForgotPassword;
