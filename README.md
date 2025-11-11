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

1. Clone the repository
2. Open `src/index.html` in your web browser
3. The map should load centered on Lambertville, NJ at 3D angle

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

The `modelBasePath` should point to a directory with the following structure:
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

GLB files can be hosted on:
- GitHub (via raw.githubusercontent.com)
- AWS S3
- Mapbox Model Library
- Your own web server

Ensure CORS is enabled for cross-origin requests.

## Troubleshooting

**Models not loading:**
- Check that `modelBasePath` is correct and accessible
- Verify CORS is enabled on hosting server
- Check browser console for error messages

**Map not displaying:**
- Verify Mapbox access token is valid
- Check that tileset URL is correct
- Ensure you're zoomed into Lambertville area (15-22 zoom range)

**Performance issues:**
- Reduce zoom level to lower detail LOD
- Close other browser tabs
- Update graphics drivers

## License

[Add your license here]

## Contact

[Add contact info here]
