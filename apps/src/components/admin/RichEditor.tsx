import { useState, useCallback, useEffect, useRef } from 'react'
import { useEditor, EditorContent, Extension, Node, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import '@/assets/css/editor.css'

// Iframe 노드 — YouTube 등 <iframe> 태그 보존
const Iframe = Node.create({
  name: 'iframe',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src:             { default: null },
      width:           { default: null },
      height:          { default: null },
      frameborder:     { default: '0' },
      allow:           { default: null },
      allowfullscreen: { default: true },
      referrerpolicy:  { default: null },
      title:           { default: null },
      style:           { default: null },
    }
  },
  parseHTML() {
    return [{ tag: 'iframe' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['iframe', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:relative;display:block;max-width:100%;margin:8px 0;'
      const iframe = document.createElement('iframe')
      Object.entries(node.attrs as Record<string, string | null>).forEach(([k, v]) => {
        if (v !== null && v !== undefined && k !== 'style') iframe.setAttribute(k, String(v))
      })
      if (node.attrs.style) iframe.style.cssText = node.attrs.style
      iframe.style.maxWidth = '100%'
      wrapper.appendChild(iframe)
      return { dom: wrapper }
    }
  },
})

// FontSize — TextStyle 기반 커스텀 Extension
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el) => el.style.fontSize || null,
            renderHTML: (attrs) =>
              attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }: any) =>
          chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }: any) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    } as any
  },
})

const FONT_SIZES = [
  '10px',
  '11px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '40px',
  '48px',
]

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const COLORS = [
  '#000000',
  '#434343',
  '#666666',
  '#999999',
  '#cccccc',
  '#ffffff',
  '#e60000',
  '#ff6600',
  '#ffff00',
  '#008000',
  '#0000ff',
  '#9900ff',
]

