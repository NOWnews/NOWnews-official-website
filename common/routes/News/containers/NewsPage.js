import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadNews } from '../actions'
import { StyleSheet, css } from 'aphrodite'
import { selectCurrentNews } from '../reducer'
import { Head, MainContent } from '../components'

const redial = {
  fetch: ({ dispatch, params: { id } }) => dispatch(loadNews(id))
}

const mapStateToProps = state => selectCurrentNews(state)

const NewsPage = ({ title, content, isLoading, error }) => {
  return (
    <div>
      {isLoading &&
        <div>
          <h2 className={css(styles.loading)}>Loading....</h2>
        </div>}
      {!isLoading &&
        <div>
          <Head />
          <MainContent />
        </div>}
    </div>
  )
}

NewsPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.object
}

const styles = StyleSheet.create({
  content: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '1rem 0',
    color: '#555'
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#000'
  },
  loading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(NewsPage))
