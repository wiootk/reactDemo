[TOC]
###基于 ES6 架构自己的 React Boilerplate 项目
## 小知识

**1.让windows cmd也用上linux命令**
下载Cygwin安装,将C:/Cygwin/bin加到%PATH%
C:/Cygwin/bin/bash.exe X:/scripts/Monitor.sh调用sh脚本。
**2.淘宝npm镜像**
1. 通过config命令
npm config set registry https://registry.npm.taobao.org 
npm info underscore （如果上面配置正确这个命令会有字符串response）
2. 命令行指定
npm --registry https://registry.npm.taobao.org info underscore 
3. 编辑 ~/.npmrc 加入下面内容
registry = https://registry.npm.taobao.org


##将使用的技术栈
*React webpack babel ES6 mocha chai sinon karma phantomJS*
*Fetch  react-router redux less*
2. 项目结构和代码

- docs                       # 项目文档
- node_modules
- src                        # 项目源码
    * conf                            # 配置文件
    * pages                           # 页面目录
        - page1
            * index.js                # 页面逻辑
            * index.scss              # 页面样式
            * img                     # 页面图片
                - xx.png 
            *  __tests__               # 测试文件
                - xx.js
        - app.html                    # 入口页
        - app.js                      # 入口JS
    * components                      # 组件目录
        - loading
            * index.js
            * index.scss
            * __tests__ 
                -  xx.js
    * js
        - actions
            * index.js
            * __tests__ 
                -  xx.js
        - reducers
            * index.js
            * __tests__
                - xx.js
        - xx.js 
    
    * css                             # 公共CSS目录
        -common.scss
    * img                             # 公共图片目录
        - xx.png
    * tests                               # 其他测试文件
    * dist
    * package.json 
    * webpack.config.js              
    * .gitignore


**环境准备**
安装webpack、nodejs
##Webpack前端模块管理工具

**初始化项目环境**

1. mkdir reactDemo&&cd reactDemo&&npm init -y
2. touch .gitignore
 添加 node_modules 进去
3. 安装webpack
npm i webpack --save-dev
**构建项目结构**
- reactDemo
    * app                   #项目代码
        *  component.js
        *  index.js
    * dist                  #编译后的项目文件
    * node_modules
    * .gitgnore
    * package.json
    * webpack.config.js      #webpack配置文件
*生成项目结构*
mkdir app dist&&touch app/component.js app/index.js package.json webpack.config.js
    
3. 添加一些简单的代码
3.1  组件代码：
app/component.js
```js
module.exports = function () {
  var element = document.createElement('h1');
  element.innerHTML = 'Hello world';
  return element;
};
```
3.2 入口文件
app/index.js
```js
var component = require('./component');
document.body.appendChild(component());
```
3.3 配置webpack
webpack.config.js
``` js
var webpack = require('webpack'); 
var path = require('path');                 //引入node的path库
var config = {
  entry: ['./app/index.js'],                //入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),  // 指定编译后的代码位置为 dist/bundle.js
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // 为webpack指定loaders
      //{ test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }   
    ]
  }
}
module.exports = config;
```
3.4 命令行执行: webpack
生成新文件 /dist/bundle.js 
4. html文件来加载编译后的代码: html-webpack-plugin
4.1 安装 npm install html-webpack-plugin --save-dev
4.2 webpack.config.js 中增加下面几行：
```js
var HtmlwebpackPlugin=require('html-webpack-plugin');
....
plugins: [
  new HtmlwebpackPlugin({
    title: 'React Demo'
  })
]
```
4.3 再次执行 webpack ,在 dist 生成了两个文件： bundle.js 和 index.html 

>webpack非全局安装，需在 package.json 中增加快捷方式
"scripts": {
  "build": "./node_modules/.bin/webpack" //
}
使用命令 npm run build 来执行webpack

5. web服务器 npm i webpack-dev-server --save-dev
5.1.1 在 webpack.config.js 文件修改(webpack 1)：
```js
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    './app/index.js'      //入口文件
    ],  
```
5.1.2在 package.json 中增加 webpack-dev-server 的快捷方式(webpack 1)：：
```json
"scripts": {
  "dev": "webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist",
  "build": "./node_modules/.bin/webpack"
}
```
*指定web服务器端口号为3000，指定目录为dist*
*Connot find module 'webpack/bin/config-yargs':webpack与webpack-dev-server版本不一致或都为2，处理：npm install webpack@1.13.3 webpack-dev-server@1.16.2 --save -dev*

