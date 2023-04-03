import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginStatus } from '../loginSlice'

const Login = () => {
  const [user, setUser] = useState({});
  const [login,setLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.username === user.password) {
        dispatch(loginStatus({status: true, username: user.username}));
        navigate("/employee")
    } else {
        setLogin(false);
    }
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
    console.log(user)
  }

  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="username" placeholder='Username' onChange={(e)=> handleChange(e)} />
            <input type='password' name='password' placeholder='Password' onChange={(e)=> handleChange(e)}/>
            <button type='submit'>Submit</button>
            <button type='reset'>Cancel</button>
        </form>
        <p>{login ? '' : 'Login Failed'}</p>
    </div>
  )
}

export default Login