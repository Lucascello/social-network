import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindUsers from "./findUsers";
import Chat from "./chat";
import { BrowserRouter, Route, Link } from "react-router-dom";
import OtherProfile from "./otherProfile.js";
import FriendsAndWannabees from "./friendsAndWannabees.js";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            profileIsVisible: true,
            findUserIsVisible: false,
            favoriteSweet: "🧁",
            url: "",
            first: "",
            last: "",
            bio: "",
            id: "",
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
        fetch("/home.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("data on home: ", data);
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
                console.log("error on home :", err);
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
                        <img
                            src="../social.png"
                            alt="social network logo"
                            id="homepage-logo"
                        />
                        <div className="navigation">
                            <a className="goodbye" href="/logout">
                                <b>Logout</b>
                            </a>
                        </div>
                        <h3 className="bio-h3">
                            <Link to="/">Home</Link>
                        </h3>
                        <h3 className="bio-h3">
                            <Link to="/chat">Chat</Link>
                        </h3>

                        <h3 className="bio-h3">
                            <Link to="/find-other-users">Find Other Users</Link>
                        </h3>
                        <h3 className="bio-h3">
                            <Link to="/friends-and-requests">
                                Friends and Requests
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
                    </section>
                    <hr></hr>
                    <Route path="/find-other-users">
                        <FindUsers />
                    </Route>
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
                    <Route path="/user/:id">
                        <OtherProfile ownId={this.state.id} />
                    </Route>
                    <Route path="/friends-and-requests">
                        <FriendsAndWannabees />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}
