import axios, { AxiosError, AxiosResponse } from 'axios'
import { defaults, isObject, isEmpty } from 'lodash'
import { IApiMiddleware } from './types'

const { REACT_APP_BASE_URL: baseURL } = process.env

export default function apiMiddleware({
  url = '/',
  method = 'GET',
  data = {},
  headers = {},
  transform = true,
  auth,
}: IApiMiddleware): Promise<string> {
  defaults(headers, {
    'Content-Language': 'en',
    Accept: 'application/json; charset=UTF-8',
    'Content-Type': 'application/json; charset=UTF-8',
  })

  return axios({
    baseURL,
    method,
    url,
    headers,
    params: method === 'GET' && isObject(data) && !isEmpty(data) ? data : {},
    data: transform ? JSON.stringify(data) : data,
    auth,
  })
    .then((resp: AxiosResponse) => {
      if (!!resp?.data?.error) {
        const message = resp.data.error
        const error: Error = new Error(message)
        error.message = message || ''
        throw error
      }
      if (resp.status >= 400 || resp.status === 500) {
        throw new Error(resp.data)
      }

      return resp.data
    })
    .catch((er: AxiosError) => {
      const _error = er?.response?.data?.message || er?.response?.data?.error || er?.response?.data || er?.message
      if (!!er.message) {
        const error = new Error(_error)
        error.message = _error
        throw error
      }
    })
}
