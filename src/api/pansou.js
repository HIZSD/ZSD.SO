const API_BASE = '/api'

/**
 * 搜索网盘资源
 */
export async function searchResources(params) {
  const { kw, channels, plugins, cloud_types, conc, refresh, res, src, filter } = params

  const body = { kw }
  if (channels) body.channels = channels
  if (plugins) body.plugins = plugins
  if (cloud_types) body.cloud_types = cloud_types
  if (conc) body.conc = conc
  if (refresh) body.refresh = refresh
  if (res) body.res = res
  if (src) body.src = src
  if (filter) body.filter = filter

  const token = localStorage.getItem('zhisouda-token')

  const response = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error(`搜索请求失败: ${response.status}`)
  }

  return response.json()
}

/**
 * 健康检查 - 获取可用插件和频道
 */
export async function healthCheck() {
  const response = await fetch(`${API_BASE}/health`)
  if (!response.ok) throw new Error('健康检查失败')
  return response.json()
}

/**
 * 用户登录
 */
export async function login(username, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  if (!response.ok) throw new Error('登录失败')
  return response.json()
}

/**
 * 验证 Token
 */
export async function verifyToken() {
  const token = localStorage.getItem('zhisouda-token')
  if (!token) return false

  const response = await fetch(`${API_BASE}/auth/verify`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return response.ok
}
