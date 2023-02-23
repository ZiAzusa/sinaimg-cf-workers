addEventListener('fetch', event => {
    return event.respondWith(handle(event));
});
/*
* @param  event
* @return Response Object
* @author ZiAzusa
*/
async function handle(event) {
    // 添加跨域和缓存控制响应头
    const resHdrs = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type,Content-Length,Accept-Encoding,X-Requested-with,Origin',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
        'Cache-Control': 'public, max-age=31536000'
    });
    const cache = caches.default;
    const url = new URL(event.request.url);
    // 处理新浪图床链接
    let sinaUrl = String(url.pathname).slice(1);
    if (sinaUrl.startsWith("http")) {
        sinaUrl = sinaUrl.replace(/https:(\/)*/,'').replace(/http:(\/)*/, '');
    }
    const newUrl = new URL("https://" + sinaUrl);
    if (!newUrl.hostname.includes("sinaimg.cn")) {
        return new Response('404 Not Found', {status: 404});
    }
    // 检查Cloudflare缓存
    let response = await cache.match(newUrl);
    if (response) {
        resHdrs.set('Content-Type', response.headers.get("Content-Type"))
        resHdrs.set('X-Worker-Cache', "true");
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText, 
            headers: resHdrs
        });
    }
    // 回源新浪图床
    response = await fetch(newUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
            "Referer": "https://www.weibo.com/"
        },
        cf: {polish: "lossless"}
    });
    if (!response.ok || !response.headers.get("Content-Type").includes("image")) {
        return new Response('404 Not Found', {status: 404});
    }
    resHdrs.set('Content-Type', response.headers.get("Content-Type"))
    response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: resHdrs
    });
    // 写入Cloudflare缓存
    event.waitUntil(cache.put(newUrl, response.clone()));
    return response;
}
