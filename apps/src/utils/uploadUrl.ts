// 개발: 백엔드 API가 dataprotec.co.kr로 프록시되므로 파일도 동일 서버
// 프로덕션: 같은 도메인이므로 상대경로 사용
const DATA_BASE = import.meta.env.PROD ? '' : 'https://dataprotec.co.kr'

export function toAbsUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${DATA_BASE}${normalized}`
}
