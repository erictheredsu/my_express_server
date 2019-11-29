'use strict';

//notice: to run this script, you should include react.js, react-dom.js, browser.js and ref this js with type="text/babel"

//case 1 helloworld
const e1 = <h3>Hello, world!</h3>;
const pos1 = document.getElementById('case1');
ReactDOM.render(e1, pos1);

//case 2 expression
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}
const user = {
    firstName: 'eric',
    lastName: 'su'
};
const e2 = <h3> Hello, {formatName(user)}! </h3>;
ReactDOM.render(
    e2,
    document.getElementById('case2')
);

//case 3 component
class HelloMessage extends React.Component{
    render(){
        return (<p> hello, {this.props.name}</p>);
    }
};

ReactDOM.render(
    <HelloMessage name="eric"/>,
    document.getElementById('case3')
);

//case 4 Stateful component
//when state change, the component will render itself by call render funciton
class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {second: 0};
    }

    tick(){
        //this.setState(second )
    }


    render(){
        return (<p>case4</p>);
    }
};


ReactDOM.render(
    <Timer/>,
    document.getElementById('case4')
);