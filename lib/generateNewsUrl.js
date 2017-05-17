import moment from 'moment';

const generateNewsUrl = (newsSn, startedAt) => {
  return `/news/${moment(startedAt).format('YYYYMMDD')}/${newsSn}`;
};

export default generateNewsUrl;
