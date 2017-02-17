import React from 'react'
import ListItem from '../../../components/News/ListItem'
import { StyleSheet, css } from 'aphrodite'

const ReleatedContent = ({ type }) => (
  <div className={css(styles.box)}>
    <h2 >{ type }</h2>
    <div>
      { [1, 2, 3, 4].map((index) => <ListItem key={index} />)}
    </div>
  </div>
)

const styles = StyleSheet.create({
  box: {
    marginTop: '1rem'
  }

})
export default ReleatedContent
