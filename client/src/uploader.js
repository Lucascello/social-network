import { Component } from "react";

export default class uploader extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    render() {
        return (
            <>
                <section className="upload">
                    <img
                        onClick={this.props.loggerFunc}
                        className="close"
                        src="close.png"
                        alt="close"
                    />
                    {/* <form>
            <input onchange="fileSelectHandler" className="file" type="file" name="file" accept="image/*" ref="upload">
            <button onclick>Upload</button>
            </form> */}
                </section>
            </>
        );
    }
}
