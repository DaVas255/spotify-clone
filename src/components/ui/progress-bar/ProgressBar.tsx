import { transformDuration } from '@/utils/transform-duration'

interface Props {
	currentValue: number
	maxValue: number
	progress: number
	onSeek: (time: number) => void
	isTextDisplayed?: boolean
	isThumbDisplayed?: boolean
}

export function ProgressBar({
	currentValue,
	maxValue,
	progress,
	onSeek,
	isTextDisplayed,
	isThumbDisplayed = true
}: Props) {
	return (
		<div className="flex items-center gap-5">
			{isTextDisplayed && (
				<span className="w-10">{transformDuration(currentValue)}</span>
			)}

			<div className="bg-white/20 w-full rounded relative h-1">
				<div
					className="absolute top-0 left-0 h-full rounded bg-gradient-to-r from-primary to-secondary"
					style={{
						width: `${progress}%`
					}}
				/>

				{isThumbDisplayed && (
					<div
						className="w-3.5 h-3.5 bg-secondary rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
						style={{
							left: `${progress}%`
						}}
					/>
				)}

				<input
					type="range"
					min={0}
					max={maxValue}
					className="w-full h-2 opacity-0 absolute left-0 -top-0.5 cursor-pointer"
					onChange={e => onSeek(+e.target.value)}
					defaultValue={currentValue}
				/>
			</div>

			{isTextDisplayed && (
				<span className="text-white/50">{transformDuration(maxValue)}</span>
			)}
		</div>
	)
}
