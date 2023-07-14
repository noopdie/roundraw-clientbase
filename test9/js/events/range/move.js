document.body.onmousemove = function (e) {
    if (e.touches) e.clientX = e.touches[0].clientX, e.clientY = e.touches[0].clientY;
    if (readings.range1Move) {
        if ((e.clientX * devicePixelRatio) > get('range').offsetLeft + get('range1').offsetWidth / 2 && (e.clientX * devicePixelRatio) < (get('range').offsetWidth + get('range').offsetLeft - get('range1').offsetWidth / 2)) get('range1').style.left = ((e.clientX * devicePixelRatio) - get('range').offsetLeft - get('range1').offsetWidth / 2) + 'px';
        readings.range1 = (get('range1').offsetLeft) / (get('range').offsetWidth);
        if ((e.clientX * devicePixelRatio) < get('range').offsetLeft) readings.range1 = 0, get('range1').style.left = 0;
        draw(transform(view.wb));
    }
    if (readings.range2Move) {
        if ((e.clientX * devicePixelRatio) > get('range').offsetLeft + get('range2').offsetWidth / 2 && (e.clientX * devicePixelRatio) < (get('range').offsetWidth + get('range').offsetLeft - get('range2').offsetWidth / 2)) get('range2').style.left = ((e.clientX * devicePixelRatio) - get('range').offsetLeft - get('range2').offsetWidth / 2) + 'px';
        readings.range2 = (get('range2').offsetLeft + get('range2').offsetWidth) / (get('range').offsetWidth);
        if ((e.clientX * devicePixelRatio) > get('range').offsetLeft + get('range').offsetWidth) readings.range2 = 1, get('range2').style.left = get('range').offsetWidth - get('range2').offsetWidth;
        draw(transform(view.wb));
    }
}
document.body.addEventListener('touchmove', document.body.onmousemove);