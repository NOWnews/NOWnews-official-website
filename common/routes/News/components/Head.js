import React from 'react'
import Link from 'react-router/lib/Link'
import { StyleSheet, css } from 'aphrodite'

const Head = () => (
  <div className={css(styles.box)}>
    <Link>生活</Link>
    <h1>遊覽車重大死傷　林全：痛定思痛、加速淘汰不肖業者</h1>
    <div>
      <span>Simon</span>
      <span>2017/1/1 09:45</span>
    </div>
  </div>
)

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F1F2F3'
  }
})

export default Head
