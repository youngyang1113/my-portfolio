import './DynamicGradientBackground.css'
import { useTheme } from '../context/ThemeContext'

/**
 * 全屏动态渐变背景：深紫 / 霓虹粉过渡、柔光、流动动画、轻玻璃雾面。
 * 纯装饰层，无文本，无交互。
 * Light mode: 隐藏深色背景，显示柔和的浅色渐变。
 */
export default function DynamicGradientBackground() {
  const { theme } = useTheme()

  return (
    <div className={`dg-root ${theme === 'light' ? 'dg-root--light' : ''}`} aria-hidden>
      <div className="dg-base" />
      <div className="dg-flow dg-flow--a" />
      <div className="dg-flow dg-flow--b" />
      <div className="dg-flow dg-flow--c" />
      <div className="dg-orb dg-orb--1" />
      <div className="dg-orb dg-orb--2" />
      <div className="dg-orb dg-orb--3" />
      <div className="dg-glass" />
      <div className="dg-grain" />
      <div className="dg-vignette" />
      {/* Light mode: 柔和渐变覆盖层 */}
      {theme === 'light' && <div className="dg-light-overlay" />}
    </div>
  )
}
