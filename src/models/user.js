import { queryCurrent, query as queryUsers } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
//获取当前登录用户数据
    *fetchCurrent(_, { call, put }) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if(!userInfo) {
        userInfo = yield call(queryCurrent);
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
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
