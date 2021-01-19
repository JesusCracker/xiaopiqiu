import request from '@/utils/request';
// 获取积分设置内容
export async function queryPoint() {
  return request(`/api/sysProperties/all`, {
    method: 'POST',
/*    body: {
      ...params,
    },*/
  });
}

// 设置积分内容
export async function savePoint(params) {
  return request(`/api/sysProperties/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
