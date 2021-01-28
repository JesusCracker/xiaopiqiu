import { queryActivityList } from '@/services/rednevelop';

export default {
  namespace: 'activity',
  state: {
    activityList: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryActivityList, payload);
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
        activityList: action.payload,
      };
    },
  },
};
