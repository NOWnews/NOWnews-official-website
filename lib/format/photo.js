const size = {
  large: '?w=1080&q=85&src=',
  medium: '?w=640&q=70&src=',
  thumbnail: '?w=300&q=70&src='
};
const getDefault = (imgServ) => {
  const defaultUrl = 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
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
  const { sn, title, desc, width, height, url, sizeFormat } = photo;

  return {
    sn,
    title,
    desc,
    width,
    height,
    originSource: url, // 原圖
    url: sizeFormat.w1080q85,
    thumbnail: sizeFormat.w300q70,
    medium: sizeFormat.w640q70,
    large: sizeFormat.w1080q85
  };
};

export default formatPhoto;
