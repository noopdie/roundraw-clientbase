document.body.onkeydown = function (e) {
    if (!readings.input) {
        if (e.ctrlKey) {
            if (e.keyCode == 90) back();
            if (e.keyCode == 89) forward();
        } else {
            if (e.keyCode == 49) setBrush('pencil');
            if (e.keyCode == 50) setBrush('eraser');
            if (e.keyCode == 51) setBrush('picker');
            if (e.keyCode == 52) setBrush('fill');
            if (e.keyCode == 53) setBrush('select');
            if (e.keyCode == 54) setBrush('line');
            if (e.keyCode == 55) setBrush('circle');
            if (e.keyCode == 56) setBrush('polygon');
            if (e.keyCode == 57) setBrush('rect');
            if (e.keyCode == 32 && (readings.leftClick || readings.touchDraw)) readings.add = !0;
        }
    }
}