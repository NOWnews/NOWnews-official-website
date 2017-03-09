import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadCateogryList } from '../actions'
import { connect } from 'react-redux'
import BlockItem from '../../../components/News/BlockItem'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { selectNewsList } from '../reducer'
import { Layout } from '../../../style'
const { container } = Layout

const redial = {
  fetch: ({ dispatch }) => dispatch(loadCateogryList())
}

const mapStateToProps = state => ({
  newsList: selectNewsList(state)
})

const CategoryPage = ({ newsList }) => (
  <div className={css(styles.container)}>
    <Helmet title='NewsCategory' />
    {newsList.isLoading &&
      <div>
        <h2 className={css(styles.title)}>Loading ...</h2>
      </div>}
    {!newsList.isLoading && newsList.data.length === 0 &&
      <div>查無相關新聞 ... </div>}

    {!newsList.isLoading && newsList.data.length > 0 &&
      newsList.data.map((news, i) => (
        <div key={news._id} className={css(styles.blockItem)}>
          <BlockItem key={news._id} news={news} />
        </div>
      ))}
  </div>
)

CategoryPage.PropTypes = {
  posts: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container,
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  blockItem: {
    display: 'inline-flex',
    margin: 11.5,
    width: 300
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(CategoryPage))
