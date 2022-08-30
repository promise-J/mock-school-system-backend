import { Visibility, VisibilityOff } from '@material-ui/icons';
// import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosRequest } from 'src/utils/axiosRequest';

const ResetPassword = () => {
    const { token } = useParams()
    const [data, setData] = useState({ password: '', cfPassword: '', error: '', success: '' })
    const { password, cfPassword, error, success } = data
    const [seePassword, setSeePassword] = useState(true)
    const [seeCpassword, setSeeCpassword] = useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!password || !cfPassword) {
            setData({ ...data, error: 'Provide passwords to proceed' })
            return setTimeout(() => {
                setData({ ...data, error: '' })
            }, 3000)
        }
        if (password !== cfPassword) {
            setData({ ...data, error: 'Passwords do not match' })
            return setTimeout(() => {
                setData({ ...data, error: '' })
            }, 3000)
        }
        try {
            await axiosRequest.post('/users/resetEmail', {password, token})
            setData({...data, password: '', cfPassword: '', success: 'Password Changed Successfully'})
        } catch (error) {
            console.log(error)
            setData({...data, error: 'Something went wrong'})
            return setTimeout(()=>{
                setData({...data, error: ''})
            })
        }
        console.log(data)
    }

    return <div className='resetPassword'>
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            {success && <p style={{color: 'green'}}>{success} <Link style={{background: 'rgb(174, 250, 174)', padding: 2}} to='/login'>Back to Login</Link></p>}
            <h4>Change your password</h4>
            <div className="resetPasswordInput">
                {!seePassword ?
                <VisibilityOff onClick={()=> setSeePassword(!seePassword)} className='resetPasswordIcon' style={{color: 'red'}} /> :
                <Visibility onClick={()=> setSeePassword(!seePassword)} className='resetPasswordIcon' style={{color: 'green'}} />
                }
                <input type={!seePassword ? 'text' : 'password'} value={password} placeholder='Password' onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
            <div className="resetPasswordInput">
            {!seeCpassword ?
                <VisibilityOff onClick={()=> setSeeCpassword(!seeCpassword)} className='resetPasswordIcon' style={{color: 'red'}} /> :
                <Visibility onClick={()=> setSeeCpassword(!seeCpassword)} className='resetPasswordIcon' style={{color: 'green'}} />
                }
                <input type={!seeCpassword ? 'text' : 'password'} value={cfPassword} placeholder='Confirm Password' onChange={(e) => setData({ ...data, cfPassword: e.target.value })} />
            </div>
            <button>Submit</button>
        </form>

    </div>;
};

export default ResetPassword;
