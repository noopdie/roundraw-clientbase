function unzoom() {
    view.x = 0;
    view.y = 0;
    view.z = 0;
    view.deg = 0;
    view.degX = 0;
    view.degY = 0;
    view.zoom = 1;
    get('info').innerHTML = '<tspan x="0" dy="1.2em">x: ' + view.x + '</tspan><tspan x="0" dy="1.2em">y: ' + view.y + '</tspan><tspan x="0" dy="1.2em">deg: ' + view.deg + '</tspan><tspan x="0" dy="1.2em">zoom: ' + view.zoom + '</tspan><tspan x="0" dy="1.2em">z: ' + view.z +'</tspan><tspan x="0" dy="1.2em">degX: ' + view.degX + '</tspan><tspan x="0" dy="1.2em">degY: ' + view.degY + '</tspan>';    setTimeout(function() {
        get('info').innerHTML = '';
    }, 700);
    draw(transform(view.wb))
}