window.addEventListener('resize', function (event) {
    tc.width = (innerWidth * devicePixelRatio);
    tc.height = (innerHeight * devicePixelRatio);
    c.width = (innerWidth * devicePixelRatio);
    c.height = (innerHeight * devicePixelRatio);
    draw(transform(view.wb))
}, true);