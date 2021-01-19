import { queryTradeData, queryTradeSelect, saveTradeData ,removeTrade} from '@/services/trade';

export default {
  namespace: 'trade',
  state: {
    tradeData:[],
    tradeSelectData:[],
  },

  effects: {
    * fetchTradeData(_, { call, put }) {
      const response = yield call(queryTradeData);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchTradeSelectData(_, { call, put }) {
      const response = yield call(queryTradeSelect);
      yield put({
        type: 'saveSelect',
        payload: response,
      });
    },

    * addTradeData({ payload }, { call }) {
      return yield call(saveTradeData, payload);
    },

    * remove({ payload }, { call }) {
      return yield call(removeTrade, payload);
    },


  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        tradeData: action.payload.data,
      };
    },
    saveSelect(state, action) {
      return {
        ...state,
        tradeSelectData: action.payload.data,
      };
    },
  },
};
