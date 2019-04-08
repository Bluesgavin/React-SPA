# React SPA
## 相关命令
### 安装
```        
npm install
```

### 开发阶段的实时编译 
```    
npm start
```
### 如需修改webpack的配置可以运行以下命令，暴露项目配置
```    
npm run eject
```
## 项目结构
```
.   
├─build                 //打包资源
├─public                //公共资源
└─src
    ├─components        //组件文件夹
    │  ├─alert
    │  ├─openModal
    │  ├─popover
    │  ├─tableList
    │  └─test
    ├─model             //redux文件夹
    │  ├─action
    │  ├─reducer
    │  └─store
    ├─pages             //页面文件夹
    │  ├─closeTab
    │  └─openTab
    ├─config             //配置文件夹
    │ 
    └─router            //路由文件夹                      
```
## 基本开发
1.根据组件结构创建页面，放入pages文件夹(组件则放components文件夹)。     
2.在router文件夹下的index.js中引用新增页面。并添加router指向新页面    
3.在App.js中state的menuList对象中按例子格式，新添菜单项。     
4.执行命令npm start启动项目。     
5.在运行页面点节新增的菜单项，测试是否能显示页面。     
6.其中主页面的内容(顶部内容，菜单栏，导航栏，中心内容)集中写在App.js中,假如有需要更改，可以自行按需修改。   
7.另外本项目引用[Ant Design UI](https://ant.design/docs/react/introduce-cn),可以在网站中查阅使用组件。
### 组件结构
```
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="app">
              
            </div>
        );
    }
}

export default App;
```
### 菜单栏配置
菜单栏根据在App.js中的state中的menuList对象渲染，可以根据实际修改。可以通过请求从服务器获取菜单。
```
{
    key: "菜单key",
    icon: "图标",
    text: "菜单",
    item: [
        {
            key: "菜单key", 
            tab: "标签显示字样",
            link: "对应的router", 
            text: "菜单栏显示字样"
        }
    ]
},
```
### 路由配置
路由配置在config文件夹index.js中配置。   
路由基本配置格式
```
    {
        name:"TableList",
        url: "/table",
        path: "components/tableList/tableList",
        async: true
    }
```

## 拓展内容   
在页面能够正常运行后，可以根据需要添加部分拓展内容。
### appPulgin组件
本项目在appPlugin组件中写了一些接口如app.open(),app.close(),app.alert().使用方法如下：    

1.在需要调用app接口的组件中引入appPlugin组件
```
import appPulgIn from "./appPlugIn";
```
2.调用appPlugin组件并暴露新组件
```
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="app">
              
            </div>
        );
    }
}
const newPage = appPulgIn(App);
export default newPage
```
3.在props中的app对象调用函数
```
import React, { Component } from 'react';
import CloseTab from '../closeTab/closeTab'
import appPulgIn from "./appPlugIn";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="app">
              {this.porps.app.open({
                    type:"SUB", 
                    link: "closeTab", 
                    title: "关闭标签页", 
                    content: CloseTab 
                })}
            </div>
        );
    }
}
const newPage = appPulgIn(Page);
export default newPage
```
### 按需加载
本项目用react.lazy和react.Suspense实现组件按需加载。
1.利用lazy方法引用页面
```
let Component = lazy(() => import("component"));
```
2.用Suspense组件包裹需要调用的页面,其中Suspense组件中必须有一个fallback属性指向加载组件
```
<Suspense fallback={<div>Loading...</div>}>
	<Component {...props}/>
</Suspense>
```
### 路由传参
本例子使用react-router-dom路由。在页面跳转中传参使用location.state。并在标签页中存储，实现传参记录。必要时可以用hash区分，防止打开重名标签时冲突。
```
this.props.history.push({ pathname: link, state: [openWay, parmas], hash: num});
```
在页面中取值
```
this.props.location.state
```

### 跨域请求
在项目根目录package.json中添加"proxy"，对应的值便是跨域请求地址。

### 项目静态位置
项目打包后静态资源的引用路径配置在项目根目录package.json的homepage中设置。