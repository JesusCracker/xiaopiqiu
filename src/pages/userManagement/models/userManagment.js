import { queryEnterpriseList, saveEnterprise,queryTradeList,changeEnterpriseStatu } from '@/services/user';

export default {
  namespace: 'userManagement',
  state: {
    enterpriseList: [],
    tradeList:{data:[],dataTotal:0},
  },

  effects: {
    * fetchEnterpriseList({ payload }, { call, put }) {
      const response = yield call(queryEnterpriseList, payload);
      yield put({
        type: 'saveEnterpriseList',
        payload: response,
      });
    },

    * saveEnterpriseInfo({ payload }, { call }) {
      return yield call(saveEnterprise, payload);
    },

    * changeEnterpriseStatus({ payload }, { call }) {
      return yield call(changeEnterpriseStatu, payload);
    },

    * fetchTradeList({ payload }, { call, put }) {
      const response = yield call(queryTradeList, payload);
      yield put({
        type: 'saveTradeList',
        payload: response,
      });
    },

  },

  reducers: {
    saveEnterpriseList(state, action) {
      return {
        ...state,
        enterpriseList: action.payload,
      };
    },
    saveTradeList(state, action) {
      return {
        ...state,
        tradeList: action.payload,
      };
    },
  },
};
