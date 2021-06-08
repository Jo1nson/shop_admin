export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './Login',
          },
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
                redirect:'/dashboard'
              },
              {
                path: '/dashboard',
                component: '@/pages/DashBoard',
                name:'dashboard',
                icon:'PieChartOutlined'
              },
              {
                path: '/user',
                component: '@/pages/User',
                name:'user',
                icon:'UserOutlined'
              },
              {
                path: '/goods',
                component: '@/pages/Goods',
                name:'goods',
                icon:'ShoppingOutlined'
              },
              {
                component: './404',
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
