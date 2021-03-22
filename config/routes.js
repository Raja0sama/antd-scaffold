export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './auth/user/login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './auth/user/register',
          },
          {
            name: 'resetPassoword',
            path: '/user/resetPassword',
            component: './auth/user/resetPassword',
          }
        ],
      },

      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                name: 'Home',
                icon: 'smile',
                component: './app/home/index',
                authority: ['admin', 'user'],
              },
              {
                path: '/MyWebinars',
                name: 'My Webinars',
                icon: 'videoCamera',
                component: './app/myWebinars/index',
                authority: ['admin', 'user'],
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
