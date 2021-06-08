import request from '@/utils/request'
// 获取oss上传策略和签名
export function ossConfig() {
  return request('/auth/oss/token')
}
