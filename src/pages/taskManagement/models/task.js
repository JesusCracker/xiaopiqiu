import { queryTaskList, saveTask,changeTaskStatus } from '@/services/task';
import { queryMsgList } from '@/services/message';
import { queryTradeData } from '@/services/trade';
import { changeEnterpriseStatu } from '@/services/user';

export default {
  namespace: 'task',
  state: {
    taskList: [],
  },

  effects: {
    * fetchTaskList({ payload }, { call, put }) {
      const response = yield call(queryTaskList, payload);
      yield put({
        type: 'saveTaskList',
        payload: response,
      });
    },

    * fetchMsgList({ payload }, { call, put }) {
      const response = yield call(queryMsgList, payload);
      yield put({
        type: 'saveMsgList',
        payload: response,
      });
    },

    * fetchTradeData(_, { call, put }) {
      const response = yield call(queryTradeData);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * saveTaskInfo({ payload }, { call }) {
      return yield call(saveTask, payload);
    },

    * changeTaskStatus({ payload }, { call }) {
      return yield call(changeTaskStatus, payload);
    },

  },

  reducers: {
    saveTaskList(state, action) {
      return {
        ...state,
        taskList: action.payload,
      };
    },
    saveMsgList(state, action) {
      const initData={
        id: 0,
        title: '无',
      }
      return {
        ...state,
        // msgList:action.payload.data.concat(initData)
        msgList:[initData,...action.payload.data]
      };
    },
    save(state, action) {
      return {
        ...state,
        tradeData: action.payload.data,
      };
    },
  },
};
