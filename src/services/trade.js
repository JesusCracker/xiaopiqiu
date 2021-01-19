import request from '@/utils/request';
// 交易类型树数据
export async function queryTradeData() {
  return request(`/api/tradeType/findOneTwoThreeList`, {
    method: 'POST',
  });
}

// 交易类型下拉选项
export async function queryTradeSelect() {
  return request(`/api/tradeType/findOneTwoList`, {
    method: 'POST',
  });
}

//新建&修改交易类型
export async function saveTradeData(params) {
  return request(`/api/tradeType/addOrEdit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//删除类型
export async function removeTrade(params) {
  return request(`/api/tradeType/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


