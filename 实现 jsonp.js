const jsonp = (req = {url: '', callback: ''}) => {
    if (!req || !req.url || !req.callback) {
        return;
    }
    const {url, callback} = req;
    const s = document.createElement('script');
    s.src = `${url}${url.endsWith('?') ? '' : '?'}callback=${callback}`;
    document.body.appendChild(s);
};
