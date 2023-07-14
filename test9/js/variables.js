function get(elem) {
    return document.getElementById(elem)
};
var ls = localStorage;
var mine = [];
var removed = [];
if (!ls.pencilWidth) ls.pencilWidth = 5;
if (!ls.eraserWidth) ls.eraserWidth = 50;
if (!ls.color) ls.color = 'black';
if (!ls.rgba) ls.rgba = '{"0":2,"1":0,"2":0,"3":255}';
if (!ls.opacity) ls.opacity = 1;
get('iw').value = ls.pencilWidth;
get('width').value = ls.pencilWidth;
get('color').style.backgroundColor = ls.color;
get('opacity').value = ls.opacity;
var view = {
    x: 0,
    y: 0,
    zoom: 1,
    deg: 0,
    z: 0,
    degX: 0,
    degY: 0
}
if (ls.background) {
    get('myCanvas').style.backgroundColor = ls.background;
}
var readings = { pen: "pencil", select: [], drawTimeout: true };
var drawing = [];
var wbid = window.location.href.split('?wb_')[1];
var c = get("myCanvas");
c.width = (innerWidth * devicePixelRatio);
c.height = (innerHeight * devicePixelRatio);
var ctx = c.getContext("2d");
var tc = get("tempCanvas");
tc.width = (innerWidth * devicePixelRatio);
tc.height = (innerHeight * devicePixelRatio);
var tctx = tc.getContext("2d");