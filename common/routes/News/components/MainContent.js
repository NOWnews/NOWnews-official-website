import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import {
    FontSize, NewsContent, Social, Thermometer, ThermometerSm,
    ReleatedContent
} from '../components'
import { Ad300x250 } from '../../../components/Ad'
const MainContent = () => (
  <div>
    <img className={css(styles.img)} src='http://imgapi.nownews.com/?w=640&h=360&q=60&src=http%3A%2F%2Fs.nownews.com%2F6c%2F53%2F6c53c529b8f99b7ae02dfea7a6c33294.jpg' />
    <span>行政院長林全17日赴立法院進行施政報告並備詢，同時也針對國道5號遊覽車事故進行專案報告。林全說，對於這起不幸事件除了表達哀悼外，政府也將痛定思痛，加速淘汰不肖業者。（圖／記者陳明安攝，2017.02.17）</span>
    <div className={css(styles.content)}>
      <div className={css(styles.leftSide)}>
        <NewsContent />
        <Social />
        <ThermometerSm />
        <ReleatedContent type='相關新聞' />
        <ReleatedContent type='你可能會喜歡' />
      </div>
      <div className={css(styles.rightSide)}>
        <Social />
        <FontSize />
        <Ad300x250 />
        <Thermometer />
        <Ad300x250 />
        <Ad300x250 />
      </div>
    </div>
  </div>
)

const styles = StyleSheet.create({
  content: {
    display: 'inline-flex',
    margin: '2rem 0'
  },
  img: {
    height: '100%',
    width: '100%'
  },
  leftSide: {
    width: '69%'
  },
  rightSide: {
    width: '31%'
  }
})

export default MainContent
