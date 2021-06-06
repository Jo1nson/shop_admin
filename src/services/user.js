import request from '@/utils/request';
export async function queryCurrent() {
  return request('/admin/user');
}

//获取用户列表
export async function getUsers(params) {
  return request('/admin/users', {params});
}
//禁用和启用用户
export async function lockUser(uid){
  return request.patch(`/admin/users/${uid}/lock`)
}

export async function addUser(params){
  return request.post('/admin/users',{params})
}

export async function showUser(editId){
  return request.get(`/admin/users/${editId}`)
}

export async function updateUser(editId,params){
  return request.put(`/admin/users/${editId}`,{params})
}
