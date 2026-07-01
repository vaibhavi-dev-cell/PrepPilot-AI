export const API_BASE_URL = '/api/v1'

export function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path}`
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('prepPilotToken')
  const headers = {
    ...options.headers,
  } as HeadersInit

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
