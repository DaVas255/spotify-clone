import { Play } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import { playerStore } from '@/store/player.store'

import styles from './Lyrics.module.scss'
import { LYRICS } from '@/data/lyrics.data'

export function Lyrics() {
	const lyric = LYRICS.find(
		lyric => lyric.trackName === playerStore.currentTrack?.name
	)

	return (
		<div className={styles.lyrics}>
			{lyric?.lines.map((line, index) => (
				<Fragment key={index}>
					{line.section && <br />}
					{line.section && <div>[ {line.section} ]</div>}

					<button
						className={
							playerStore.currentTime === line.time ? styles.active : undefined
						}
						onClick={() => {
							playerStore.seek(line.time)
						}}
					>
						<p>
							{playerStore.currentTime === line.time && (
								<Play
									fill='var(--color-primary)'
									className={styles.icon}
									size={10}
								/>
							)}

							{line.text}
						</p>
					</button>
				</Fragment>
			))}
		</div>
	)
}
