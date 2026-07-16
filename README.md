# Still Waters — A Quiet Place of Faith

A peaceful, reflective Christian website with three experiences:

- **365 Miracles** — a daily educational devotional. Each day tells *what happened* and *how it touches the heart in Christ*, with search and era filters. The featured card always shows the miracle for today's day of the year.
- **18 Holy Sites** — an interactive photo pilgrimage through the Holy Land and Italy. Tap any photo for the full story, browse with arrow keys, or play the **Pilgrim Quiz**.
- **Hymns** — 16 instrumental hymns that play in order and then repeat from the top, with a Spotify-style player bar: play/pause, skip forward/back, heart (Liked Songs, saved in your browser), shuffle, and repeat (tap once = loop playlist, again = loop one song, again = off).

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `still-waters`).
2. Upload **everything in this folder** to the repository root (keep the folder structure: `audio/`, `images/`, `css/`, `js/`, `index.html`, `.nojekyll`).
   - Easiest: on the repo page click **Add file → Upload files**, drag the whole contents in, and commit.
   - Or with git:
     ```
     git init
     git add .
     git commit -m "Still Waters site"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/still-waters.git
     git push -u origin main
     ```
3. In the repo, go to **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, branch **main**, folder **/(root)**. Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/still-waters/`.

Notes:
- The site is fully static (no build step) and all paths are relative, so it works from any subfolder.
- Total size is ~76 MB (mostly MP3s), which is within GitHub's limits (each file is well under the 100 MB per-file cap).

## Adding "The Old Rugged Cross"

The MP3 for *The Old Rugged Cross* was missing from the original upload, so the playlist currently has 16 tracks. To add it back at position 11:

1. Save the file as `audio/11-the-old-rugged-cross.mp3`.
2. Open `js/playlist-data.js` and insert this entry at position 11 (after "Blessed Assurance"):
   ```
   {"title": "The Old Rugged Cross", "artist": "Fingerstyle Guitar — Titus Major", "src": "audio/11-the-old-rugged-cross.mp3"},
   ```
