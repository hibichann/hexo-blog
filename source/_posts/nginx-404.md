---
title: Nginx部署刷新404
date: 2023-01-21 22:43:12
categories:
  - Vue
tags:
  - Vue
  - Nginx
---

解决刷新 404 问题：

1. 使用 hash 模式路由

   ```javascript
   //vue3
   const router = createRouter({
   	linkActiveClass: "active",
   	history: createWebHistory(),
   	routes,
   })
   ```

   ```javascript
   //vue2
   const router = new Router({
   	mode: "hash",
   	routes: [
   		{ path: "/", redirect: "/login" },
   		{ path: "/login", component: Login },
   	],
   })
   ```

2. 在 nginx 中配置

   ```nginx
   location / {
       root   html/dist;
       index  index.html index.htm;
       try_files $uri $uri/ /index.html;
   }
   ```
