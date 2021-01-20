export default [

  //forgot number be4 routePath;
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/login', redirect: '/05942911891/login', },
    ],
  },
  // login
  {
    path: '/05942911891/login',
    component: '../layouts/UserLayout',
    routes: [
      // { path: '/login', redirect: '/05942911891/login', },
      { path: '/05942911891/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },

  // app
  {
    path: '/05942911891',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      { path: '/05942911891', redirect: '/05942911891/messageManagement/announcementList' },

      {
        key: "5",
        path: '/05942911891/system',
        icon: 'setting',
        name: 'system',
        routes: [
          {
            key: "5-0",
            title: "用户管理",
            path: '/05942911891/system/userManagement',
            name: 'userList',
            component: './System/UserManagementList',
            routes: [
              {

              },
            ],
          },
          {
            key: "5-1",
            title: "修改密码",
            path: '/05942911891/system/changePWD',
            name: 'changePWD',
            component: './System/ChangePWD',
            routes: [
              {

              },
            ],
          }
        ],
      },
      {
        path: '/05942911891/appManagement',
        icon: 'setting',
        name: 'appManagement',
        routes: [
          {
            path: '/05942911891/appManagement/appManagement',
            name: 'appList',
            component: './appManagement/AppManagementList',
            routes: [
              {

              },
            ],
          }
        ],
      },
      {
        path: '/05942911891/redenvelopeManagement',
        icon: 'setting',
        name: 'redenvelopeManagement',
        routes: [
          {
            path: '/05942911891/redenvelopeManagement/setting',
            name: 'setting',
            component: './redenvelopeManagement/Setting',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/redenvelopeManagement/template',
            name: 'template',
            component: './redenvelopeManagement/Template',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/redenvelopeManagement/activity',
            name: 'activity',
            component: './redenvelopeManagement/Activity',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/redenvelopeManagement/statistics',
            name: 'statistics',
            component: './redenvelopeManagement/StatisticsList',
            routes: [
              {

              },
            ],
          }

        ],
      },
      {
        path: '/05942911891/pointsManagement',
        icon: 'setting',
        name: 'pointsManagement',
        routes: [
          {
            path: '/05942911891/pointsManagement/setting',
            name: 'setting',
            component: './pointsManagement/Setting',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/pointsManagement/provide',
            name: 'provide',
            component: './pointsManagement/Provide',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/pointsManagement/trade',
            name: 'trade',
            component: './pointsManagement/Trade',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/pointsManagement/withdraw',
            name: 'withdraw',
            component: './pointsManagement/Withdraw',
            routes: [
              {

              },
            ],
          }
        ],
      },
      {
        path: '/05942911891/userManagement',
        icon: 'setting',
        name: 'userManagement',
        routes: [
          {
            path: '/05942911891/userManagement/enterprise',
            name: 'enterprise',
            component: './userManagement/EnterpriseList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/userManagement/person',
            name: 'person',
            component: './userManagement/PersonList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/userManagement/blacklist',
            name: 'blacklist',
            component: './userManagement/BlackList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/userManagement/userStatistics',
            name: 'userStatistics',
            component: './userManagement/UserStatisticsList',
            routes: [
              {

              },
            ],
          }
        ],
      },
      {
        path: '/05942911891/publishManagement',
        icon: 'setting',
        name: 'publishManagement',
        routes: [
          {
            path: '/05942911891/publishManagement/contentManagement',
            name: 'contentManagement',
            component: './publishManagement/ContentManagementList',
            routes: [
              {

              },
            ],
          }
        ],
      },
      {
        path: '/05942911891/messageManagement',
        icon: 'setting',
        name: 'messageManagement',
        routes: [
          {
            path: '/05942911891/messageManagement/announcementList',
            name: 'announcementList',
            component: './messageManagement/AnnouncementList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/05942911891/messageManagement/messageList',
            name: 'messageList',
            component: './messageManagement/MessageList',
            routes: [
              {

              },
            ],
          }
        ],
      },
      {
        component: '404',
      },
    ],
  },

  //PC index
  {
    path: '/',
    routes: [
      // { path: '/pc', redirect: '/pc/index' },
      // { path: '/pc/index', component: './PC/index' },
      { path: '/', component: './PC/index' },
    ],
  },
];
