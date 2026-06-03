// 상대경로는 그대로 유지 (dev: Vite 미들웨어/프록시, prod: 동일 도메인)
const DATA_BASE = ''

export function toAbsUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${DATA_BASE}${normalized}`
}
