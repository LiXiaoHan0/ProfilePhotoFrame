# 头像框微信小程序

## 使用说明：

### 第一步：

参考[微信官方指南](https://mp.weixin.qq.com/cgi-bin/wx)，注册微信小程序并填写相关信息。

### 第二步：

下载[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，关联已注册的微信小程序，导入本项目代码。

### 第三步：

修改相关文件变量配置

#### 1.image文件夹：

| 文件名 | 说明                   | 备注          |
| ------ | ---------------------- | ------------- |
| 0.png  | 装饰性logo，**非必要** | 建议宽高比3:1 |
| n.png  | 可用的头像框，数量不限 | n为连续正整数 |
| x.png  | 小程序转发时的封面     | 要求宽高比5:4 |

#### 2.app.js：

| 变量名     | 数据类型 | 说明                                                 |
| ---------- | -------- | ---------------------------------------------------- |
| logo       | Boolean  | 是否使用logo。若为true则在image文件夹中应存在0.png   |
| picnum     | Number   | 可选头像框数量。取值应与image文件夹中n.png的数量对应 |
| slideColor | Array(2) | 第二页中滑动条颜色。两项分别为已选择颜色与背景条颜色 |
| cloud      | Boolean  | 是否使用云端统计功能                                 |
| cloudid    | String   | 微信云开发数据库_id。数据库字段为n                   |

#### 3.app.json：

| 属性名                 | 数据类型 | 说明             |
| ---------------------- | -------- | ---------------- |
| navigationBarTitleText | String   | 头像框小程序名称 |

#### 4.app.wxss：

##### page选择器

| 属性名           | 数据类型    | 说明                                         |
| ---------------- | ----------- | -------------------------------------------- |
| background-color | #rrggbb     | 页面背景颜色                                 |
| background-image | url(base64) | 页面背景纹理。需要将纹理素材转换为base64格式 |
| --line1          | #rrggbb     | 头像效果框边框颜色                           |
| --line2          | #rrggbb     | 可选头像框边框颜色                           |
| --shadow         | #rrggbb     | 头像效果框投影颜色                           |
| --word           | #rrggbb     | 滑动条文字颜色                               |
| --back           | #rrggbb     | 滑动条背景颜色                               |

##### .button选择器

| 属性名          | 数据类型 | 说明         |
| --------------- | -------- | ------------ |
| color           | #rrggbb  | 按钮文字颜色 |
| backgroud-color | #rrggbb  | 按钮背景颜色 |

##### .button-hover选择器

| 属性名          | 数据类型 | 说明               |
| --------------- | -------- | ------------------ |
| color           | #rrggbb  | 点击时按钮文字颜色 |
| backgroud-color | #rrggbb  | 点击时按钮背景颜色 |

##### .button[disabled]选择器

| 属性名          | 数据类型 | 说明               |
| --------------- | -------- | ------------------ |
| color           | #rrggbb  | 禁用时按钮文字颜色 |
| backgroud-color | #rrggbb  | 禁用时按钮背景颜色 |

### 第四步：

上传程序代码，提交审核后发布。

## 注意事项

在小程序最新版本库中，微信官方回收了获取高清头像的接口权限。本程序默认使用了读取用户相册（备用方案）而非直接获取用户头像（普通方案）的方式。如需直接获取用户头像，可以自行修改pages/index/index.js和pages/index/index.wxml中的注释范围。
