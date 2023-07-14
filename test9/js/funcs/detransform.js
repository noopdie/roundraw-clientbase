function detransform(wb) {
    return transform(wb, {
        x: 0,
        y: 0,
        z: 0,
        deX: view.x,
        deY: view.y,
        deZ: view.z,
        degX: - view.degX,
        degY: - view.degY,
        deg: 360 - view.deg,
        zoom: 1 / view.zoom
    });
}