5.2.1 在 webpack.config.js 文件修改(webpack 2)：
```js
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 3333,
        host:'172.168.1.70'
    },
```
5.2.2 在 package.json 中增加 webpack-dev-server 的快捷方式(webpack 1)：：
```json
"scripts": {
"dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
"build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
}
```
*windows不支持NODE_ENV=development 需要：npm install cross-env --save-dev*

5.3 运行 npm run dev-->访问 http://localhost:3000/
6. 处理CSS样式
6.1 安装loaders:npm install less css-loader style-loader less-loader --save-dev
6.2 在 webpack.config.js 中配置
webpack1
```js
loaders: [
            // 为webpack指定loaders
            //{ test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ } 
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less'],
                include: path.resolve(__dirname, 'app')
            }
        ],
```
webpack2
```js
 rules: [ 
 // {
 //            test: /\.js$/,
 //            loader: 'babel-loader',
 //            exclude: /node_modules/
 //        }, 
        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
```
可以看到，test里面包含一个正则，包含需要匹配的文件，loaders是一个数组，包含要处理这些文件的loaders，注意loaders的执行顺序是从右到左的。

6.3 新建一个LESS文件  touch app/index.less
``` css
h1 {
    color: green;
}
```
在 index.js 中引入
```js
require('./index.less');
```
6.4 运行webpack进行编译： npm run build 
### webpack 支持ES6
>Javascript包管理格式
//CommonJS 定义的是模块的同步加载，主要用于NodeJS
var MyModule = require('./MyModule');
module.exports = function() { ... };
exports.hello = function() {...};
//AMD 是异步加载，比如require.js使用这种规范
define(['./MyModule.js'], function (MyModule) {
  // export at module root
  return function() {};
});
// or
define(['./MyModule.js'], function (MyModule) {
  // export as module function
  return {
    hello: function() {...}
  };
});
ES6
import MyModule from './MyModule.js';
export default function () { ... };
export function hello() {...};

2.1. webpack支持ES6语法loader：
npm install babel-loader babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-0 --save-dev
在 webpack.config.js 中添加loader如下：
```js
{ 
  test: /\.jsx?$/, 
  loader: 'babel-loader', 
  exclude: /node_modules/,
  query: {
    presets: ['react', 'es2015'] 
  }
}
```
*webpack2 需要 babel-loader*
*可以在项目根目录下创建一个 .babelrc 文件*
```js
{
  "presets": ["react", "es2015","stage-0"]
}
```

运行 npm run build 编译,用 npm run dev ，启动web服务器
>
原因是使用了多个 loader ，而 query 仅仅作用于 babel-loader 。如果非要使用 loaders 加载多个 loader ，可以做如下修改:
var babelPresets = {presets: ['react', 'es2015']};
......
loaders: ['other-loader', 'babel-loader?'+JSON.stringify(babelPresets)]
......

#### 在项目中支持使用React
1. 安装React
npm install react react-dom --save
2. 改造项目结构
2.1 html-webpack-plugin插件来用webpack自动生成入口的index.html文件，但内容没法控制
使用它的模板机制进行定制内容
创建模板文件
app/templates/index.ejs
```html  
  <%= htmlWebpackPlugin.options.title %>
  <h1>Welcome</h1>
```
在 webpack.config.js中修改 html-webpack-plugin 设置
```js
plugins: [
  new HtmlwebpackPlugin({
    title: 'ReactDemo',
    template: path.resolve(__dirname, 'app/templates/index.ejs'),
    inject: 'body'
  })
]
```
2.2 支持sourcemap在 webpack.config.js中加入
webpack1
```js
devtool: 'source-map',
```
webpack2
```js
devtool: '#eval-source-map',
// devtool: 'cheap-module-source-map'
```

运行 npm run build 生成一个新的文件 bundle.js.map
2.3 Minification 代码压缩
修改 webpack.config.js 如下：
```js
......
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var config = {
......
  plugins: [
    ......
    new UglifyJsPlugin({ minimize: true })
  ]
}

module.exports = config;
```
运行 npm run build 可以看到生成的bundle.js文件已经被minify了。
2.3.2 开发模式和发布模式(压缩代码)，设置 process.env.WEBPACK_ENV

