import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../functions/API_Calls/apiCalls';
import '../styles/Login.css'
import { UserContext } from '../contexts/UserContext'
import { AiOutlineEye } from 'react-icons/ai'

function Login() {
  document.title = 'Login'
  const [, setUser] = useContext(UserContext);
  const [displayPassword, setDisplayPassword] = useState(false);


  const [formData, setFormData] = useState({ email: "", password: "" })

  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  // const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/users/login"
    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }



    //const result = 
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

        //return false;
      }
    });

  }

  const handleForgetPassword = (e) => {
    //   e.preventDefault();
    //   setMessage("📭 We send you and email to reset password")
    //   setTimeout(() => {
    //     setMessage(false)
    //   }, 15000)
    // const result = api.post(url, data).then(data=>{
    //     console.log('data in then',data);
    //      if(data.code==200){
    //       console.log('user email', data.message.userDetails.email)
    //       setUser(data.message.userDetails.fullName)
    //         console.log('navigate to website');
    //         //debugger;
    //        // console.log(xx)
    //         navigate('/');

    //      }else {
    //       console.log("pb")
    //        setMessage("פרטיך שגויים")
    //         setTimeout(() => {
    //             setMessage(false)
    //         }, 1500)
    //      }
    // })
  }

  //   // if (result.token) 
  //   const url = "/users/changepassword"
  //   api.put(url, email)
  // };



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
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>


        <div className='form_group'>
          <label htmlFor="password" className='label'>password:
            <div className='passwordContainer'>
              <input
                type={displayPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                maxLength={10}
                required
              />
              <AiOutlineEye className='eye-icon' onClick={() => { setDisplayPassword(!displayPassword) }} />
            </div>
          </label>
        </div>
        <button type="submit" className='btn_login'>Login</button>
      </form>

      <div>You still don't have any account?
        <Link className='link' to="/Register">Register</Link>
      </div>
      <div onClick={handleForgetPassword} className='forgetPassword'>Forgot password</div>
      <div className='errorMessage'>{message}</div>

    </div>

  );
  //};
}
export default Login;