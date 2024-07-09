import '../styles/Register.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../functions/API_Calls/apiCalls';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai'

function Register() {
    document.title = 'Register'
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [message, setMessage] = useState(false),
        [passwordSame, setPasswordSame] = useState(true),
        [displayPassword, setDisplayPassword] = useState(false),
        [displayPasswordVer, setDisplayPasswordVer] = useState(false),
        navigate = useNavigate();

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.password.value !== e.currentTarget.confirmPassword.value) {
            setMessage("passwords are different")
            setTimeout(() => {
                setMessage(false)
            }, 1500)
            return;
        }

        const url = "/users/register"

        const data = {
            fullName: e.currentTarget.username.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }

        api.post(url, data).then(data => {
            if (data.code == 200) {
                navigate('/login');
            } else {
                setMessage(data.message)
                setTimeout(() => {
                    setMessage(false)
                }, 1500)
            }
        })
    }

    const checkPasswords = () => {
        setPasswordSame(!formData.password || !formData.confirmPassword || formData.password == formData.confirmPassword ? true : false);
    }

    return (
        <div className='registration_container fadeIn'>
            <h2 className='register-title'>Register:</h2>
            <form onSubmit={handleSubmit}>
                <div className='form_group'>
                    <label htmlFor="username" className='label'> name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="user name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={15}
                        required
                        className='form-input'
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="email" className='label'>email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={20}
                        required
                        className='form-input'
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="password" className='label'>password:</label>
                    <div className='passwordContainer'>
                        <input
                            type={displayPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="choose a password"
                            className={`form-input ${passwordSame ? '' : 'notValid'}`}
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={checkPasswords}
                            maxLength={10}
                            required
                        />
                        <AiOutlineEye className='eye-icon' onClick={() => { setDisplayPassword(!displayPassword); }} />
                    </div>
                </div>

                <div className='form_group'>
                    <label htmlFor="ConfirmPassword" className='label'>confirm password:</label>
                    <div className='passwordContainer'>
                        <input
                            type={displayPasswordVer ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="confirm the password"
                            className={`form-input ${passwordSame ? '' : 'notValid'}`}

                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={checkPasswords}
                            maxLength={10}
                            required
                        />
                        <AiOutlineEye className='eye-icon' onClick={() => { setDisplayPasswordVer(!displayPasswordVer) }} />
                    </div>
                </div>
                <button type="submit" className='btn_register'>Register</button>

            </form>
            <div>You already have an account?
                <Link className='link' to="/login">Login</Link>
            </div>
            <div className='errorMessage'>{message}</div>
        </div>
    );
};

export default Register
