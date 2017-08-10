import { createSelector } from 'reselect';
import formatPhoto from '../../../lib/format/photo';

export const LOAD_CHANNEL_REQUEST = 'LOAD_CHANNEL_REQUEST';
export const LOAD_CHANNEL_SUCCESS = 'LOAD_CHANNEL_SUCCESS';
export const LOAD_CHANNEL_FAILURE = 'LOAD_CHANNEL_FAILURE';

const initialState = {
  channels: [],
  error: null,
  isLoading: false,
  lastFetched: null,
  selectedChannel: {
    sn: '',
    title: '',
    newsList: []
  },
  pageData: {}
};

export function loadChannelData (sn, page = 1) {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_CHANNEL_REQUEST });
    return Promise.all([
      axios.get(`${apiServ}/specialchannels`),
      axios.get(`${apiServ}/specialchannels/${sn}?page=${page}`)
    ]).then(([specialchannels, channelData]) => {
      let { pageData, ...selectedChannel } = channelData.data || {};
      dispatch({
        type: LOAD_CHANNEL_SUCCESS,
        payload: {
          channels: specialchannels.data.specialChannels,
          selectedChannel,
          pageData
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_CHANNEL_FAILURE,
        payload: error.response ? error.response.data : error.message
      });
    });
  };
}

export default function channelPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNEL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        selectedChannel: {
          sn: '',
          title: '',
          newsList: []
        }
      };
    case LOAD_CHANNEL_SUCCESS:
      let { channels, selectedChannel, pageData } = action.payload;
      return {
        ...state,
        channels,
        isLoading: false,
        lastFetched: action.meta.lastFetched,
        selectedChannel,
        pageData
      };
    case LOAD_CHANNEL_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
        selectedChannel: {
          sn: '',
          title: '',
          newsList: []
        }
      };
    default:
      return state;
  }
}

const getChannelPage = (state) => state.channelPage;
const formatChannelPage = createSelector(
  [getChannelPage], ({ selectedChannel, ...channelPage }) => {
    const result = {
      ...channelPage,
      selectedChannel: {
        ...selectedChannel,
        newsList: selectedChannel.newsList.map((news) => {
          return {
            ...news,
            MainPhoto: formatPhoto(news.MainPhoto)
          };
        })
      }
    };
    return result;
  }
);
export const selectChannelPage = state => formatChannelPage(state);
