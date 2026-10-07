// src/api/client.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined


export const api = axios.create({
  baseURL,
  withCredentials: true,
  paramsSerializer: { indexes: null },
})

let onAuthFailure: (() => void) | null = null
// 토큰 재발급 실패 시 실행할 콜백 등록
export const setAuthFailureHandler = (fn: () => void) => { onAuthFailure = fn }

const bare = axios.create({ baseURL, withCredentials: true })
let refreshing: Promise<void> | null = null

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined
    const isAuthCall = original?.url?.includes('/api/auth/')

    if (error.response?.status === 401 && original && !original._retry && !isAuthCall) {
      original._retry = true
      try {
        refreshing ??= bare.post('/api/auth/reissue').then(() => undefined).finally(() => { refreshing = null })
        await refreshing
        return api(original)
      } catch {
        onAuthFailure?.()
      }
    }
    return Promise.reject(error)
  },
)

// JSON(Blob)과 파일을 담은 multipart FormData 생성
export function buildFormData(
  json: { key: string; value: unknown },
  file?: { key: string; value?: File | Blob | null },
): FormData {
  const fd = new FormData()
  fd.append(json.key, new Blob([JSON.stringify(json.value)], { type: 'application/json' }))
  if (file?.value) fd.append(file.key, file.value)
  return fd
}
