function detransform(wb) {
    return transform(wb, {
        x: 0,
        y: 0,
        z: 0,
        deX: view.x,
        deY: view.y,
        deZ: view.z,
        degX: 360 - view.degX,
        degY: 360 - view.degY,
        deg: 360 - view.deg,
        zoom: 1 / view.zoom
    });
}