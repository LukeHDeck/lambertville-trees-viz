# Lambertville Trees Visualization

A 3D web-based map visualization of trees in Lambertville, NJ using Mapbox GL JS and photorealistic 3D models.

## Overview

This application displays an interactive 3D map where trees are rendered as 3D models based on their size category. Each tree type (small, medium, large, extra-large) has 4 different model variants that are randomly distributed across the dataset.

## Features

- **Size-based model selection**: Trees automatically display the correct model variant based on their `type` field
- **Random model distribution**: 4 different variants per size category for visual variety
- **Random rotation**: Each tree is randomly rotated for natural appearance
- **Dynamic scaling**: Tree scale matches its size category
- **3D rendering**: Full 3D visualization with shadows and lighting
- **Responsive design**: Works on desktop and mobile devices

## Tech Stack

- **Mapbox GL JS v3.10.0**: 3D web mapping library
- **HTML5/CSS3**: Interface and styling
- **glTF/GLB**: 3D model format

## Getting Started

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Mapbox tiles and model files)

### Running Locally

The tree models are loaded with `fetch`, so the page must be served over HTTP or the browser will block the requests. Choose one of the following options:

**Using Node.js (supports `npm run dev`):**

1. Install [Node.js](https://nodejs.org/) if you do not already have it.
2. From the repository root, run `npm run dev`.
3. Open [http://localhost:8000/index.html](http://localhost:8000/index.html) in your browser.

The command runs a small static server that serves `src/index.html` at the root URL and transparently exposes the sibling `models/` directory so the GLB assets load without 404s.

**Using Python 3 (preinstalled on macOS):**

1. Change into the repository root: `cd lambertville-trees-viz`
2. Run `python3 -m http.server 8000`
3. Visit [http://localhost:8000/src/index.html](http://localhost:8000/src/index.html)

Serving from the repository root ensures the browser can reach both `src/index.html` and the top-level `models/` directory referenced by `modelBasePath`.

> **Tip:** The map now loads each GLB once and caches the model for subsequent style reloads. If you need to invalidate the cache during development, refresh the page with DevTools open and check the **Network** tab to confirm the models are requested again.

### Configuration

Edit the `CONFIG` object in `src/index.html` to customize:
```javascript
const CONFIG = {
    mapboxAccessToken: 'YOUR_TOKEN',           // Mapbox access token
    mapStyle: 'mapbox://styles/...',           // Mapbox style URL
    mapCenter: [-74.9443887, 40.3657128],      // Map center coordinates
    mapZoom: 18.46,                            // Default zoom level
    mapPitch: 60,                              // 3D pitch angle
    mapBearing: 21.6,                          // Map rotation
    tilesetUrl: 'mapbox://...',                // Tileset URL
    sourceLayerName: 'lambertville-trees-v1',  // Vector layer name
    modelBasePath: 'https://...'               // Base path to GLB files
};
```

## Model Structure

This repository includes a `models/` directory where you should place your GLB files. The directory structure is already created with the following layout:
```
models/
├── extra-large/
│   ├── extra-large-tree-1.glb
│   ├── extra-large-tree-2.glb
│   ├── extra-large-tree-3.glb
│   └── extra-large-tree-4.glb
├── large/
│   ├── large-tree-1.glb
│   ├── large-tree-2.glb
│   ├── large-tree-3.glb
│   └── large-tree-4.glb
├── medium/
│   ├── medium-tree-1.glb
│   ├── medium-tree-2.glb
│   ├── medium-tree-3.glb
│   └── medium-tree-4.glb
└── small/
    ├── small-tree-1.glb
    ├── small-tree-2.glb
    ├── small-tree-3.glb
    └── small-tree-4.glb
```

## Deployment

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repo settings (source: main branch)
3. Access at `https://username.github.io/lambertville-trees-viz/src/index.html`

### Netlify
1. Connect GitHub repo to Netlify
2. Set build command: (leave empty)
3. Set publish directory: `src`
4. Deploy

### Other Hosting
Simply upload the `src/` folder to any web server

## Data Requirements

The tileset must contain a `type` field on each feature with one of these values:
- `small`
- `medium`
- `large`
- `extra-large`

## Model File Hosting

By default, this project stores GLB model files in the `models/` directory within this repository. When deployed to GitHub, the files are accessed via `raw.githubusercontent.com`.

**For local development:**
- Place GLB files in the `models/` directory
- Set `modelBasePath: '../models'` in `src/index.html`

**For production (GitHub Pages, etc):**
- GLB files are hosted via GitHub's raw content URL
- The default configuration uses: `https://raw.githubusercontent.com/YOUR_USERNAME/lambertville-trees-viz/main/models`

**Alternative hosting options:**
If you prefer to host models separately, you can also use:
- AWS S3 (with CORS enabled)
- Mapbox Model Library
- Your own web server (with CORS enabled)

Note: Ensure CORS is enabled for cross-origin requests when hosting externally.

## Troubleshooting

**Models not loading:**
- Check that `modelBasePath` is correct and accessible
- Verify CORS is enabled on hosting server
- Check browser console for error messages such as `Failed to load model ...` (these indicate the GLB path or access token is wrong)
- Ensure your Mapbox token includes **Models: Read** in addition to Styles/Tilesets scopes so GLB assets may be fetched

**Map not displaying:**
- Verify Mapbox access token is valid
- Check that tileset URL is correct
- Ensure you're zoomed into Lambertville area (15-22 zoom range)
- If the console logs `featureNamespace ... is not associated to the same source`, make sure the token includes both the **Featuresets: Read** scope (needed by the Deckdog style) and the **Tilesets: Read** scope for the Lambertville dataset.

**Performance issues:**
- Reduce zoom level to lower detail LOD
- Close other browser tabs
- Update graphics drivers

## License

[Add your license here]

## Contact

[Add contact info here]
