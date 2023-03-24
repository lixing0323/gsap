import { request } from '@/utils/request'

export function getViewCount() {
  return request({
    url: '/view_count',
    method: 'get',
  })
}

export function postViewCount() {
  return request.post('/view_count')
}

export function getComments(offset, count = 10) {
  return request({
    url: 'comments',
    method: 'get',
    params: { offset: offset, count: count },
  })
}

export function postComment(content, email = '') {
  return request({
    url: 'comments',
    method: 'post',
    data: { content: content, email: email },
  })
}