export default function RichEditor({ value, onChange, placeholder }: Props) {
  const [htmlMode, setHtmlMode] = useState(false)
  const [htmlSource, setHtmlSource] = useState('')
  const [showTableDialog, setShowTableDialog] = useState(false)
  const [tableRows, setTableRows] = useState('3')
  const [tableCols, setTableCols] = useState('3')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const isInternalChange = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, hardBreak: false }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            'Shift-Enter': () => this.editor.commands.setHardBreak(),
          }
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      FontSize,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true }),
      Placeholder.configure({ placeholder: placeholder ?? '내용을 입력해주세요.' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Iframe,
    ],
    content: resolveContentUrls(value || ''),
    onUpdate: ({ editor }) => {
      isInternalChange.current = true
      const html = editor.getHTML()
      onChange(html === '<p></p>' ? '' : html)
    },
    editorProps: {
      transformPastedHTML(html: string): string {
        return (
          html
            // <br>을 임시 마커로 보호 (div→p 변환 전에 처리)
            .replace(/<br\s*\/?>/gi, '[[BR]]')
            // div 블록 → p 변환 (Word, Google Docs, 다른 에디터 단락 처리)
            .replace(/<div(\s[^>]*)?>/gi, '<p$1>')
            .replace(/<\/div>/gi, '</p>')
            // 임시 마커 → <br> 복원
            .replace(/\[\[BR\]\]/g, '<br>')
            // b/i → strong/em 정규화 (일부 에디터는 b, i 태그 사용)
            .replace(/<b(\s[^>]*)?>/gi, '<strong$1>')
            .replace(/<\/b>/gi, '</strong>')
            .replace(/<i(\s[^>]*)?>/gi, '<em$1>')
            .replace(/<\/i>/gi, '</em>')
            // 불필요한 클래스 속성 제거 (Quill ql-*, Word MsoNormal 등)
            .replace(/\s*class="[^"]*"/gi, '')
            // MS Word 전용 태그·주석 제거
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/<o:[^>]*>[\s\S]*?<\/o:[^>]*>/gi, '')
            .replace(/<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '')
            .replace(/<m:[^>]*>[\s\S]*?<\/m:[^>]*>/gi, '')
        )
      },
    },
  })

  // 외부에서 value가 변경될 때(API 데이터 로딩 등) 에디터 콘텐츠 동기화
  // isInternalChange 플래그로 사용자 입력에 의한 재진입 방지
  useEffect(() => {
    if (!editor || editor.isDestroyed) return
    if (isInternalChange.current) {
      isInternalChange.current = false
      return
    }
    editor.commands.setContent(resolveContentUrls(value || ''), { emitUpdate: false })
  }, [editor, value])

  // 이미지 업로드 (다중 선택 지원)
  const handleImageInsert = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.click()
    input.onchange = async () => {
      const files = input.files
      if (!files || files.length === 0 || !editor) return
      const errors: string[] = []
      for (const file of Array.from(files)) {
        try {
          const url = await uploadEditorImage(file)
          editor.chain().focus().insertContent(`<p><img src="${url}" /></p><p><br></p>`).run()
        } catch (err) {
          errors.push(`${file.name}: ${err instanceof Error ? err.message : '업로드 실패'}`)
        }
      }
      if (errors.length > 0) {
        alert('일부 이미지 업로드에 실패했습니다.\n' + errors.join('\n'))
      }
    }
  }, [editor])

  // 드래그앤드롭 이미지 업로드
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(false)
    if (!editor) return
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    if (files.length === 0) return
    const errors: string[] = []
    for (const file of files) {
      try {
        const url = await uploadEditorImage(file)
        editor.chain().focus().insertContent(`<p><img src="${url}" /></p><p><br></p>`).run()
      } catch (err) {
        errors.push(`${file.name}: ${err instanceof Error ? err.message : '업로드 실패'}`)
      }
    }
    if (errors.length > 0) {
      alert('일부 이미지 업로드에 실패했습니다.\n' + errors.join('\n'))
    }
  }, [editor])

  // 유튜브 삽입
  const handleYoutube = useCallback(() => {
    if (!editor) return
    const input = window.prompt('YouTube URL을 입력하세요.\n(예: https://youtu.be/xxx 또는 https://www.youtube.com/watch?v=xxx)')
    if (!input) return
    let embedSrc = input.trim()
    // youtu.be/ID
    const shortMatch = embedSrc.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
    // youtube.com/watch?v=ID
    const watchMatch = embedSrc.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
    // 이미 embed URL이면 그대로
    const embedMatch = embedSrc.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
    if (shortMatch) embedSrc = `https://www.youtube.com/embed/${shortMatch[1]}`
    else if (watchMatch) embedSrc = `https://www.youtube.com/embed/${watchMatch[1]}`
    else if (!embedMatch) { alert('올바른 YouTube URL이 아닙니다.'); return }

    editor.chain().focus().insertContent({
      type: 'iframe',
      attrs: {
        src: embedSrc,
        width: '560',
        height: '315',
        frameborder: '0',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        allowfullscreen: true,
      },
    }).run()
  }, [editor])

  // 링크
  const handleLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('링크 URL을 입력하세요.', prev ?? '')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  // HTML 소스 토글
  const handleHtmlToggle = () => {
    if (!editor) return
    if (!htmlMode) {
      setHtmlSource(editor.getHTML())
      setHtmlMode(true)
    } else {
      editor.commands.setContent(htmlSource, { emitUpdate: false })
      onChange(htmlSource)
      setHtmlMode(false)
    }
  }

  // 표 삽입
  const handleInsertTable = () => {
    if (!editor) return
    const r = Math.max(1, Math.min(20, parseInt(tableRows) || 3))
    const c = Math.max(1, Math.min(20, parseInt(tableCols) || 3))
    editor.chain().focus().insertTable({ rows: r, cols: c, withHeaderRow: false }).run()
    setShowTableDialog(false)
    setTableRows('3')
    setTableCols('3')
  }

  if (!editor) return null

  const btn = (active: boolean, onClick: () => void, title: string, label: string) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`te-btn${active ? ' is-active' : ''}`}
    >
      {label}
    </button>
  )

  return (
    <div
      className={`rich_editor_outer${isDraggingOver ? ' is-dragover' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true) }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as globalThis.Node)) setIsDraggingOver(false) }}
      onDrop={handleDrop}
    >
      {/* ── 툴바 ── */}
      <div className="te-toolbar">
        {/* 헤딩 */}
        <select
          className="te-select"
          value={
            editor.isActive('heading', { level: 1 })
              ? '1'
              : editor.isActive('heading', { level: 2 })
                ? '2'
                : editor.isActive('heading', { level: 3 })
                  ? '3'
                  : '0'
          }
          onChange={(e) => {
            const v = Number(e.target.value)
            if (v === 0) editor.chain().focus().setParagraph().run()
            else
              editor
                .chain()
                .focus()
                .setHeading({ level: v as 1 | 2 | 3 })
                .run()
          }}
        >
          <option value="0">본문</option>
          <option value="1">제목1</option>
          <option value="2">제목2</option>
          <option value="3">제목3</option>
        </select>

        {/* 폰트 크기 */}
        <select
          className="te-select"
          title="글자 크기"
          value={editor.getAttributes('textStyle').fontSize ?? ''}
          onChange={(e) => {
            const v = e.target.value
            if (v === '') {
              ;(editor.chain().focus() as any).unsetFontSize().run()
            } else {
              ;(editor.chain().focus() as any).setFontSize(v).run()
            }
          }}
        >
          <option value="">크기</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s.replace('px', '')}
            </option>
          ))}
        </select>

        <span className="te-sep" />

        {/* 서식 */}
        {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), '굵게', 'B')}
        {btn(
          editor.isActive('italic'),
          () => editor.chain().focus().toggleItalic().run(),
          '기울임',
          'I',
        )}
        {btn(
          editor.isActive('underline'),
          () => editor.chain().focus().toggleUnderline().run(),
          '밑줄',
          'U',
        )}
        {btn(
          editor.isActive('strike'),
          () => editor.chain().focus().toggleStrike().run(),
          '취소선',
          'S',
        )}

        <span className="te-sep" />

        {/* 글자색 */}
        <div className="te-color-wrap">
          <button
            type="button"
            className="te-btn te-color-btn"
            title="글자색"
            onClick={() => setShowColorPicker((v) => !v)}
          >
            <span className="te-color-label">A</span>
            <span
              className="te-color-bar"
              style={{ background: editor.getAttributes('textStyle').color ?? '#000' }}
            />
          </button>
          {showColorPicker && (
            <div className="te-color-picker" onMouseLeave={() => setShowColorPicker(false)}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="te-color-swatch"
                  style={{ background: c }}
                  onClick={() => {
                    editor.chain().focus().setColor(c).run()
                    setShowColorPicker(false)
                  }}
                />
              ))}
              <button
                type="button"
                className="te-color-swatch te-color-unset"
                onClick={() => {
                  editor.chain().focus().unsetColor().run()
                  setShowColorPicker(false)
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <span className="te-sep" />

        {/* 정렬 */}
        {btn(
          editor.isActive({ textAlign: 'left' }),
          () => editor.chain().focus().setTextAlign('left').run(),
          '좌측',
          '◀',
        )}
        {btn(
          editor.isActive({ textAlign: 'center' }),
          () => editor.chain().focus().setTextAlign('center').run(),
          '가운데',
          '≡',
        )}
        {btn(
          editor.isActive({ textAlign: 'right' }),
          () => editor.chain().focus().setTextAlign('right').run(),
          '우측',
          '▶',
        )}

        <span className="te-sep" />

        {/* 리스트 */}
        {btn(
          editor.isActive('bulletList'),
          () => editor.chain().focus().toggleBulletList().run(),
          '글머리',
          '•',
        )}
        {btn(
          editor.isActive('orderedList'),
          () => editor.chain().focus().toggleOrderedList().run(),
          '번호',
          '1.',
        )}

        <span className="te-sep" />

        {/* 링크·이미지 */}
        {btn(editor.isActive('link'), handleLink, '링크', '🔗')}
        <button type="button" className="te-btn" title="이미지 업로드" onClick={handleImageInsert}>
          🖼
        </button>
        <button type="button" className="te-btn" title="유튜브 삽입" onClick={handleYoutube}>
          ▶ YouTube
        </button>

        <span className="te-sep" />

        {/* 표 관련 */}
        <button
          type="button"
          className="te-btn"
          disabled={htmlMode}
          title="표 삽입"
          onClick={() => setShowTableDialog(true)}
        >
          표
        </button>
        {btn(false, () => editor.chain().focus().addColumnAfter().run(), '열 추가', '+열')}
        {btn(false, () => editor.chain().focus().addRowAfter().run(), '행 추가', '+행')}
        {btn(false, () => editor.chain().focus().deleteColumn().run(), '열 삭제', '-열')}
        {btn(false, () => editor.chain().focus().deleteRow().run(), '행 삭제', '-행')}
        {btn(false, () => editor.chain().focus().deleteTable().run(), '표 삭제', '🗑표')}
        {btn(false, () => editor.chain().focus().mergeCells().run(), '셀 병합', '⊞')}
        {btn(false, () => editor.chain().focus().splitCell().run(), '셀 분리', '⊟')}

        <span className="te-sep" />

        {/* HTML 소스 */}
        <button
          type="button"
          className={`te-btn${htmlMode ? ' is-active' : ''}`}
          title="HTML 소스 편집"
          onClick={handleHtmlToggle}
        >
          HTML
        </button>
      </div>

      {/* ── 에디터 본문 ── */}
      {htmlMode ? (
        <textarea
          className="html_source_area"
          value={htmlSource}
          onChange={(e) => {
            setHtmlSource(e.target.value)
            onChange(e.target.value)
          }}
        />
      ) : (
        <EditorContent editor={editor} className="te-content" />
      )}

      {/* ── 표 삽입 다이얼로그 ── */}
      {showTableDialog && (
        <div className="table_dialog_overlay" onClick={() => setShowTableDialog(false)}>
          <div className="table_dialog_box" onClick={(e) => e.stopPropagation()}>
            <h4 className="table_dialog_title">표 삽입</h4>
            <div className="table_dialog_fields">
              <label>
                <span>행</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(e.target.value)}
                />
              </label>
              <span className="table_dialog_x">×</span>
              <label>
                <span>열</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableCols}
                  onChange={(e) => setTableCols(e.target.value)}
                />
              </label>
            </div>
            <div className="table_dialog_btns">
              <button type="button" className="btn_tbl_insert" onClick={handleInsertTable}>
                삽입
              </button>
              <button
                type="button"
                className="btn_tbl_cancel"
                onClick={() => setShowTableDialog(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
