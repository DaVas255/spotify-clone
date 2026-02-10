import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { SearchField } from './components/elements/search-field/SearchField'
import { Track } from './components/elements/track-item/Track'
import { DynamicWaves } from './components/elements/WaveformVisualizer/DynamicWaves'
import { TRACKS } from './data/tracks.data'
import { playlistStore } from './store/playlist.store'

function App() {
	const [searchTerm, setSearchTerm] = useQueryState('search')
	const [playlistName] = useQueryState('playlist')

	const filteredTracks = useMemo(() => {
		const playlistTracks =
			playlistName && playlistStore.playlists.length
				? playlistStore.playlists.find(p => p.name === playlistName)?.tracks ||
				[]
				: null

		const base = playlistTracks
			? TRACKS.filter(track => playlistTracks.includes(track.name))
			: TRACKS

		if (!searchTerm) return base

		return base.filter(track =>
			track.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [playlistName, searchTerm])

	return (
		<>
			<SearchField
				value={searchTerm || ''}
				onChange={e => setSearchTerm(e.target.value)}
			/>

			<DynamicWaves />

			<div className="mt-5">
				{filteredTracks.map(track => (
					<Track
						key={track.name}
						track={track}
					/>
				))}
			</div>
		</>
	)
}

export default App
