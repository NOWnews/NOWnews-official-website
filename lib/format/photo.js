const defaultUrl = 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
const size = {
  large: 'https://imgapiv2.nownews.com/?w=1080&q=85&src=',
  medium: 'https://imgapiv2.nownews.com/?w=640&q=70&src=',
  thumbnail: 'https://imgapiv2.nownews.com/?w=360&q=70&src='
};
const defaultFormat = {
  sn: 'default',
  title: '',
  desc: '',
  width: 915,
  height: 610,
  origin: defaultUrl,
  url: `${size.large}${defaultUrl}`,
  thumbnail: `${size.thumbnail}${defaultUrl}`,
  medium: `${size.medium}${defaultUrl}`,
  large: `${size.large}${defaultUrl}`
};
const formatPhoto = (photo) => {
  if (!photo) {
    return defaultFormat;
  }

  const { sn, title, desc, width, height, url, thumbnail, googleCDN } = photo;
  const splitArray = thumbnail.split('&src=');
  const source = splitArray[1];

  return {
    sn,
    title,
    desc,
    width,
    height,
    origin: url,
    url: googleCDN || `${size.large}${source}`,
    thumbnail: `${size.thumbnail}${source}`,
    medium: `${size.medium}${source}`,
    large: `${size.large}${source}`
  };
};

export default formatPhoto;
