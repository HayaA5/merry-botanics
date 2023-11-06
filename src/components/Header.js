import '../styles/Header.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import {UserContext} from '../contexts/UserContext'
import { useContext} from 'react';
import styled from 'styled-components'

 const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    opacity:0.7;
  }
`

function Header() {
  const [user,setUser] = useContext(UserContext);
	return <div className='sticky'>
    <div className='login-bar'>
    {user.fullName ?<div className='userName'>Welcome {user.fullName} !</div>:<div></div> }
 
      {!user.fullName ?
//  <StyledLink  to="/login" state={{cart:JSON.parse(localStorage.getItem('cart'))}}>login</StyledLink>:
 <StyledLink  to="/login" >login</StyledLink>:

 <StyledLink
 to="/"
 onClick={() => {
   setUser("");
   localStorage.clear();
 }}
 state={{logout: true}}
>
logout
 
</StyledLink>
}
</div>

  <div className='mb-logo-title'>
    
		<img src={logo} alt='Merry Botanics' className='mb-logo' />
				<h1 className='mb-title'>Merry Botanics</h1>
			
	  <div className='icon'>
       
      </div>
	</div>

  </div>
}

export default Header
