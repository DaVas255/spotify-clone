import { makeAutoObservable } from 'mobx'

import type { IPlayerLocalStorage } from '@/types/storage.types'
import type { ITrack } from '@/types/track.types'

import { TRACKS } from '@/data/tracks.data'

class MusicPlayerStore {
	isPlaying: boolean = false
	currentTrack: ITrack | null = null
	volume: number = 85
	currentTime: number = 0
	progress: number = 0

	constructor() {
		makeAutoObservable(this)
		this.loadFromLocalStorage()
	}

	private loadFromLocalStorage() {
		try {
			const savedData = localStorage.getItem('music-player-state')
			if (savedData) {
				const data: IPlayerLocalStorage = JSON.parse(savedData)

				this.volume = data.volume

				if (data.currentTrackIndex !== undefined) {
					const trackIndex = Math.max(
						0,
						Math.min(data.currentTrackIndex, TRACKS.length - 1)
					)
					this.currentTrack = TRACKS[trackIndex]
				} else {
					this.currentTrack = TRACKS[0]
				}
			} else {
				this.currentTrack = TRACKS[0]
			}
		} catch (error) {
			console.error('Error loading player state from localStorage:', error)
			this.currentTrack = TRACKS[0]
		}
	}

	private saveToLocalStorage() {
		try {
			const data: IPlayerLocalStorage = {
				volume: this.volume,
				currentTrackIndex: this.currentTrack
					? TRACKS.findIndex(track => track.name === this.currentTrack?.name)
					: 0
			}
			localStorage.setItem('music-player-state', JSON.stringify(data))
		} catch (error) {
			console.error('Error saving player state to localStorage:', error)
		}
	}

	setTrack(track: ITrack | null) {
		this.currentTrack = track
		this.currentTime = 0
		this.progress = 0
		if (track) {
			this.saveToLocalStorage()
		}
	}

	togglePlayPause() {
		this.isPlaying = !this.isPlaying
	}

	play() {
		this.isPlaying = true
	}

	pause() {
		this.isPlaying = false
	}

	seek(time: number) {
		this.currentTime = time
		this.progress = (time / (this.currentTrack?.duration || 1)) * 100
	}

	setVolume(volume: number) {
		this.volume = volume
		this.saveToLocalStorage()
	}

	changeTrack(type: 'prev' | 'next') {
		if (!this.currentTrack) return

		const currentIndex = TRACKS.findIndex(
			track => track.name === this.currentTrack?.name
		)

		const nextIndex =
			type === 'next'
				? (currentIndex + 1) % TRACKS.length
				: (currentIndex - 1 + TRACKS.length) % TRACKS.length

		this.setTrack(TRACKS[nextIndex])
		this.currentTime = 0
		this.progress = 0
	}
}

export const playerStore = new MusicPlayerStore()
