import '../styles/Popup.css'
import { useContext } from 'react'
import { PopupContext2 } from '../contexts/PopupContext'

export default function Popup() {
    const { popup, setPopup } = useContext(PopupContext2)

    return <div
        className={`overlay ${popup ? '' : 'close'}`}
        onClick={(e) => {
            if (e.target === e.currentTarget) {
                setPopup('')
            }
        }}>
        <div className='popup'>{popup}</div>
    </div>
}