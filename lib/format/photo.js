const size = {
  large: '?w=1080&q=85&src=',
  medium: '?w=640&q=70&src=',
  thumbnail: '?w=300&q=70&src='
};
const getDefault = (imgServ) => {
  const defaultUrl = 'https://legacy.nownews.com/NOWnews_default/default.png';
  return {
    sn: 'default',
    title: '',
    desc: '',
    width: 915,
    height: 610,
    origin: defaultUrl,
    url: `${imgServ}${size.large}${defaultUrl}`,
    thumbnail: `${imgServ}${size.thumbnail}${defaultUrl}`,
    medium: `${imgServ}${size.medium}${defaultUrl}`,
    large: `${imgServ}${size.large}${defaultUrl}`
  };
};

const formatPhoto = (photo, imgServ) => {
  if (!photo) {
    return getDefault(imgServ);
  }
  const { sn, title, desc, width, height, url } = photo;
  let large = url;
  let medium = url;
  let thumbnail = photo.thumbnail;

  const imgRegexString = /^(http|https):\/\/[A-Za-z]+.nownews.com\//;
  if (imgRegexString.test(url)) {
    thumbnail = `${imgServ}${size.thumbnail}${url}`;
    medium = `${imgServ}${size.medium}${url}`;
    large = `${imgServ}${size.large}${url}`;
  }

  return {
    sn,
    title,
    desc,
    width,
    height,
    originSource: url, // 原圖
    url: large,
    thumbnail,
    medium,
    large
  };
};

export default formatPhoto;
