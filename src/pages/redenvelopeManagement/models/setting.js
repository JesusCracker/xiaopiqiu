import { setPayWay, queryPaySetting } from '@/services/rednevelop';

export default {
  namespace: 'redenvelopeSetting',
  state: {
    setting: { data: { payMethod: '' } },
  },

  effects: {
    * fetchPaySetting(_, { call, put }) {
      const response = yield call(queryPaySetting);
      yield put({
        type: 'saveSetting',
        payload: response,
      });
    },

    * savePaySetting({ payload }, { call }) {
      return yield call(setPayWay, payload);
    },

  },

  reducers: {

    saveSetting(state, action) {
      return {
        ...state,
        setting: action.payload,
      };
    },
  },
};
