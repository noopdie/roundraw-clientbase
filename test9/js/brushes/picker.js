brush.picker = [function (x, y) {
    var arr = [];
    var rgba = ctx.getImageData(x, y, 1, 1).data;
    get('opacity').value = ls.opacity = rgba[3] / 255;
    get('color').style.backgroundColor = ls.color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + ls.opacity + ")";


},
function () { },
function () { }
];