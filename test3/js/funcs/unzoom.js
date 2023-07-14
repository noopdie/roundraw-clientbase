function unzoom() {
    view.x = 0;
    view.y = 0;
    view.deg = 0;
    view.zoom = 1;
    draw(transform(view.wb))
}