import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindUsers from "./findUsers";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            profileIsVisible: true,
            findUserIsVisible: false,
            favoriteSweet: "🧁",
            url: "url",
            first: "first",
            last: "last:",
            bio: "bio",
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameAndPic = this.logNameAndPic.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
        this.toggleBioIsUpdated = this.toggleBioIsUpdated.bind(this);
        this.toggleFindUserIsVisible = this.toggleFindUserIsVisible.bind(this);
    }

    componentDidMount() {
        console.log("App component mounted");
        // Make fetch request to get data for currently logged in user
        // and store this data in the component state
        fetch("/navigation.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("data on the navigation: ", data);
                this.setState({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    url: data.url,
                    email: data.email,
                    bio: data.bio,
                });
            })
            .catch((err) => {
                console.log("error on the navigation :", err);
            });
    }

    uploadPicture(url) {
        console.log("url in my toggleUploader:", url);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
            url: url,
        });
    }
    toggleBioIsUpdated(bio) {
        console.log("bio in my toggleBioIsVisible", bio);
        this.setState({
            bio: bio,
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    toggleFindUserIsVisible() {
        this.setState({
            findUserIsVisible: !this.state.findUserIsVisible,
        });
    }

    logNameAndPic(val) {
        console.log(this.state.uploaderIsVisible + val);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <section className="cool-styles">
                        <div className="logout">
                            <Link to="/">
                                <img
                                    src="social.png"
                                    alt="social network logo"
                                    id="homepage-logo"
                                />
                            </Link>
                            {/* <img
                                src="social.png"
                                alt="social network logo"
                                id="homepage-logo"
                            /> */}
                            <br />
                            <a className="goodbye" href="/logout">
                                Logout
                            </a>
                        </div>

                        <div className="header-right">
                            {/* <h3
                                onClick={this.toggleFindUserIsVisible}
                                className="bio-h3"
                            >
                                Find Other Users
                            </h3> */}
                            <h3 className="bio-h3">
                                <Link to="/find-other-users">
                                    Find Other Users
                                </Link>
                            </h3>
                            <Link to="/">
                                <ProfilePic
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.url}
                                    loggerFunc={this.logNameAndPic}
                                />
                            </Link>
                        </div>
                    </section>
                    <hr></hr>
                    <Route path="/find-other-users">
                        <FindUsers />
                    </Route>

                    {/* {this.state.findUserIsVisible && (
                        <FindUsers
                            toggleFindUserIsVisible={
                                this.toggleFindUserIsVisible
                            }
                            findUserIsVisible={this.state.findUserIsVisible}
                        />
                    )} */}

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            loggerFunc={this.logNameAndPic}
                            toggleUploader={this.toggleUploader}
                            uploadPicture={this.uploadPicture}
                        />
                    )}
                    <Route exact path="/">
                        {this.state.profileIsVisible && (
                            <Profile
                                favoriteSweet={this.state.favoriteSweet}
                                url={this.state.url}
                                first={this.state.first}
                                last={this.state.last}
                                bio={this.state.bio}
                                toggleUploader={this.toggleUploader}
                                toggleBioIsUpdated={this.toggleBioIsUpdated}
                            />
                        )}
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}
