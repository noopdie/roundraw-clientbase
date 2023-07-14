function forward () {
    if (removed.length > 0) {
        var i = removed.length - 1;
        view.wb.push(removed[i]);
        var rem_ = JSON.stringify(removed[i])
        view.wb_.push(JSON.parse(rem_));
        mine.push(removed[i].id);
        socket.send('new&Line&' + removed[i].id + '&' + rem_);
        removed.splice(i, 1)
        draw(transform(view.wb));
    }
}