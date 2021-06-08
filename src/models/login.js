import { history } from 'umi';
import { fakeAccountLogin, logout } from '@/services/login';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
  },
  effects: {
    *login({ payload }, { call, put }) {
      // 发送请求执行登录
      const response = yield call(fakeAccountLogin, payload);

      if(response.status === undefined){
        message.success('登录成功！')
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully
        history.replace('/');
      }
    },

    // 退出登录
    *logout(_,{call}) {
      const load = message.loading('退出中...')
      // 请求api，退出登录
      const response = yield call(logout)

      // 判断是否请求成功
      if(response.status === undefined){
        // 删除本地存储的token和userInfo
        localStorage.removeItem('access_token')
        localStorage.removeItem('userInfo')

        message.success('退出成功！')
        // 重定向
        history.replace('/login')
      }
      load()
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // 将token存入localStorage
      localStorage.setItem('access_token', payload.access_token)
      return { ...state};
    },
  },
};
export default Model;
