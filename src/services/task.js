import request from 'umi-request';

// 获取任务管理列表
export async function queryTaskList(params) {
  return request(`/api/userTask/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//添加&&修改任务
export async function saveTask(params) {
  return request(`/api/userTask/addOrEdit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//任务启停
export async function changeTaskStatus(params) {
  return request(`/api/userTask/updateStatus`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
