import React from "react";
// import { Component } from "react";

// class Square extends Component {
//     // constructor(props) {
//     //     super(props);

//     //     this.state = {
//     //         value: null
//     //     };
//     // }
//     // this.props 안에  밖에서 들어온 값들이 들어감
//     // this.props = { value: "1"}

//     // onClick() {
//     //     // setState를 하게 되면 value를 바꿔준다.
//     //     this.setState({
//     //         value: this.props.value == "X" ? "O" : "X"
//     //     });
//     // }

//     render() {
//         // JSX
//         // const { value } = this.props; 이렇게 받고 아래에 value만 써줄수도 있다.
//         return (
//             <button
//                 className="square"
//                 onClick={() => {
//                     this.props.onClick();
//                 }}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

// 여기서 props를 받을 때 { value, onClick } 처럼
// Destructive 하게 받고, 아래에서 props. 을 다 빼버릴 수 있다.

function Square(props) {
    return (
        <button
            className="square"
            onClick={
                // () => {props.onClick();}
                props.onClick // 여기서는 this 바인딩 없이도 작동한다.
            }
        >
            {props.value}
        </button>
    );
}

export default Square;
