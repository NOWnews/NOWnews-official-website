export const LOAD_CHANNEL_REQUEST = Symbol('LOAD_CHANNEL_REQUEST');
export const LOAD_CHANNEL_SUCCESS = Symbol('LOAD_CHANNEL_SUCCESS');
export const LOAD_CHANNEL_FAILURE = Symbol('LOAD_CHANNEL_FAILURE');

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
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_CHANNEL_REQUEST });
    return Promise.all([
      axios.get(`${protocol}://${host}/specialchannels`),
      axios.get(`${protocol}://${host}/specialchannels/${sn}?page=${page}`)
    ]).then(([specialchannels, channelData]) => {
      let { pageData, ...channel } = channelData.data;
      dispatch({
        type: LOAD_CHANNEL_SUCCESS,
        payload: {
          channels: specialchannels.data.specialChannels,
          selectedChannel: channel,
          pageData: pageData
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_CHANNEL_FAILURE,
        payload: error,
        error: true
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
        error: null
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
        error: action.payload,
        isLoading: false,
        selectedChannel: []
      };
    default:
      return state;
  }
}

export const selectChannelPage = state => state.channelPage;
