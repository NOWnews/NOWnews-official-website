import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Head = () => (
  <div className={css(styles.box)}>
    <div className='container'>
      Head
    </div>
  </div>
)

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F1F2F3'
  }
})

export default Head
