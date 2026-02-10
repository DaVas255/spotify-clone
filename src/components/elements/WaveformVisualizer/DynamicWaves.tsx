import { useCallback, useEffect, useRef } from 'react'

export function DynamicWaves() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationRef = useRef<number>(0)
	const timeRef = useRef<number>(0)
	const speed = 0.3

	const hexToRgba = (hex: string, alpha: number): string => {
		const r = parseInt(hex.slice(1, 3), 16)
		const g = parseInt(hex.slice(3, 5), 16)
		const b = parseInt(hex.slice(5, 7), 16)
		return `rgba(${r}, ${g}, ${b}, ${alpha})`
	}

	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		canvas.width = canvas.clientWidth
		canvas.height = canvas.clientHeight
	}, [])

	const drawDynamicWaves = useCallback(
		(ctx: CanvasRenderingContext2D, time: number) => {
			const width = ctx.canvas.width
			const height = ctx.canvas.height

			ctx.fillStyle = 'rgba(18, 18, 18, 0.1)'
			ctx.fillRect(0, 0, width, height)

			const centerY = height / 2

			for (let layer = 0; layer < 5; layer++) {
				const amplitude = 30 + layer * 8
				const frequency = 0.005 + layer * 0.002
				const layerSpeed = speed * (1 + layer * 0.2)
				const color =
					layer === 0
						? '#1DB954'
						: layer === 1
							? '#1ed760'
							: layer === 2
								? '#91e9b3'
								: layer === 3
									? '#b5f0ce'
									: '#ffffff'
				const opacity = 0.8 - layer * 0.15

				const waveFunction = (x: number): number => {
					return (
						Math.sin(x * frequency + time * layerSpeed) * amplitude +
						Math.sin(x * frequency * 2.3 + time * layerSpeed * 1.7) *
							(amplitude * 0.6) +
						Math.sin(x * frequency * 3.1 + time * layerSpeed * 0.9) *
							(amplitude * 0.3) +
						Math.sin(x * 0.001 + time * 0.2) * 5
					)
				}

				ctx.beginPath()
				for (let x = 0; x <= width; x += 2) {
					const y = centerY + waveFunction(x)
					if (x === 0) ctx.moveTo(x, y)
					else ctx.lineTo(x, y)
				}

				for (let x = width; x >= 0; x -= 2) {
					const y = centerY - waveFunction(x) * 0.8
					ctx.lineTo(x, y)
				}

				ctx.closePath()

				const gradient = ctx.createLinearGradient(0, 0, 0, height)
				gradient.addColorStop(0, hexToRgba(color, opacity * 0.3))
				gradient.addColorStop(0.5, hexToRgba(color, opacity * 0.1))
				gradient.addColorStop(1, hexToRgba(color, 0.02))

				ctx.fillStyle = gradient
				ctx.fill()

				ctx.beginPath()
				for (let x = 0; x <= width; x += 2) {
					const y = centerY + waveFunction(x)
					if (x === 0) ctx.moveTo(x, y)
					else ctx.lineTo(x, y)
				}

				const lineGradient = ctx.createLinearGradient(0, 0, width, 0)
				lineGradient.addColorStop(0, hexToRgba(color, 0))
				lineGradient.addColorStop(0.3, hexToRgba(color, opacity))
				lineGradient.addColorStop(0.7, hexToRgba(color, opacity))
				lineGradient.addColorStop(1, hexToRgba(color, 0))

				ctx.strokeStyle = lineGradient
				ctx.lineWidth = 2 + layer * 0.5
				ctx.lineCap = 'round'
				ctx.stroke()
			}

			for (let i = 0; i < 3; i++) {
				const x = ((time * 50 + i * 1000) % (width + 200)) - 100
				const y = centerY + Math.sin(time * 0.5 + i) * 100

				ctx.beginPath()
				ctx.arc(x, y, 2 + Math.sin(time + i) * 1.5, 0, Math.PI * 2)
				ctx.fillStyle = hexToRgba('#1DB954', 0.6)
				ctx.fill()
			}
		},
		[speed]
	)

	const animate = useCallback(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		drawDynamicWaves(ctx, timeRef.current)
		timeRef.current += 0.016

		animationRef.current = requestAnimationFrame(animate)
	}, [drawDynamicWaves])

	useEffect(() => {
		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)

		animate()

		return () => {
			window.removeEventListener('resize', resizeCanvas)
			cancelAnimationFrame(animationRef.current)
		}
	}, [animate, resizeCanvas])

	return (
		<canvas
			ref={canvasRef}
			className='relative h-80 w-full mt-8 rounded-lg'
		/>
	)
}
