export const imgUrlPath = 'http://www.aisono.cn/aisonofile/';
export const identImagePath = 'http://www.xiaopiqiu.net:8090';

export const treeData = [
  {
    title: '消息管理',
    name: 'messageManagement',
    key: '0',
    path: './app/messageManagement',
    icon: 'setting',
    children: [
      {
        title: '网站公告',
        name: 'announcementList',
        key: '0-0',
        path: './app/messageManagement/announcementList',
        icon: 'notification'
      },
      {
        title: '网站消息',
        name: 'messageList',
        key: '0-1',
        path: './app/messageManagement/messageList',
        icon: 'message'
      },
    ],
  },
  {
    title: '用户管理',
    name: 'userManagement',
    key: '1',
    path: './app/userManagement',
    icon: 'user',
    children: [
      { title: '企业用户', key: '1-0', path: './app/userManagement/enterprise', name: 'enterprise', icon: 'bank'  },
      { title: '个人用户', key: '1-1', path: './app/userManagement/person', name: 'person', icon: 'user'  },
      { title: '黑名单', key: '1-2', path: './app/userManagement/blacklist', name: 'blacklist', icon: 'profile'  },
      { title: '用户统计', key: '1-3', path: './app/userManagement/userStatistics', name: 'userStatistics' , icon: 'line-chart'},
    ],
  },
  {
    title: '积分管理',
    name: 'pointsManagement',
    key: '2',
    path: './app/pointsManagement',
    icon: 'credit-card',
    children: [
      { title: '积分设置', key: '2-0', path: './app/pointsManagement/setting', name: 'setting', icon: 'setting' },
      { title: '交易记录', key: '2-1', path: './app/pointsManagement/provide', name: 'provide', icon: 'save' },
      { title: '交易类型', key: '2-2', path: './app/pointsManagement/trade', name: 'trade' , icon: 'dollar'},
      { title: '交易统计', key: '2-3', path: './app/pointsManagement/withdraw', name: 'withdraw' , icon: 'file-sync'},
    ],
  },
  {
    title: '红包管理',
    name: 'redenvelopeManagement',
    key: '3',
    path: './app/redenvelopeManagement',
    icon: 'mail',
    children: [
      { title: '红包设置', key: '3-0', path: './app/redenvelopeManagement/setting', name: 'setting', icon: 'setting' },
      { title: '红包模板', key: '3-1', path: './app/redenvelopeManagement/template', name: 'template', icon: 'foldr-open' },
      {
        title: '红包活动',
        key: '3-2',
        path: './app/redenvelopeManagement/activity',
        name: 'activity',
        icon: 'notification',
      },
      {
        title: '红包统计',
        key: '3-3',
        path: './app/redenvelopeManagement/statistics',
        name: 'statistics',
        icon: 'dot-chart',
      },
    ],
  },
  {
    title: 'app管理',
    name: 'appManagement',
    key: '4',
    path: './app/appManagement',
    icon: 'dropbox',
    children: [
      { title: 'app管理', key: '4-0', path: './app/appManagement/management', name: 'appList', icon: 'dropbox' },
    ],
  },
  {
    title: '系统设置',
    name: 'system',
    key: '5',
    path: './app/system',
    icon: 'setting',
    children: [
      { title: '用户管理', key: '5-0', path: './app/system/userManagement', name: 'userList', icon: 'user' },
      { title: '修改密码', key: '5-1', path: './app/system/changePWD', name: 'changePWD', icon: 'edit' },
    ],
  },
];
