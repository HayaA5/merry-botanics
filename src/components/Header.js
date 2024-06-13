import '../styles/Header.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react';
import styled from 'styled-components'
import { IoPersonOutline } from "react-icons/io5";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding:0.3em;
  &:hover {
    opacity:0.7;
  }
`

function Header() {
  const [user, setUser] = useContext(UserContext);
  return (
    <header className='sticky'>
      <div className='login-bar'>
        {user.fullName ? <div className='userName'>Welcome {user.fullName} !</div> : <div></div>}

        {!user.fullName ?
          <StyledLink to="/login"> <IoPersonOutline /> login</StyledLink> :
          <StyledLink to="/" onClick={() => {
            setUser("");
            localStorage.clear();
          }}
            state={{ logout: true }}>logout</StyledLink>
        }
      </div>

      <div className='mb-logo-title'>
        <img src={logo} alt='Merry Botanics' className='mb-logo' />
        <h1 className='mb-title'>Merry Botanics</h1>
        <div className='icon'></div>
      </div>

    </header>)
}

export default Header
