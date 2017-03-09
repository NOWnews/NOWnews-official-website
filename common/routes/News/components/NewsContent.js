import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const NewsContent = ({ content }) => (
  <div className={css(styles.box)} dangerouslySetInnerHTML={{__html: content}} />
)

const styles = StyleSheet.create({
  box: {
    lineHeight: '2em',
    paddingRight: '1rem'
  }
})

export default NewsContent
