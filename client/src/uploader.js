import { Component } from "react";

export default class uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <>
                <section className="upload">
                    <img className="close" src="close.png" alt="close" />
                    <h1>Upload or Change your Profile Picture</h1>
                </section>
            </>
        );
    }
}
