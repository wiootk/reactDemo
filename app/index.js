// require('./index.less');
// var component = require('./component');
// document.body.appendChild(component());

// import './index.less';
// import component from './component';
// let content = document.getElementById("content");
// content.appendChild(component());


// import './index.less';
// import React from 'react';
// import ReactDOM from 'react-dom';
 
// class HelloReact extends React.Component {
//    constructor() {
//         super();
//     }
//   render() {
//     return <div > Hello React! </div>
//   }
// }
// ReactDOM.render( <HelloReact/>, document.getElementById('content'));


// import React from 'react'
// import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
// import './index.less';
// import ReactDOM from 'react-dom';
// const { render } = ReactDOM

// const getConfirmation = () => {
//   // window.confirm('Are you sure?')
// }
// const App = () => (
//   <Router
//     basename="/"//基准URL
//     forceRefresh={false}//当浏览器不支持 HTML5 的 history API 时强制刷新页面。
//     getUserConfirmation={getConfirmation()}//导航到此页面前执行的函数，默认使用 window.confirm
//     keyLength={12}//设置它里面路由的 location.key 的长度。默认是6
//     >
//     <div>
//       <AddressBar/> 
//       <nav>     
//       <NavLink exact activeClassName="active" to="/Home">Home</NavLink>&#12288;
//       <NavLink activeStyle={{color: 'green'}} to="/about/12?name=routerDemo">about</NavLink>&#12288;
//       <NavLink isActive={isActiveFunc} activeClassName="active" to="/contact">contact</NavLink>&#12288;
//       </nav>
//       <Link to="/other/react/router">other</Link>&#12288;
//       <Link to="/another/12-34.html">another</Link>&#12288;
//       <Link to="/query/user?id=123&name=routerDemo">query1</Link>&#12288;
//       <Link to={{pathname: '/query/user', search: '?id=456&name=routerDemo'}}>query2</Link>&#12288;
//       <Link to="/nested">Nested</Link>
// 	<div>
//       <Route exact path="/Home" component={Home} />
// /*exact:为 true，path 为 '/one' 的路由将不能匹配 '/one/two'
// strict: 为 true。path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'
// 确保路由没有末尾斜杠， strict 和exact 都必须同时为 true
// replace: 回退时路径回到起始页面 */
//       <Route path="/about/:id" render={({history,location,match}) => <h1>{console.log(history,location,match)}
//           About <span onClick={() => {history.push('/', {name:'mm'})}}>click me</span>
//          <div>内联渲染,不会重复装载</div>
//         </h1>} />
//       <Route path="/contact" replace children={({match}) => match && <h1>Contact</h1> } />
//       <Route path="/other/:page?/:subpage?" render={({ match }) => (
//         <h1>
//           PAGE: {match.params.page}<br/>
//           SUBPAGE: {match.params.subpage}
//         </h1>
//       )} />
//       </div>      
//       <Route path="/another/:a(\d{2}-\d{2}):b(\.[a-z]+)" render={({ match }) => (
//         <h1>
//           paramA: {match.params.a}<br/>
//           paramB: {match.params.b}
//         </h1>
//       )} />
//       <Route path='/query/user' render={({match, location}) => (
//         <div>
//           <p>query</p>
//           <p>match:{JSON.stringify(match)}</p>
//           <p>location:{JSON.stringify(location)}</p>
//           <p>id:{new URLSearchParams(location.search).get('id')}</p>
//           <p>name:{new URLSearchParams(location.search).get('name')}</p>
//         </div>
//       )} />
// 	<Route path="/nested" render={Nested} />
//     </div>
//   </Router>
// )
// const Home = (props) => {console.log(props,'home'); return <h1>Home Page</h1>}
// const isActiveFunc = (match, location) => {
//   console.log(match,'contact',55555555)
//   return match
// }
// const Nested = () => (
//   <div>
//     <Link to="/nested/one">One</Link>
//     <Link to="/nested/two">Two</Link>
//     <Link replace to="/nested/Three">Three</Link>
//     <div>选择一个点击</div>
//     <Route path="/nested/:routerDemo?" render={({match}) => <h2>URL: {match.params.routerDemo || 'routerDemo'}</h2>} />
//   </div>
// )

// /* 为了展示URL的变化的组件 请无视我*/
// const AddressBar = () => (
//   <Route render={({location: pathname, history}) => (
//     <div className="address-bar">
//       <span>
//         <button style={{display:'inline-block'}}  onClick={history.goBack}
//         >◀︎</button>
//       </span>
//       <span>
//         <button style={{display:'inline-block'}} onClick={history.goForward}
//         >▶</button>
//       </span>
//       <span >URL: {location.pathname}</span>
//     </div>
//   )}/>
// )
// render(<App/>, document.getElementById('content'))
















//// hashHistory 老版本浏览器的history
// // browserHistory h5的history
// // memoryHistory node环境下的history，存储在memory中




// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
// import { Provider, connect } from 'react-redux'

// // React component
// class Counter extends Component {
//   render() {
//     const { value, onAddClick ,onSubtractClick} = this.props
//     return (
//       <div>        
//         <button onClick={onAddClick}>+</button>
// 		<span>{value}</span>
//         <button onClick={onSubtractClick}>-</button>
//       </div>
//     )
//   }
// }

// Counter.propTypes = {
//   value: PropTypes.number.isRequired,
//   onAddClick: PropTypes.func.isRequired,
//   onSubtractClick: PropTypes.func.isRequired
// }
// // Action Creator
// const addAction = { type: 'add' }
// const subtractAction = { type: 'subtract' }

// // Reducer
// // 这个组件的 Reducer
// function counter(state = { count: 0 }, action) {
//   const count = state.count
//   switch (action.type) {
//     case 'add':
//       return { count: count + 1 }
//     case 'subtract':
//       return { count: count - 1 }
//     default:
//       return state
//   }
// }

// // Store
// const store = createStore(counter)

// // Map Redux state to component props
// function mapStateToProps(state) {
//   return {
//     value: state.count
//   }
// }

// // Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//   return {
//     onAddClick: () => dispatch(addAction),
//     onSubtractClick: () => dispatch(subtractAction)
//   }
// }

// // Connected Component
// //使用connect方法生成容器组件
// const App = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter)
// // 生成store对象，并使用Provider在根组件外面包一层
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('content')
// )



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





