addEventListener('fetch', event => {
    return event.respondWith(handle(event));
});
async function handle(event) {
    const resHdrs = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type,Content-Length,Accept-Encoding,X-Requested-with,Origin',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
        'Cache-Control': 'public, max-age=31536000'
    });
    const cache = caches.default;
    const url = new URL(event.request.url);
    let sinaUrl = String(url.pathname).slice(1);
    if (sinaUrl.startsWith("http")) {
        sinaUrl = sinaUrl.replace(/https:(\/)*/,'').replace(/http:(\/)*/, '');
    }
    const newUrl = new URL("https://" + sinaUrl);
    if (!newUrl.hostname.includes("sinaimg.cn")) {
        return new Response('This is a Teapot', {status: 418});
    }
    let response = await cache.match(newUrl);
    if (response) {
        resHdrs.set('X-Worker-Cache', "true");
        Object.assign(resHdrs, response.headers);
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: resHdrs
        });
    }
    response = await fetch(newUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
            "Referer": "https://www.weibo.com/"
        },
        cf: {polish: "lossless"}
    });
    if (response.status !== 200 || !response.headers.get("Content-Type").includes("image")) {
        return new Response('This is a Teapot', {status: 418});
    }
    Object.assign(resHdrs, response.headers);
    response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: resHdrs
    });
    event.waitUntil(cache.put(newUrl, response.clone()));
    return response;
}