修改 webpack.config.js 如下：
```
......
var env = process.env.WEBPACK_ENV;
var outputFile;
var plugins = [new HtmlwebpackPlugin({
      title: 'ReactDemo',
      template: path.resolve(__dirname, 'templates/index.ejs'),
      inject: 'body'
    })];

if (env === 'build') {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'bundle.min.js';
} else {  
  outputFile = 'bundle.js';
}

var config = {
......              
  output: {
    path: path.resolve(__dirname, 'dist'),  
    filename: outputFile
  },
......
  plugins: plugins
}

module.exports = config;
```

在 package.json中修改npm run的快捷方式：
```js
"scripts": {
  "dev": "WEBPACK_ENV=dev webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist",
  "build": "WEBPACK_ENV=build webpack"
},
```
webpack2
```js
    "dev": "WEBPACK_ENV=dev cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "WEBPACK_ENV=build  cross-env NODE_ENV=production webpack --progress --hide-modules"
```
踩坑提醒

>在Windows系统上不能像上述那样设置 WEBPACK_ENV ，可以使用 set 来设置：
"scripts": {
  "test": "mocha --compilers js:babel-register --require ./test/test_helper.js --recursive ./test",
  "test:watch": "npm test -- --watch",
  "dev": "set WEBPACK_ENV=dev&&webpack-dev-server --port 3000 --devtool eval --progress --colors --hot --content-base dist",
  "build": "set WEBPACK_ENV=build&&webpack"
},

3. 更新项目代码

修改组件 index.js：
```js
import './index.less';
import component from './component';
let content = document.getElementById("content");
content.appendChild(component());
```

然后编译，运行：
npm run build
npm run dev
访问 http://localhost:3000/ 

3.1 创建React组件
修改 app/index.js 创建新React组件
app/index.js
```html
import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
 
class HelloReact extends React.Component {
   constructor() {
        super();
    }
  render() {
    return <div > Hello React! </div>
  }
}
ReactDOM.render( <HelloReact/>, document.getElementById('content'));
```
模板文件添加
```html
  <div id='content'></div>
```

*代码十分简单，引入了 react 和 react-dom ，创建了一个叫做HelloReact的组件，并将其渲染到页面上id为 content 的DOM元素内*

编译React代码 npm run build 之后就可以在页面上看到“Hello React!”了

## 测试环境搭建（Mocha + Chai + Sinon）

所用技术介绍
Mocha：用于运行我们的测试用例。
Chai：Mocha用的断言库。
Sinon：用于创建一些mocks/stubs/spys。

### Mocha安装及环境配置

安装Mocha、Chai、Sinon以及ES6语法支持
npm i mocha chai sinon babel-register --save-dev
#### 简单的测试用例
Mocha默认会去当前目录下找test目录，然后在其中去找后缀为.js的文件。如果需要修改这个目录，可以使用Mocha的参数进行设置
1.1 新建 test/index.spec.js
```js
import { expect } from 'chai';
describe('hello react spec', () => {
  it('works!', () => {
    expect(true).to.be.true;
  });
});
```
使用命令 mocha --compilers js:babel-register 
结果：
```js
$ mocha --compilers js:babel-register
  hello react spec
    √ works!
    
  1 passing (11ms)
```
*如果这里没有添加 --compilers 选项，则mocha会按照默认的方式执行，也就是“读取spec文件”->“运行测试用例”。使用了 babel-register 之后，则执行顺序为“读取spec文件”->“将ES6代码编译为ES5代码”->“运行测试用例”*

踩坑提醒
>如果执行 mocha --compilers js:babel-register 命令出现ES6解析错误：
创建一个.babelrc文件，其内容如下：
{
  "presets": ["react", "es2015"]
}
将 webpack.config.js对应设置删除

1.2 创建测试工具库test/test_helper.js
```js
import { expect } from 'chai';
import sinon from 'sinon';

global.expect = expect;
global.sinon = sinon;
```
将 index.spec.js 第一行删除
执行mocha命令:
>mocha --compilers js:babel-register --require ./test/test_helper.js --recursive

####配置 package.json 中的快捷方式
```js
 "test": "mocha --compilers js:babel-register --require ./test/test_helper.js --recursive ./test",
"test:watch": "npm test -- --watch",
```
使用  npm run test
###使用Karma测试

#### karma安装与配置
>Karma是一个基于Node.js的前端测试启动器（Test Runner），它出自Google的Angularjs团队。该工具可用于测试所有主流Web浏览器，可以支持Chrome、Safari、Firefox、IE、Opera甚至PhantomJS

