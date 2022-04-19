import React from 'react'
import './styles.css'

export default function Button({label, onClick, disabled}) {
  return (
      <button className='btn-container' disabled={disabled} onClick={onClick}>{label}</button>
  )
}
