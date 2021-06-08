import request from '@/utils/request';

//非禁用的分类
export async function getCategory() {
  return request('/admin/category')
}
