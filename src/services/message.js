import request from '@/utils/request';


// 获取网站公告管理列表
export async function queryMessageList(params) {
  return request(`/api/websiteAnnouncement/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//发布
export async function publish(params) {
  return request(`/api/websiteAnnouncement/update`, {
    method: 'POST',
    body: {
      id:params
    },
  });
}

//新增&修改公告
export async function saveAnnounce(params) {
  return request(`/api/websiteAnnouncement/addOrEdit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//网站消息列表
export async function queryMsgList(params) {
  return request(`/api/websiteMessage/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//新增&修改网站消息
export async function saveMessage(params) {
  return request(`/api/websiteMessage/addOrEdit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
