import { queryTemplateList, saveTemplate, removeTemplate,publishTemplate } from '@/services/rednevelop';
import { queryEnterpriseList } from '@/services/user';
import { uploadFiles } from '@/services/api';



export default {
  namespace: 'template',
  state: {
    templateList: [],
    enterpriseList: [],
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryTemplateList, payload);
      yield put({
        type: 'saveTemplateList',
        payload: response,
      });
    },

    * fetchEnterpriseList({ payload }, { call, put }) {
      const response = yield call(queryEnterpriseList, payload);
      yield put({
        type: 'saveEnterpriseList',
        payload: response,
      });
    },

    //上传文件
    * uploadFile({ payload }, { call }) {
      return yield call(uploadFiles, payload);
    },

    //保存红包模板
    * saveTemp({ payload }, { call }) {
      return yield call(saveTemplate, payload);
    },

    //删除红包模板
    * removeTempById({ payload }, { call }) {
      return yield call(removeTemplate, payload);
    },

    //上架&&下架红包模板
    * publishedById({ payload }, { call }) {
      return yield call(publishTemplate, payload);
    },


  },

  reducers: {
    saveEnterpriseList(state, action) {
      return {
        ...state,
        enterpriseList: action.payload.data,
      };
    },
    saveTemplateList(state, action) {
      return {
        ...state,
        templateList: action.payload,
      };
    },
  },
};
