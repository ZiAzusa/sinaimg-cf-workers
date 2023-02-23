# SinaImg Cloudflare Workers
新浪图床的Cloudflare Workers反向代理脚本，解决因防盗链造成的图片不可用问题<br>
此代理脚本利用了Cloudflare的缓存机制，避免重复回源新浪图床造成时间上的浪费

### 部署方法
直接将index.js全部复制粘贴到Cloudflare Workers的代码编辑框里即可，替换里面的全部内容，然后部署Workers

### 使用方法
在原本的新浪图床链接前拼接上你的Cloudflare Workers域名即可正常获取图片<br>
例：<br>
<b>新浪图床链接（有防盗链，不能直接访问）：<a href='https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg'>→</a></b>
```HTTP
GET https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg
```
<b>通过Cloudflare Workers代理的链接：<a href='https://sinaimg.nahida.fun/https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg'>→</a></b>
```HTTP
GET https://server.domain.workers.dev/https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg
```
或者可以省略HTTPS：
```HTTP
GET https://server.domain.workers.dev/tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg
```

### 效果展示
个人搭建的代理地址：https://sinaimg.nahida.fun/新浪图床链接<br>
注：如需使用请自行搭建，Workers免费版每天有10万调用限制

---

Made with ♡ by [魂归梓里(ZiAzusa)](https://about.sukimoe.cn/)
