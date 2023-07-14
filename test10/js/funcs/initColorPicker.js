function initColorPicker() {
    var canvas = document.getElementById('colorCanvas');
    var canvasContext = canvas.getContext('2d');

    let gradient = canvas.getContext('2d').createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, '#ff0000')
    gradient.addColorStop(1 / 6, '#ffff00')
    gradient.addColorStop((1 / 6) * 2, '#00ff00')
    gradient.addColorStop((1 / 6) * 3, '#00ffff')
    gradient.addColorStop((1 / 6) * 4, '#0000ff')
    gradient.addColorStop((1 / 6) * 5, '#ff00ff')
    gradient.addColorStop(1, '#ff0000')
    canvas.getContext('2d').fillStyle = gradient
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)

    gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    canvas.getContext('2d').fillStyle = gradient
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)

    gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    canvas.getContext('2d').fillStyle = gradient
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
    canvas.onmousedown = function () {
        readings.selColor = true;
    }
    canvas.addEventListener('touchstart', canvas.onmousedown);
    canvas.onmousemove = function (e) {
        if (readings.selColor) {

            var rect = e.target.getBoundingClientRect();
            var x = (e.clientX || e.targetTouches[0].clientX) - rect.left;
            var y = (e.clientY || e.targetTouches[0].clientY) - rect.top;
            if (x > 0 && y > 0 && x < canvas.clientWidth && y < canvas.clientHeight) {
                var imgData = canvasContext.getImageData((x / canvas.clientWidth) * canvas.width, (y / canvas.clientHeight) * canvas.height, 1, 1)
                var rgba = imgData.data;
                ls.rgba = JSON.stringify(rgba);
                var col = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + ls.opacity + ")";
                if (readings.pen == 'background') {
                    get('myCanvas').style.backgroundColor = col;
                    ls.background = col;
                } else {
                    ls.color = col;
                    get('color').style.backgroundColor = col;
                }
            }
        }
    }
    canvas.addEventListener('touchmove', canvas.onmousemove);
    canvas.onmouseup = function () {
        readings.selColor = false;
    }
    canvas.addEventListener('touchend', canvas.onmouseup);
}