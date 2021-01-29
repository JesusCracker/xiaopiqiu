import { queryAppList,saveApp } from '@/services/api';


export default {
  namespace: 'appManagement',
  state: {
    appManagementList: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryAppList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * saveAppInfo({ payload }, { call }) {
      return yield call(saveApp, payload);
    },


  },

  reducers: {

    save(state, action) {
      return {
        ...state,
        appManagementList: action.payload,
      };
    },
  },
};
