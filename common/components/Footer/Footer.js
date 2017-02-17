import React from 'react'
import AdBlock from './components/AdBlock'
import { StyleSheet, css } from 'aphrodite'

export const Footer = () => (
  <div className={css(styles.box)}>
    <div className={css(styles.adBlocks)}>
      { [1, 2, 3, 4, 5].map((index) => <AdBlock key={index} />)}
    </div>
    <hr />
    <div className={css(styles.announce)}>
      Copyright sdfs© 2017 NOWnwes 今日新聞 免責聲明 | 隱私權聲明 | 著作權聲明
    </div>
  </div>
)

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#424344',
    marginTop: '1rem',
    padding: '1rem 0'
  },
  adBlocks: {
    display: 'inline-flex'
  },
  announce: {
    color: '#fff',
    padding: '0 1rem'
  }
})
export default Footer
