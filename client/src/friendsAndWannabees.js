import { useDispatch, useSelector } from "react-redux";
import {
    makeFriend,
    endFriendship,
    receiveFriendsAndWannabees,
} from "./redux/friends-and-wannabees/slice.js";
import { useEffect } from "react";

export default function FriendsAndWannabees() {
    // Get access to the dispatch function
    const dispatch = useDispatch();

    // Select the Wannabees from the state
    const wannabees = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendship) => !friendship.accepted
            )
    );

    const currentFriends = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendship) => friendship.accepted
            )
    );

    // console.log("wannabees: ", wannabees);
    // console.log("currentFriends: ", currentFriends);

    useEffect(() => {
        // console.log("*********++++++++++++");
        // STEP 1: Make GET request to fetch friends and wannabees
        // STEP 2: dispatch action to populate the redux state
        fetch(`/api/friends-and-wannabees`)
            .then((response) => response.json())
            .then((data) => {
                // console.log("this is the data", data);
                if (data) {
                    dispatch(receiveFriendsAndWannabees(data));
                }
            });
    }, []);

    function handleAccept(id) {
        // Step 1: Make a POST request to update the DB

        // Step 2: Dispatch an action to update the Redux store
        // dispatch(makeFriend(id));
        fetch(`/api/accept-friend-request/${id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("Whats the data to handleAccept", data);
                dispatch(makeFriend(id));
            });
    }

    function handleRejection(id) {
        fetch(`/api/cancel-friend-request/${id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("Whats the data to handleRejection?", data);
                dispatch(endFriendship(id));
            });
    }

    return (
        <>
            <div className="other-user">
                <h1 className="request-text">
                    These people want to be your friends
                </h1>
            </div>
            <br />
            <div className="friend-request">
                {wannabees &&
                    wannabees.map((wannabee) => {
                        return (
                            <div className="other-user" key={wannabee.id}>
                                <img
                                    className="request-pic"
                                    src={wannabee.url}
                                />
                                {wannabee.first} {wannabee.last}
                                <div>
                                    <button
                                        onClick={() =>
                                            handleAccept(wannabee.id)
                                        }
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleRejection(wannabee.id)
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                                <br />
                            </div>
                        );
                    })}
            </div>
            <br />
            <div className="other-user">
                <h1 className="request-text">
                    These people are currently your friends
                </h1>
            </div>
            <br />
            <div className="friend-request">
                {currentFriends &&
                    currentFriends.map((currentFriend) => {
                        return (
                            <div className="other-user" key={currentFriend.id}>
                                <img
                                    className="request-pic"
                                    src={currentFriend.url}
                                />
                                {currentFriend.first} {currentFriend.last}
                                <button
                                    onClick={() =>
                                        handleRejection(currentFriend.id)
                                    }
                                >
                                    End Friendship
                                </button>
                                <br />
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
