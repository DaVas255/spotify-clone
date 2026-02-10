# stream-spotify-clone

Мини‑клон Spotify: список треков + поиск + плеер (play/pause, prev/next, seek, volume) + избранное и плейлисты (localStorage) + lyrics с таймкодами.

## Технологии

- **React 19** + **TypeScript**
- **Vite 7** (dev/build)
- **Tailwind CSS v4** (через `@tailwindcss/vite`) + **Sass/SCSS modules**
- **MobX** (`mobx`, `mobx-react-lite`) — стор плеера/избранного/плейлистов
- **nuqs** — состояние в query‑string (поиск `?q=...`)
- **lucide-react** — иконки
- Дополнительно: `clsx`, `dayjs`, `react-circular-progressbar`, `jsmediatags`
- **ESLint** (линтинг)

## Структура проекта (ключевое)

- `public/` — статика
  - `public/audio/` — mp3
  - `public/cover/` — обложки
  - `public/banner.jpg` — баннер
- `src/data/` — статические данные (`tracks`, `artists`, `lyrics`, меню)
- `src/store/` — MobX‑сторы
  - `player.store.ts` — состояние плеера
  - `favorite.store.ts` — избранное (persist в `localStorage`)
  - `playlist.store.ts` — плейлисты (persist в `localStorage`)
- `src/components/`
  - `layout/` — сетка приложения + сайдбары + нижний плеер
  - `elements/` — плеер/поиск/трек‑item
  - `ui/` — переиспользуемые UI‑компоненты (progress bar, track info и т.д.)
- `src/App.tsx` — главный экран (поиск + список треков)
- `src/main.tsx` — точка входа
- `vite.config.ts` — Vite + алиас `@` → `src`

## Запуск

### Установка зависимостей

```bash
npm install
```

### Dev‑режим

```bash
npm run dev
```

### Сборка

```bash
npm run build
```

### Preview собранного билда

```bash
npm run preview
```

### Линт

```bash
npm run lint
```
