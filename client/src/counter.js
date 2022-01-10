// import { Component } from "react";

// export default class Counter extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0,
//             username: "",
//         };
//         this.updateUsername = this.updateUsername.bind(this);
//     }

//     componentDidMount() {
//         console.log("component mounted");
//     }

//     componentDidUpdate() {
//         console.log("update");
//     }

//     incrementCounter() {
//         this.setState({
//             count: this.state.count + 1,
//         });
//     }

//     updateUsername(e) {
//         this.setState(
//             {
//                 username: e.target.value,
//             },
//             () => console.log(this.state)
//         );
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Welcome {this.state.username}</h1>
//                 <h1>Counter is at {this.state.count}</h1>
//                 <button onClick={() => this.incrementCounter()}>
//                     Click Me!
//                 </button>
//                 <input onChange={this.updateUsername} type="text" />
//             </div>
//         );
//     }
// }
