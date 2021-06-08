import request from '@/utils/request';
export async function queryCurrent() {
  return request('/admin/user');
}

//获取商品列表
export async function getGoods(params) {
  return request('/admin/goods', {params});
}
//上架和下架
export async function isOn(goodsId){
  return request.patch(`/admin/goods/${goodsId}/on`)
}


//是否推荐
export async function isRecommend(goodsId){
  return request.patch(`/admin/goods/${goodsId}/recommend`)
}

export async function addGoods(params){
  return request.post('/admin/goods',{params})
}

export async function showGoods(editId){
  return request.get(`/admin/goods/${editId}?include=category`)
}

export async function updateGoods(editId,params){
  return request.put(`/admin/goods/${editId}`,{params})
}
