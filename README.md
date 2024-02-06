# gitstamp-cli

用于工程编包时写入Git信息

## 说明

本工具需在安装Git客户端的环境下使用，且运行目录为Git仓库目录

## 使用
1. 安装 `npm install gitstamp-cli -s`
2. 写入当前Git信息`npx gitstamp`
    建议script一起使用，如打包前写入最新的Git信息如
    package.json
    ```json
    ...
      "scripts": {
            "dev": "npx gitstamp && webpack serve",
            "build": "npx gitstamp && npx webpack build",
            "start": "npm run dev"
        },
    ...
    ```
3. 载入Git信息

    main.js
    ```js
    import gitstamp from 'gitstamp-cli';
    console.log(gitstamp)
    // 获得如下结构的对象，你可以写入任何你想要写入的地方。
    //{
    //    "branch": "XXX",
    //    "commitID": "XXX",
    //    "commitDate": "XXX",
    //    "commitAuthor": "XXX",
    //    "commitMessage": "XXX"
    //}
    ```


## 开发

1. 执行`npm install` 安装依赖
2. 执行CLI 脚本`node ./bin/index.js`
