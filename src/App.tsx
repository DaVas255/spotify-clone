import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { SearchField } from './components/elements/search-field/SearchField'
import { Track } from './components/elements/track-item/Track'
import { TRACKS } from './data/tracks.data'

function App() {
	const [searchTerm, setSearchTerm] = useQueryState('search')

	const filteredTracks = useMemo(() => {
		if (!searchTerm) return TRACKS

		return TRACKS.filter(track =>
			track.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [searchTerm])

	return (
		<>
			<SearchField
				value={searchTerm || ''}
				onChange={e => setSearchTerm(e.target.value)}
			/>

			<div className="relative">
				<img
					src="/banner.jpg"
					alt="banner"
					className="rounded-xl"
				/>

				<div className="flex items-center justify-between absolute bottom-layout left-0 w-full px-layout">
					<div>
						<h1 className="text-2xl font-semibold mb-[0.18rem] text-white">
							Daft Punk
						</h1>
						<h2 className="text-primary font-medium">6.8m listeners</h2>
					</div>
				</div>
			</div>

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
