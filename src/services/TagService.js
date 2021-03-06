'use strict'
import axios from 'axios'
import config from './config'

const client = axios.create({
  baseURL: config.baseURL
})

const endpoint = '/tags'

export default {
  list: () => {
    return client.get(endpoint)
  },
  page: (offset, limit, sortBy, order) => {
    let url = endpoint
    if (limit && offset) {
      url = url + '?limit=' + limit + '&offset=' + offset
    } else if (limit) {
      url = url + '?limit=' + limit
    }
    return client.get(url + '&sort_by=' + (sortBy || 'name') + '&sort_order=' + (order || 'ASC'))
  },
  create: (tag) => {
    return client.post(endpoint, tag)
  },
  update: (id, tag) => {
    return client.put(endpoint + '/' + id, tag)
  },
  delete: (id) => {
    return client.delete(endpoint + '/' + id)
  }
}
