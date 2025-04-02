import { useState, useCallback, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'

const api = axios.create({
  baseURL: '/api'
})

export function useApi(): AxiosInstance {
  return api
}

export function useData<T>(uri: string): [T | null, () => Promise<T>] {
  const api = useApi()
  const [data, setData] = useState<T | null>(null)

  const get = useCallback(async () => {
    try {
      const res = await api.get(uri)
      setData(res.data)
      return res.data
    } catch (err) {
      setData(null)
      throw err
    }
  }, [uri])

  useEffect(() => {
    get()
  }, [])

  return [data, get]
}
