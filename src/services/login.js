import request from '@/utils/request';
//执行登录，获取token
export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

//执行退出
export async function logout() {
  return request.post('/auth/logout')
}
