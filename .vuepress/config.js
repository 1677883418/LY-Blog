module.exports = {
    "title": "LY'Blog",
    "description": "保持本心,不断前行",
    "dest": "public",
    "plugins": [
        [
            //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
            "cursor-effects",
            {
                size: 3,                    // size of the particle, default: 2
                shape: ['circle'],  // shape of the particle, default: 'star'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            }
        ],
        [
            //看板娘,先安装在配置， npm install @vuepress-reco/vuepress-plugin-kan-ban-niang --save
            "@vuepress-reco/vuepress-plugin-kan-ban-niang",
            {
                theme: ['koharu', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
                clean: false,
                messages: {
                    welcome: '我是fatSheep欢迎你的关注 ',
                    home: '且视他人之疑目如盏盏鬼火，大胆地去走你的夜路吧',
                    theme: '好吧，希望你能喜欢我的其他小伙伴。',
                    close: '再见哦'
                },
                width: 240,
                height: 352
                // height: 200
            }],
        [
            //插件广场的流程图插件 先安装在配置 npm install vuepress-plugin-flowchart --save
            'flowchart'
        ],
        [
            //代码复制提示,先安装再配置， npm install vuepress-plugin-nuggets-style-copy --save
            "vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功,快去使用吧~"
            }
        }],
        [
            //图片放大插件 先安装再配置， npm install vuepress-plugin-medium-zoom --save
            '@vuepress/plugin-medium-zoom', {
            selector: '.page img',
            delay: 1000,
            options: {
                margin: 24,
                background: 'rgba(25,18,25,0.9)',
                scrollOffset: 40
            }
        }],
        [
            //动态标题 先安装再配置， npm install vuepress-plugin-dynamic-title --save
            "dynamic-title",
            {
                showIcon: "/favicon.ico",
                showText: "(/≧▽≦/)咦！又好了！",
                hideIcon: "/failure.ico",
                hideText: "(●—●)喔哟，崩溃啦！",
                recoverTime: 2000
            }
        ],
        //代码块
        '@vuepress-reco/extract-code',
        '@vuepress-reco/vuepress-plugin-screenfull',
        //加载页
        '@vuepress-reco/vuepress-plugin-loading-page',
        //进度条
        '@vuepress/nprogress',
        [
            //插件广场的sitemap插件 先安装在配置 npm install vuepress-plugin-sitemap --save
            'sitemap', {
            hostname: 'https://blog.lystu.cn'
        }
        ],
    ],
    "head": [
        [
            'meta',
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,user-scalable=no'
            }
        ],
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
        //跳转栏
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
                "text": "考研",
                "icon": "reco-message",
                "link": "/docs/考研/",
            },
            {
                "text": "关于",
                "icon": "reco-message",
                "link": "/docs/LY'Blog/",
            },
        ],
//        侧边栏
                "sidebar": {
                    "/docs/考研/":[
                        "",

                    ],
/*                    "/docs/LY'Blog/": [
                        "",
                        "me",
                    ]*/
                },
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
        //友链
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
            }, {
                "title": "hiifong's Blog",
                "desc": "Full stack developer like",
                "avatar": "https://i.hiifong.cc/images/logo.png",
                "link": "https://i.hiifong.cc/"
            }
        ],
        //侧边栏
        "subSidebar": 'auto',
        //网站类型
        "type": "blog",
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
        "lineNumbers": true,
        plugins: {

        }
    }
}
