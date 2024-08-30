import ReactDOM from 'react-dom';
import { useEffect } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import s from './Modal.module.css'
const Modal = ({ children, title = 'Default modal', onClose }) => {
	const handleBackDropClick = e => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Escape') {
				onClose()
			}
		}
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])
	return ReactDOM.createPortal(
		<div className={s.wrapper} onClick={handleBackDropClick}>
			<div className={s.content}>
				<>
					<h1>{title}</h1>
				</>
				<button className={s.closeBtn} onClick={onClose}>
					<IoCloseSharp/>
				</button>
				{children}
			</div>
		</div>,
    document.getElementById('modal-root')
	)
}

export default Modal
