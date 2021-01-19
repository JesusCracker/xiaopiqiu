export default [

  // user
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      // { path: '/login', redirect: '/login' },
      { path: '/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },

  // app
  {
    path: '/app',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      { path: '/app', redirect: '/app/messageManagement/announcementList' },

      {
        key: "5",
        path: '/app/system',
        icon: 'setting',
        name: 'system',
        routes: [
          {
            key: "5-0",
            title: "用户管理",
            path: '/app/system/userManagement',
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
            path: '/app/system/changePWD',
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
        path: '/app/appManagement',
        icon: 'setting',
        name: 'appManagement',
        routes: [
          {
            path: '/app/appManagement/appManagement',
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
        path: '/app/redenvelopeManagement',
        icon: 'setting',
        name: 'redenvelopeManagement',
        routes: [
          {
            path: '/app/redenvelopeManagement/setting',
            name: 'setting',
            component: './redenvelopeManagement/Setting',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/redenvelopeManagement/template',
            name: 'template',
            component: './redenvelopeManagement/Template',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/redenvelopeManagement/activity',
            name: 'activity',
            component: './redenvelopeManagement/Activity',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/redenvelopeManagement/statistics',
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
        path: '/app/pointsManagement',
        icon: 'setting',
        name: 'pointsManagement',
        routes: [
          {
            path: '/app/pointsManagement/setting',
            name: 'setting',
            component: './pointsManagement/Setting',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/pointsManagement/provide',
            name: 'provide',
            component: './pointsManagement/Provide',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/pointsManagement/trade',
            name: 'trade',
            component: './pointsManagement/Trade',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/pointsManagement/withdraw',
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
        path: '/app/userManagement',
        icon: 'setting',
        name: 'userManagement',
        routes: [
          {
            path: '/app/userManagement/enterprise',
            name: 'enterprise',
            component: './userManagement/EnterpriseList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/userManagement/person',
            name: 'person',
            component: './userManagement/PersonList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/userManagement/blacklist',
            name: 'blacklist',
            component: './userManagement/BlackList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/userManagement/userStatistics',
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
        path: '/app/publishManagement',
        icon: 'setting',
        name: 'publishManagement',
        routes: [
          {
            path: '/app/publishManagement/contentManagement',
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
        path: '/app/messageManagement',
        icon: 'setting',
        name: 'messageManagement',
        routes: [
          {
            path: '/app/messageManagement/announcementList',
            name: 'announcementList',
            component: './messageManagement/AnnouncementList',
            routes: [
              {

              },
            ],
          },
          {
            path: '/app/messageManagement/messageList',
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
