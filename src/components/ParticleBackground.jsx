import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

/** 叠在渐变之上，背景透明以透出底层。留言页（/message）开启窗口级点击排斥，形成「按动」粒子反馈。 */
export default function ParticleBackground() {
  const { pathname } = useLocation()
  const messagePage = pathname === '/message'

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 90,
      interactivity: {
        detectsOn: 'window',
        events: {
          onClick: {
            enable: messagePage,
            mode: 'repulse',
          },
          onHover: {
            enable: false,
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.35,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          value: '#6b5a8c',
        },
        links: {
          color: '#5c4d78',
          distance: 140,
          enable: true,
          opacity: messagePage ? 0.18 : 0.12,
          width: 0.8,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: false,
          speed: messagePage ? 1.35 : 1.2,
          straight: false,
        },
        number: {
          density: { enable: true, area: 900 },
          value: messagePage ? 72 : 64,
        },
        opacity: {
          value: { min: 0.12, max: messagePage ? 0.45 : 0.38 },
        },
        shape: { type: 'circle' },
        size: {
          value: { min: 1, max: 3.2 },
        },
      },
      detectRetina: true,
    }),
    [messagePage],
  )

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      key={messagePage ? 'particles-msg' : 'particles-default'}
      className="particles-canvas pointer-events-none fixed inset-0 z-[1]"
      options={options}
    />
  )
}
