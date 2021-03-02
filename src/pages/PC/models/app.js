import { queryAppList } from '@/services/api';


export default {
  namespace: 'appDownload',

  state: {
    status: undefined,
  },

  effects: {
    * app({payload}, {call, put}) {  // eslint-disable-line
      return  yield call(queryAppList, payload);
      /*     yield put({
               type: 'save',
               payload: response,
           });*/
    },
  },

  reducers: {

  },
};
