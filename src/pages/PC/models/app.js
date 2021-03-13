import { queryAppList } from '@/services/api';

export default {
  namespace: 'appDownload',

  state: {
    status: undefined,
  },

  effects: {
    *app({ payload }, { call, put }) {
      // eslint-disable-line
      return yield call(queryAppList, payload);
      /*     yield put({
               type: 'save',
               payload: response,
           });*/
    },

    *fetchAppList({ payload }, { call, put }) {
      // eslint-disable-line
      const response = yield call(queryAppList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        latestVersionInfo: action.payload.data.length > 0 ? action.payload.data[0] : [],
      };
    },
  },
};
