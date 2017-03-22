import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Home = (props) => (
  <div>
    <div className={css(styles.body)}>首頁內容</div>
  </div>
);

const styles = StyleSheet.create({
  body: {
    height: 300
  }
});

export default Home;
