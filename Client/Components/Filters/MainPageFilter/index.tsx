import React from 'react'
import styles from '../filters.module.scss'
import cx from 'classnames'
import {  FormControlLabel, Switch } from '@mui/material'
import { useRouter } from 'next/router'


type TProps = {
    isOpen?: boolean,
    setIsExpansion: Function
    isExpansion?: boolean;
}

const Filters = ({isOpen=true, setIsExpansion, isExpansion}: TProps) => {
  const router = useRouter()

  const handleLink = () => {
router.push("/shop/all-products")
  }

  return (
    <section className={cx(styles.filter__container, {[styles.filter__closed]: !isOpen})}>
        Filters
        <div className={styles.filter__groupContainer}>
        <div className={styles.filter__group1}>
     <FormControlLabel control={<Switch />} label={`Filter by ${isExpansion ? "category" : "expansion"}`} sx={{color: "rgba(0, 0, 0, 0.87)", width: "100%"}} onChange={() => setIsExpansion(!isExpansion)}/>
     

     </div>
     <div className={styles.filter__group2}>
     <FormControlLabel control={<Switch />} label={`Filter by all products`} sx={{color: "rgba(0, 0, 0, 0.87)", width: "100%"}} onChange={handleLink}/>
     </div>
     </div>
    </section>
  )
}

export default Filters