import { queryPoint,savePoint } from '@/services/point';

export default {
  namespace: 'point',
  state: {
    pointSetting: { data: { pointToRMB: '', id: '', withdrawSetting: '' } }
  },

  effects: {
    * fetchPointSetting(_, { call, put }) {
      const response = yield call(queryPoint);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * savePointSetting({ payload }, { call }) {
      return yield call(savePoint, payload);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        pointSetting: action.payload,
      };
    },
  },
};
