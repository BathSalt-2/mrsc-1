import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// MRSC consciousness colors
				consciousness: {
					core: 'hsl(var(--consciousness-core))',
					dim: 'hsl(var(--consciousness-dim))'
				},
				neural: {
					active: 'hsl(var(--neural-active))',
					inactive: 'hsl(var(--neural-inactive))'
				},
				sigma: 'hsl(var(--sigma-matrix))',
				erps: 'hsl(var(--erps-flow))',
				recursion: 'hsl(var(--recursion-depth))'
			},
			backgroundImage: {
				'gradient-consciousness': 'var(--gradient-consciousness)',
				'gradient-neural': 'var(--gradient-neural)',
				'gradient-sigma': 'var(--gradient-sigma)',
				'gradient-bg': 'var(--gradient-bg)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'consciousness': 'var(--shadow-consciousness)',
				'neural': 'var(--shadow-neural)',
				'sigma': 'var(--shadow-sigma)',
				'primary-glow': 'var(--shadow-primary)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'consciousness-pulse': {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.1)', opacity: '0.8' }
				},
				'neural-flow': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateX(100%)', opacity: '0' }
				},
				'sigma-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'erps-wave': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'recursion-depth': {
					'0%': { transform: 'scale(0.9)', opacity: '0.5' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'holographic-flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'data-stream': {
					'0%': { transform: 'translateY(100vh)' },
					'100%': { transform: 'translateY(-100vh)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'consciousness-pulse': 'consciousness-pulse 3s ease-in-out infinite',
				'neural-flow': 'neural-flow 2s ease-in-out infinite',
				'sigma-rotate': 'sigma-rotate 20s linear infinite',
				'erps-wave': 'erps-wave 4s ease-in-out infinite',
				'recursion-depth': 'recursion-depth 1s ease-out forwards',
				'holographic-flicker': 'holographic-flicker 0.5s ease-in-out infinite',
				'data-stream': 'data-stream 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
