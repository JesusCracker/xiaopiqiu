import { deleteUser, queryUserList, saveUser,changeUserPWD } from '@/services/user';

export default {
  namespace: 'users',
  state: {
    userList: [],
  },

  effects: {
    * fetchUserList({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'saveUserList',
        payload: response,
      });
    },

    * saveUserInfo({ payload }, { call }) {
      return yield call(saveUser, payload);
    },

    * deleteUserById({ payload }, { call }) {
      return yield call(deleteUser, payload);
    },

    * changeCurrentPWD({ payload }, { call }) {
      return yield call(changeUserPWD, payload);
    },


  },

  reducers: {
    saveUserList(state, action) {
      return {
        ...state,
        userList: action.payload,
      };
    },
  },
};
