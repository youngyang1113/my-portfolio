import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] dark:bg-dark text-gray-900 dark:text-gray-100 px-6">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-6">😵</div>
            <h1 className="text-2xl font-bold mb-3">页面出了点问题</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              抱歉，页面渲染时遇到了错误。你可以尝试刷新页面，或返回首页。
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                刷新页面
              </button>
              <a
                href="/"
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300"
              >
                返回首页
              </a>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-8 p-4 bg-red-50 dark:bg-white/5 rounded-lg text-left text-xs text-red-500 dark:text-red-400 overflow-auto max-h-48 border border-red-100 dark:border-red-500/20">
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack}
              </pre>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
