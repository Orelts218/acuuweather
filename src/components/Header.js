import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
export default function Header() {
  return (
    <div className={styles.nav}>
        <Link to="/home" >Home</Link>
        <Link to="/favorites" >Favorites</Link>
    </div>
  )
}
