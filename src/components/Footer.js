import { useState } from 'react'
import '../styles/Footer.css'
import { useRef } from 'react'
import { contactMessage } from '../datas/emailTemplate'
import api from '../functions/API_Calls/apiCalls'
import validator from 'validator'
import process from "process"; 

function Footer() {
	//We are forced to use email and setEmail instead of useRef since we need to store email as a state--> update send button background after the fisrt time!
	const [displayTooltip, setDistplayTooltip]=useState(false);
	const emailInput=useRef();
	const [email, setEmail]=useState('');

	  async function handleSubmit(){
	 const data =contactMessage(emailInput.current.value, "contact message")
	 const url= `${process.env.REACT_APP_BASE_PATH}/api/email/sendemail`

	  api.post(url, data).then(data=>{
	  setEmail('');
	  emailInput.current.value=''
	})
	  }
	
	function handleBlur() {
		setDistplayTooltip(emailInput.current.value.length==0  || !validator.isEmail(emailInput.current.value));
		setTimeout(()=>setDistplayTooltip(false),3000)
	}

	return (
		<footer className='mb-footer'>
			<div className='mb-footer-elem'>
				Got a passion for plants? 🌿🌱🌵
			</div>
			<label for='mail'  className='mb-footer-elem'>Enter your email :</label>
			<div className='email'>
			<input className="inputFooter"
				placeholder='enter your email'
				onBlur={handleBlur}
				type='email'
				name='mail'
				id='mail'
				ref={emailInput}
			  onChange={(e)=>setEmail(e.currentTarget.value)}
			/>	
		
			{/* <button className={`mb-send-btn ${!emailInput.current ||!validator.isEmail(emailInput?.current?.value)? 'btn-disabled' : ''}`}  onClick={handleSubmit} disabled={!(emailInput.current && validator.isEmail(emailInput?.current?.value))}>send</button> */}
			<button className={`mb-send-btn ${!validator.isEmail(email)? 'btn-disabled' : ''}`}  onClick={handleSubmit} disabled={!validator.isEmail(email)}>send</button>

			</div>
				  {displayTooltip ? <div className='invalidMsg'>invalid email</div>:null}
		</footer>
	)
}

export default Footer