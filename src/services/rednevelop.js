import request from 'umi-request';

// 获取红包模板列表
export async function queryTemplateList(params) {
  return request(`/api/hongbaoTemplate/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//新增&修改红包模板
export async function saveTemplate(params) {
  return request(`/api/hongbaoTemplate/addOrEdit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//删除红包模板
export async function removeTemplate(params) {
  return request(`/api/hongbaoTemplate/delete`, {
    method: 'POST',
    body: {
      id: params,
    },
  });
}

//上架&&下架红包模板
export async function publishTemplate(params) {
  return request(`/api/hongbaoTemplate/updateStatus`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


