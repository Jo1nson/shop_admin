import { queryCurrent } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
     // 获取当前登录用户数据
    *fetchCurrent(_, { call, put }) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if(!userInfo) {
        userInfo = yield call(queryCurrent);
        // 判断是否获取到用户信息
        if(userInfo.id !== undefined){
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
        }
      }

      yield put({
        type: 'saveCurrentUser',
        payload: userInfo,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
