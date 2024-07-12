import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../functions/API_Calls/apiCalls';
import '../styles/Login.css'
import { UserContext } from '../contexts/UserContext'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function Login() {
  document.title = 'Login'
  const [, setUser] = useContext(UserContext);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    console.log('--------')
    e.preventDefault();
    const url = "/users/login"
    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }

    api.post(url, data).then(result => {
      if (result.message.token) {//change in backend not so much "nested"
        localStorage.setItem('token', result.message.token);
        setUser(result.message.userDetails)
        //setCart(JSON.parse(localStorage.getItem('cart')))
        // navigate('/', {state:{
        //   cart: JSON.parse(localStorage.getItem('cart')),
        // }}) 
        navigate('/')
      } else {
        setMessage('email or password is not valid')
        setTimeout(() => {
          setMessage('')
        }, 1500)
      }
    });
  }

  return (
    <div className='login_container fadeIn'>
      <h2 className='login-title'>Login </h2>
      <form onSubmit={handleSubmit}>
        <div className='form_group'>
          <label htmlFor="email" className='label'>email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="david@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className='form-input'
          />
        </div>

        <div className='form_group'>
          <label htmlFor="password" className='label'>password:
            <div className='passwordContainer'>
              <input
                type={displayPassword ? "text" : "password"}
                id="password"
                name="password"
                // placeholder="aaa"
                value={formData.password}
                onChange={handleChange}
                maxLength={10}
                className='form-input'
                required
              />
              {displayPassword ? <AiOutlineEyeInvisible className='eye-icon' onClick={() => { setDisplayPassword(!displayPassword) }} /> : <AiOutlineEye className='eye-icon' onClick={() => { setDisplayPassword(!displayPassword) }} />}
            </div>
          </label>
        </div>
        <button type="submit" className='btn_login'>Login</button>
      </form>

      <div>You still don't have any account?
        <Link className='link' to="/Register">Register</Link>
      </div>
      <div className='errorMessage'>{message}</div>
    </div>
  );
}
export default Login;