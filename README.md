# SinaImg Cloudflare Workers
![maven](https://img.shields.io/badge/JavaScript-yellow)
![maven](https://img.shields.io/badge/Sina%20Image%20Hosting-yellow)
![maven](https://img.shields.io/badge/Cloudflare%20Workers-orange)<br>
新浪图床的Cloudflare Workers反向代理脚本，解决因防盗链造成的图片不可用问题<br>
此代理脚本利用了Cloudflare的缓存机制，避免重复回源新浪图床造成时间上的浪费

### 部署方法
直接将 [index.js](https://github.com/ZiAzusa/sinaimg-cf-workers/blob/main/index.js) 全部复制粘贴到Cloudflare Workers的代码编辑框里即可，替换里面的全部内容，然后部署Workers

### 使用方法
在原本的新浪图床链接前拼接上你的Cloudflare Workers域名即可正常获取图片，以下是例子：<br><br>
<b>新浪图床链接（有防盗链，不能直接访问）：<a href='https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg'>→</a></b>
```HTTP
GET https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg
```
<b>通过Cloudflare Workers代理的链接：<a href='https://sinaimg.lie.moe/https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg'>→</a></b>
```HTTP
GET https://server.domain.workers.dev/https://tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg
```
或者可以省略HTTPS：
```HTTP
GET https://server.domain.workers.dev/tva1.sinaimg.cn/large/ec43126fgy1go4femy66vj228e35px6q.jpg
```

### 效果展示
个人搭建的代理地址：https://sinaimg.lie.moe/新浪图床链接<br>
注：如需使用请自行搭建，Workers免费版每天有10万调用限制

---

Made with ♡ by [梓漪(ZiAzusa)](https://intro.lie.moe/)
