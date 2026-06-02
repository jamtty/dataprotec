const SERVER_BASE = import.meta.env.PROD
  ? 'https://www.dataprotec.co.kr'
  : 'http://localhost'

export function toAbsUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${SERVER_BASE}${path.startsWith('/') ? '' : '/'}${path}`
}
