export const LOAD_HEADER_REQUEST = 'LOAD_HEADER_REQUEST';
export const LOAD_HEADER_SUCCESS = 'LOAD_HEADER_SUCCESS';
export const LOAD_HEADER_FAILURE = 'LOAD_HEADER_FAILURE';

const initialState = {
  lastFetched: null,
  isLoading: false,
  news: [],
  error: null,
  menus: [],
  currentMenu: {},
  ads: {}
};

export function loadHeader (url) {
  return (dispatch, getState, { axios }) => {
    // 有抓過資料就跳過，不重複呼叫（沒有頁數問題）
    const { lastFetched } = getState().header;
    if (lastFetched !== null) {
      return Promise.resolve();
    }
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_HEADER_REQUEST });
    return Promise.all([
      axios.get(`${apiServ}/menus`),
      axios.get(`${apiServ}/instant?limit=9`),
      axios.get(`${apiServ}/promote/common`)
    ]).then(([menus, instant, ad]) => {
      dispatch({
        type: LOAD_HEADER_SUCCESS,
        payload: [menus.data, instant.data, ad.data],
        meta: {
          lastFetched: Date.now()
        }
      });
    })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_HEADER_FAILURE}: `, error);
        dispatch({
          type: LOAD_HEADER_FAILURE,
          payload: error.response ? error.response.data : error.message,
          error: true
        });
      });
  };
}

export default function header (state = initialState, action) {
  switch (action.type) {
    case LOAD_HEADER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_HEADER_SUCCESS:
      const [ menus, instant, ads ] = action.payload;
      return {
        ...state,
        ads,
        menus,
        news: instant && instant.newsList || [],
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_HEADER_FAILURE:
      return { ...state,
        error: action.payload.message,
        menus: [],
        news: [],
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectFooterAds = (state) => {
  return {
    footer: state.header.ads.footer,
    grabBag: state.header.ads.grabBag
  };
};
export const selectMenus = state => state.header.menus;
export const selectMarquee = (state) => {
  return {
    ads: {
      instant: state.header.ads.instant || [],
      grabBag: state.header.ads.grabBag || []
    },
    news: state.header.news
  };
};
export const selectObjectMenu = (state) => {
  let result = {};
  state.header.menus.forEach((menu) => {
    result[menu._id] = menu;
  });
  return result;
};

