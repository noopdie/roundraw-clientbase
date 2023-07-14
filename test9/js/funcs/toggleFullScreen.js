function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        get('fullscreen').style.backgroundImage = 'url(img/fullscreenexit.svg)';
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        get('fullscreen').style.backgroundImage = 'url(img/fullscreen.svg)';
    }
}