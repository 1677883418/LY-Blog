module.exports = {
    "title": "LY'Blog",
    "description": "保持本心,不断前行",
    "dest": "public",
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "/favicon.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],
    "theme": "reco",
    "themeConfig": {
        "nav": [
            {
                "text": "首页",
                "link": "/",
                "icon": "reco-home"
            },
            {
                "text": "时间线",
                "link": "/timeline/",
                "icon": "reco-date"
            },
            {
                "text": "工具",
                "icon": "reco-api",
                "items": [
                    {
                        "text": "个人网盘",
                        "link": "https://pan.lystu.cn"
                    }
                ]
            },
            {
                "text": "联系方式",
                "icon": "reco-message",
                "items": [
                    {
                        "text": "GitHub",
                        "link": "https://github.com/1677883418",
                        "icon": "reco-github"
                    }
                ]
            },
            {
                "text": "关于",
                "icon": "reco-message",
                "link": "/docs/LY'Blog/",
            },
        ],
        "sidebar": {
            "/docs/LY'Blog/": [
                "",
                "me",
            ]
        },
        "type": "blog",
        "blogConfig": {
            "category": {
                "location": 2,
                "text": "类别"
            },
            "tag": {
                "location": 3,
                "text": "标签"
            }
        },
        "friendLink": [
            {
                "title": "午后南杂",
                "desc": "Enjoy when you can, and endure when you must.",
                "email": "1156743527@qq.com",
                "link": "https://www.recoluan.com"
            },
            {
                "title": "Cxwht's Blog",
                "desc": "愿你势均力敌 双向奔赴",
                "avatar": "https://cxwht.cn/favicon.ico",
                "link": "https://cxwht.cn/"
            }
        ],
        "logo": "/avatar.webp",
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "Last Updated",
        "author": "肥羊",
        "authorAvatar": "/avatar.webp",
        "record": "豫ICP备2022009289号",
        "startYear": "2021"
    },
    "markdown": {
        "lineNumbers": true
    }
}