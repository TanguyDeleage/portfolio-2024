// Writes a poster next to every case-study video: intro.mp4 -> intro.poster.webp,
// taken from the video's first frame at full size. The browser shows the poster
// until the video starts, so a first-frame poster makes that swap invisible.
// ProjectPage and CaseFigure pick these up by name (see src/utils/videoPoster.js).
//
// Needs ffmpeg and cwebp (brew install ffmpeg webp). Run: npm run posters
// Skips posters that are newer than their video; pass --force to redo them all.

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import process from 'node:process'

const ROOT = 'public/assets/images/projects'
const VIDEO = /\.(mp4|webm)$/i
const force = process.argv.includes('--force')

function videos(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return videos(path)
    return VIDEO.test(entry.name) ? [path] : []
  })
}

const tmp = mkdtempSync(join(tmpdir(), 'posters-'))
let made = 0

try {
  for (const video of videos(ROOT)) {
    const poster = video.replace(VIDEO, '.poster.webp')
    if (!force && existsSync(poster) && statSync(poster).mtimeMs >= statSync(video).mtimeMs) continue

    const frame = join(tmp, 'frame.png')
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', video, '-frames:v', '1', frame])
    execFileSync('cwebp', ['-quiet', '-q', '82', '-m', '6', frame, '-o', poster])
    console.log(`${poster} (${Math.round(statSync(poster).size / 1024)} KB)`)
    made++
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

console.log(made ? `${made} poster(s) written` : 'Posters up to date')
