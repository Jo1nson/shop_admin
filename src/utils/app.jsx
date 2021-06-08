//动态添加路由

export function patchRoutes({routes}){
  routes[0]['routes'][1]['routes'][0]['routes'].unshift(
    {
      path: '/user2',
      component: '@/pages/User',
      name:'user',
      icon:'UserOutlined'
    },
  )
}
