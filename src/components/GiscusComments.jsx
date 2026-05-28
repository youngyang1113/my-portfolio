import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { giscusConfig, isGiscusConfigured } from '../config/giscus'

/**
 * 嵌入 Giscus 评论/留言（数据存于 GitHub Discussions，适合 GitHub Pages）
 * 提交后 Giscus 会自动刷新列表，最新讨论在上方
 */
export default function GiscusComments({ className = '' }) {
  const containerRef = useRef(null)
  const location = useLocation()
  const configured = isGiscusConfigured()

  useEffect(() => {
    const container = containerRef.current
    if (!container || !configured) return

    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', giscusConfig.repo)
    script.setAttribute('data-repo-id', giscusConfig.repoId)
    script.setAttribute('data-category', giscusConfig.category)
    script.setAttribute('data-category-id', giscusConfig.categoryId)
    script.setAttribute('data-mapping', giscusConfig.mapping)
    script.setAttribute('data-strict', giscusConfig.strict)
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
    script.setAttribute('data-input-position', giscusConfig.inputPosition)
    script.setAttribute('data-theme', giscusConfig.theme)
    script.setAttribute('data-lang', giscusConfig.lang)
    script.setAttribute('data-loading', giscusConfig.loading)
    script.crossOrigin = 'anonymous'
    script.async = true

    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [configured, location.pathname])

  if (!configured) {
    return (
      <div
        className={`rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm leading-relaxed text-amber-100/90 ${className}`}
        role="status"
      >
        <p className="font-medium text-amber-50">留言板尚未连接 Giscus</p>
        <p className="mt-2 text-amber-100/80">
          请在 <code className="rounded bg-black/30 px-1.5 py-0.5">src/config/giscus.js</code> 或{' '}
          <code className="rounded bg-black/30 px-1.5 py-0.5">.env</code> 中填写仓库 ID，详见{' '}
          <code className="rounded bg-black/30 px-1.5 py-0.5">docs/GUESTBOOK_SETUP.md</code>。
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`giscus-wrapper min-h-[200px] ${className}`}
      aria-label="公开留言评论区"
    />
  )
}
