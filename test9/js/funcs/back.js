function back () {
    if (mine[0]) {
        var key = mine.length - 1;
        for (var i = 0; i < view.wb.length; i++) {
            if (view.wb[i].id == mine[key]) {
                mine.splice(key, 1)
                removed.push(view.wb[i]);
                socket.send('del&' + view.wb[i].id);
                view.wb.splice(i, 1);
                view.wb_.splice(i, 1);
                draw(transform(view.wb));
            }
        }
    }
}