1.1 安装Karma及依赖库：
```js
npm install karma --save-dev
npm install lolex phantomjs-prebuilt phantomjs --save-dev
npm install karma-chai karma-chai-plugins karma-chai-sinon karma-mocha karma-mocha-reporter karma-phantomjs-launcher karma-sinon karma-sinon-chai karma-sourcemap-loader karma-webpack --save-dev
```
1.2 使用karma命令来生成一个配置文件
karma init karma.conf.js
使用 karma start  运行测试用例
1.2.1 优化Karma配置文件
使用单独的文件 test.webpack.js 来保存测试文件的路径，方便在karma设置中进行预处理
```js
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
var modules = requireAll(require.context("./test", true, /.+\.spec\.jsx?$/));
module.exports = modules
```
然后修改 karma.config.js :
```js
var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
 //   browsers: [ 'Chrome' ] npm install karma-chrome-launcher --save-dev
    singleRun: true,
    frameworks: [ 'mocha', 'chai', 'sinon', 'sinon-chai' ],
    files: [
      'test.webpack.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-sinon-chai'
    ],
    preprocessors: {
      'test.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true,
    singleRun: false
  });
};
```
运行Karma:  karma start 
1.2.2 添加karma快捷方式到npm
```js
"scripts": {
  "test": "karma start",
  "test:watch": "watch \"npm run test\" app/",
  ......
}
```
需要安装一个npm包：`npm install watch --save-dev`
使用 npm run test 来运行测试
 npm run test:watch 来监听文件改变并自动运行测试
1.3  代码覆盖率
npm i -D jasmine-core karma-coverage
修改 karma.config.js :
```js
    plugins: ['karma-coverage'],
        preprocessors: {
            'test.webpack.js': ['webpack', 'sourcemap', 'coverage']
        },
        coverageReporter: {
    //type : 'text',
      //file : 'coverage.txt'
            type: 'html',
            dir: 'coverage/'
        },
      reporters: ['progress', 'coverage'],
```


1.4 测试用例的钩子
```js
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
   setTimeout(function() {
      foo = true;
      done();
    }, 50);
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
  it('test', function() {
    expect(foo).to.be.equal(true);
  });
});
```
1.5 断言库的用法
```js
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });
// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;
// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);
// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;
// match
expect('foobar').to.match(/^foo/);
```
## react-router
`npm i -S react-router-dom`

