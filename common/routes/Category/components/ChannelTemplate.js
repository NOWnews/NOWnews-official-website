import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';
import Pagination from '../../../components/Pagination';
import Selecter from './Selecter';

const ChannelTemplate = ({ local, newsList, page, loadData, selected, options }) => {
  return (
    <div>
      <div className='clearfix'>
        <Selecter loadData={loadData} selected={selected} options={options} />
        {newsList.map(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl, type }) => (
          <div key={sn} className={css(styles.blockItem)}>
            <BlockItem
              category={MainMenu && MainMenu.name || 'Sponsored'}
              photo={MainPhoto}
              title={shortTitle}
              time={formatStartedAt}
              type={type}
              url={parseUrl} />
          </div>
        ))}
      </div>
      {page && <Pagination {...page} {...local} />}
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    height: 245,
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    width: 300
  }
});

ChannelTemplate.propTypes = {
  loadData: PropTypes.func.isRequired,
  local: PropTypes.object.isRequired,
  newsList: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  page: PropTypes.object,
  selected: PropTypes.object.isRequired
};

export default ChannelTemplate;
