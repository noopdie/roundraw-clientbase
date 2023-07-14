function detransform(wb) {
    return transform(wb, {
        x: 0,
        y: 0,
        deX: view.x,
        deY: view.y,
        deg: 360 - view.deg,
        zoom: 1 / view.zoom
    });
}