import { Component } from "react";

export default class uploader extends Component {
    constructor() {
        super();
        this.state = {};
        this.selectProfilePic = this.selectProfilePic.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
    }
    selectProfilePic(e) {
        this.file = e.target.files[0];
    }
    uploadPic(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.file);
        console.log("*************");
        fetch("/uploadProfilePic", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result for the new pic result.url ", result.url);
                this.props.uploadPicture(result.url);
            })
            .catch((err) => {
                console.log("error uploading new image: ", err);
            });
    }
    render() {
        return (
            <>
                <section className="upload">
                    <img
                        onClick={this.props.toggleUploader}
                        className="close"
                        src="close.png"
                        alt="close"
                    />
                    <br />
                    <h2 className="uploader-h2">
                        Want to change your picture?{" "}
                    </h2>
                    <form>
                        <input
                            onChange={this.selectProfilePic}
                            className="file"
                            type="file"
                            name="file"
                            accept="image/*"
                        />
                        <button
                            className="upload-button"
                            onClick={this.uploadPic}
                        >
                            Upload
                        </button>
                    </form>
                </section>
            </>
        );
    }
}
