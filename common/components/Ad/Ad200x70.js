import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Ad200x70 = () => (
  <div className={css(styles.ad)}>
    <img src='http://fakeimg.pl/200x70/' />
  </div>
)

const styles = StyleSheet.create({
  ad: {
    textAlign: 'center',
    width: 230
  }
})

export default Ad200x70
