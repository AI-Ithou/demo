/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        // 玻璃材质色彩系统
        glass: {
          white: 'rgba(255, 255, 255, 0.7)',
          'white-light': 'rgba(255, 255, 255, 0.5)',
          'white-heavy': 'rgba(255, 255, 255, 0.9)',
          dark: 'rgba(26, 26, 26, 0.7)',
          'dark-light': 'rgba(26, 26, 26, 0.5)',
          'dark-heavy': 'rgba(10, 10, 10, 0.9)',
        },
        // 边框色
        border: {
          light: 'rgba(229, 231, 235, 0.2)',
          DEFAULT: 'rgba(229, 231, 235, 0.3)',
          dark: 'rgba(58, 58, 58, 0.3)',
        },
      },
      // 自定义模糊效果
      backdropBlur: {
        xs: '4px',
        '2xl': '40px',
        '3xl': '60px',
      },
      // 液态阴影系统
      boxShadow: {
        'glass': '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 12px 28px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
        'glass-deep': '0 20px 48px rgba(0, 0, 0, 0.16), 0 8px 20px rgba(0, 0, 0, 0.12)',
        'glow-blue': '0 8px 32px rgba(59, 130, 246, 0.25)',
        'glow-purple': '0 8px 32px rgba(139, 92, 246, 0.25)',
        'glow-orange': '0 8px 32px rgba(249, 115, 22, 0.25)',
        'glow-green': '0 8px 32px rgba(16, 185, 129, 0.25)',
      },
      // 动画关键帧
      keyframes: {
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.2)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 16px rgba(59, 130, 246, 0.4)',
            transform: 'scale(1.05)',
          },
        },
        'ripple': {
          '0%': { 
            transform: 'scale(0)',
            opacity: '0.6',
          },
          '100%': { 
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      // 动画
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      // 过渡时长
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      // 过渡缓动函数
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'apple-in': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'apple-out': 'cubic-bezier(0.4, 0.0, 1, 1)',
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
