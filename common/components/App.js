import React from 'react'
import Helmet from 'react-helmet'
import Header from './Header'
import Footer from './Footer'
import { Ad970x90, Ad970x250 } from './Ad'

import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  root: {
    color: '#000',
    margin: '0 auto',
    maxWidth: 970
  }
})

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞' />
    <Header />
    <Ad970x90 />
    {children}
    <Ad970x250 />
    <Footer />
  </div>
)

export default App
