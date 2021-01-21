import { queryMessageList, publish,saveAnnounce,queryMsgList,saveMessage,remove } from '@/services/message';

export default {
  namespace: 'message',
  state: {
    messageList: [],
    msgList:[],
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryMessageList, payload);
      yield put({
        type: 'saveMessageList',
        payload: response,
      });
    },

    * fetchMsg({ payload }, { call, put }) {
      const response = yield call(queryMsgList, payload);
      yield put({
        type: 'saveMsgList',
        payload: response,
      });
    },

    * saveTemp({ payload }, { call }) {
      return yield call(saveMessage, payload);
    },

    * save({ payload }, { call }) {
      return yield call(saveAnnounce, payload);
    },

    * publishedById({ payload }, { call }) {
      return yield call(publish, payload);
    },

    * removedById({ payload }, { call }) {
      return yield call(remove, payload);
    },

  },

  reducers: {
    saveMessageList(state, action) {
      return {
        ...state,
        messageList: action.payload,
      };
    },
    saveMsgList(state, action) {
      return {
        ...state,
        msgList: action.payload,
      };
    },
  },
};
