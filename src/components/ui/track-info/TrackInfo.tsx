import cn from 'clsx'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import type { ITrack } from '@/types/track.types'

import { playerStore } from '@/store/player.store'

interface Props {
	image: string
	title: string
	subTitle: string
	track?: ITrack
}

function MarqueeTitle({ title }: { title: string }) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [isOverflow, setIsOverflow] = useState(false)

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const checkOverflow = () => {
			setIsOverflow(el.scrollWidth > el.clientWidth)
		}

		checkOverflow()
		window.addEventListener('resize', checkOverflow)

		return () => {
			window.removeEventListener('resize', checkOverflow)
		}
	}, [title])

	return (
		<div
			className='marquee-wrapper max-w-[180px]'
			ref={containerRef}
		>
			<div
				className={cn(
					'inline-flex whitespace-nowrap',
					isOverflow && 'marquee-content'
				)}
			>
				<span>{title}</span>
				{isOverflow && <span className='ml-8'>{title}</span>}
			</div>
		</div>
	)
}

export function TrackInfo({ title, subTitle, image, track }: Props) {
	const isActive = playerStore.currentTrack?.name === track?.name

	return (
		<div className='flex items-center gap-3'>
			{track ? (
				<button
					onClick={() => {
						if (!isActive) {
							playerStore.setTrack(track)
							playerStore.play()
							return
						}

						playerStore.togglePlayPause()
					}}
					className='block relative group'
				>
					{isActive && (
						<CircularProgressbar
							value={playerStore.progress}
							className='absolute'
							strokeWidth={5}
							styles={{
								trail: { stroke: '#2E3235' },
								path: {
									stroke: 'var(--color-primary)',
									transition: 'stroke-dashoffset 0.5s ease 0s'
								}
							}}
							counterClockwise
						/>
					)}

					<div
						className={cn(
							'absolute inset-0 flex items-center justify-center group-hover:opacity-100',
							isActive ? 'opacity-100' : 'opacity-0 duration-300'
						)}
					>
						{!isActive ? (
							<Play />
						) : playerStore.isPlaying ? (
							<Pause />
						) : (
							<Play />
						)}
					</div>

					<img
						src={image}
						alt={title}
						className='w-12 h-12 rounded-full m-1.5'
					/>
				</button>
			) : (
				<img
					src={image}
					alt={title}
					className='w-12 h-12 rounded-full'
				/>
			)}

			<div>
				<div className='text-white text-lg font-medium'>
					{track ? (
						<button
							onClick={() => {
								if (!isActive) {
									playerStore.setTrack(track)
									playerStore.play()
								}
							}}
							className='hover:underline'
						>
							{title}
						</button>
					) : (
						<MarqueeTitle title={title} />
					)}
				</div>
				<div>{subTitle}</div>
			</div>
		</div>
	)
}
