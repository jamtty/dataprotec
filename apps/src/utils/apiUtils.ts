/**
 * fetch Response 를 안전하게 JSON 파싱합니다.
 * 서버가 HTML 오류 페이지(<!doctype …>)를 반환해도
 * "Unexpected token '<'" 대신 명확한 한국어 오류 메시지를 던집니다.
 */
export async function safeJson<T>(res: Response): Promise<T> {
  let text: string
  try {
    text = await res.text()
  } catch {
    throw new Error(`서버 응답을 읽을 수 없습니다. (HTTP ${res.status})`)
  }

  try {
    return JSON.parse(text) as T
  } catch {
    // 서버가 JSON 대신 HTML 페이지나 기타 텍스트를 반환한 경우
    // 서버가 JSON 대신 HTML 페이지나 기타 텍스트를 반환한 경우
    if (res.status === 404) throw new Error('API 경로를 찾을 수 없습니다. (404)')
    if (res.status === 500) throw new Error('서버 내부 오류가 발생했습니다. (500)')
    if (res.status === 403) throw new Error('접근이 거부되었습니다. (403)')
    if (res.status === 401) throw new Error('인증이 필요합니다. (401)')
    throw new Error(`서버가 올바르지 않은 응답을 반환했습니다. (HTTP ${res.status})`)
  }
}