index.js
```js
import React from 'react'
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
import './index.less';
import ReactDOM from 'react-dom';
const { render } = ReactDOM

const getConfirmation = () => {
  // window.confirm('Are you sure?')
}
const App = () => (
  <Router
    basename="/"//基准URL
    forceRefresh={false}//当浏览器不支持 HTML5 的 history API 时强制刷新页面。
    getUserConfirmation={getConfirmation()}//导航到此页面前执行的函数，默认使用 window.confirm
    keyLength={12}//设置它里面路由的 location.key 的长度。默认是6
    >
    <div>
      <AddressBar/> 
      <nav>     
      <NavLink exact activeClassName="active" to="/Home">Home</NavLink>&#12288;
      <NavLink activeStyle={{color: 'green'}} to="/about/12?name=routerDemo">about</NavLink>&#12288;
      <NavLink isActive={isActiveFunc} activeClassName="active" to="/contact">contact</NavLink>&#12288;
      </nav>
      <Link to="/other/react/router">other</Link>&#12288;
      <Link to="/another/12-34.html">another</Link>&#12288;
      <Link to="/query/user?id=123&name=routerDemo">query1</Link>&#12288;
      <Link to={{pathname: '/query/user', search: '?id=456&name=routerDemo'}}>query2</Link>&#12288;
      <Link to="/nested">Nested</Link>
    <div>
      <Route exact path="/Home" component={Home} />
/*exact:为 true，path 为 '/one' 的路由将不能匹配 '/one/two'
strict: 为 true。path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'
确保路由没有末尾斜杠， strict 和exact 都必须同时为 true
replace: 回退时路径回到起始页面*/
      <Route path="/about/:id" render={({history,location,match}) => <h1>{console.log(history,location,match)}
          About <span onClick={() => {history.push('/', {name:'mm'})}}>click me</span>
         <div>内联渲染,不会重复装载</div>
        </h1>} />
      <Route path="/contact" replace children={({match}) => match && <h1>Contact</h1> } />
      <Route path="/other/:page?/:subpage?" render={({ match }) => (
        <h1>
          PAGE: {match.params.page}<br/>
          SUBPAGE: {match.params.subpage}
        </h1>
      )} />
      </div>      
      <Route path="/another/:a(\d{2}-\d{2}):b(\.[a-z]+)" render={({ match }) => (
        <h1>
          paramA: {match.params.a}<br/>
          paramB: {match.params.b}
        </h1>
      )} />
      <Route path='/query/user' render={({match, location}) => (
        <div>
          <p>query</p>
          <p>match:{JSON.stringify(match)}</p>
          <p>location:{JSON.stringify(location)}</p>
          <p>id:{new URLSearchParams(location.search).get('id')}</p>
          <p>name:{new URLSearchParams(location.search).get('name')}</p>
        </div>
      )} />
      <Route path="/nested" render={Nested} />
    </div>
  </Router>
)
const Home = (props) => {console.log(props,'home'); return <h1>Home Page</h1>}

const isActiveFunc = (match, location) => {
  console.log(match,'contact',55555555)
  return match
}
const Nested = () => (
  <div>
    <Link to="/nested/one">One</Link>
    <Link to="/nested/two">Two</Link>
    <Link replace to="/nested/Three">Three</Link>
    <div>选择一个点击</div>
    <Route path="/nested/:routerDemo?" render={({match}) => <h2>URL: {match.params.routerDemo || 'routerDemo'}</h2>} />
  </div>
)
/* 为了展示URL的变化的组件 请无视我*/
const AddressBar = () => (
  <Route render={({location: pathname, history}) => (
    <div className="address-bar">
      <span>
        <button style={{display:'inline-block'}}  onClick={history.goBack}
        >◀︎</button>
      </span>
      <span>
        <button style={{display:'inline-block'}} onClick={history.goForward}
        >▶</button>
      </span>
      <span >URL: {location.pathname}</span>
    </div>
  )}/>
)
render(<App/>, document.getElementById('content'))
```
## react-redux
`npm  install --save  React-Redux redux`
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑
一、UI 组件
只负责 UI 的呈现，不带有任何业务逻辑
没有状态（即不使用this.state这个变量）
所有数据都由参数（this.props）提供
不使用任何 Redux 的 API
```js
const Title = value => <h1>{value}</h1>;
```
二、容器组件
负责管理数据和业务逻辑，不负责 UI 的呈现
带有内部状态
使用 Redux 的 API
React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

三、connect()：用于从 UI 组件生成容器组件
```js
import { connect } from 'react-redux'
const 容器组件 = connect(
  mapStateToProps（将state映射到 UI 组件）,
  mapDispatchToProps（将用户对 UI 组件的操作映射成 Action）
)(UI 组件)
```
四、mapStateToProps()：建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染
```js
const mapStateToProps = (state,ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  // UI 组件的同名参数
  }
}
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
```
五、mapDispatchToProps():建立 UI 组件的参数到store.dispatch方法的映射,定义了哪些用户的操作应该当作 Action，传给 Store,可以是函数，也可以是对象
```js
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```
六、<Provider> 组件:让容器组件拿到state
```js
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
let store = createStore(todoApp);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了

实例
```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onAddClick ,onSubtractClick} = this.props
    return (
      <div>        
        <button onClick={onAddClick}>+</button>
    <span>{value}</span>
        <button onClick={onSubtractClick}>-</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onSubtractClick: PropTypes.func.isRequired
}
// Action Creator
const addAction = { type: 'add' }
const subtractAction = { type: 'subtract' }

// Reducer
// 这个组件的 Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'add':
      return { count: count + 1 }
    case 'subtract':
      return { count: count - 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onAddClick: () => dispatch(addAction),
    onSubtractClick: () => dispatch(subtractAction)
  }
}

// Connected Component
//使用connect方法生成容器组件
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
// 生成store对象，并使用Provider在根组件外面包一层
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)
```
## react-bootstrap
`npm install --S bootstrap react-bootstrap`
index.ejs
```html
<!DOCTYPE html>
<html>
<head>
    <title>react-bootstrap</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>
    <%= htmlWebpackPlugin.options.title %>
    <h1>Welcome</h1>
  <div id="content"></div>
</body>    
</html>
```
index.js
```js
const React = require("react");
const ReactDOM = require("react-dom");

import {Navbar} from "react-bootstrap";
const navbarInstance = (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">react-bootstrap</a>
            </Navbar.Brand>
        </Navbar.Header>
    </Navbar>
);

// 然后我们渲染到body里:document.body
ReactDOM.render(navbarInstance,document.getElementById('content'));

```







#
#
#
<meta http-equiv="refresh" content="30>