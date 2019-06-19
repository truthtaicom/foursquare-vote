import request from '../../utils/request';

export function searchVenues(params) {
  return request({
    url: '/venues/search',
    method: 'GET',
    params
  });
}
