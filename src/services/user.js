import request from '@/utils/request';


// 获取用户管理列表
export async function queryUserList(params) {
  return request(`/api/userList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//保存用户信息
export async function saveUser(params) {
  return request(`/api/addUser`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//删除用户
export async function deleteUser(params) {
  return request(`/api/deleteUser`, {
    method: 'POST',
    body: {
      ...params
    },
  });
}

//修改用户密码
export async function changeUserPWD(params) {
  return request(`/api/changeUserPWD`, {
    method: 'POST',
    body: {
      ...params
    },
  });
}


//通过id获取用户详情，暂无
export function queryCurrent() {
  const userName=localStorage.getItem('userName');
  return {'name':JSON.parse(userName)};
}

//获取企业用户列表
export async function queryEnterpriseList(params) {
  return request(`/api/frontUser/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//保存企业用户
export async function saveEnterprise(params) {
  return request(`/api/frontUser/addOrEdit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//改变企业启停
export async function changeEnterpriseStatu(params) {
  return request(`/api/frontUser/changeStatus`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


//获取企业积分&金币信息
export async function queryTradeList(params) {
  return request(`/api/frontUser/tradeList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
