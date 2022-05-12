import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function OtherProfile() {
    const [button, setButton] = useState();
    const { id } = useParams();

    useEffect(() => {
        // console.log("button mounted");
        fetch(`/api/frienRequest/${id}`)
            .then((res) => res.json())
            .then((response) => {
                // console.log("Whats the response to add a friend?", response);
                setButton(response);
            })
            .catch((err) => {
                console.log("Error in adding friend (button)", err);
            });
    }, []);

    function decisionOnFrienship() {
        if (button === "Add Friend") {
            fetch(`/api/add-friend/${id}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((response) => {
                    // console.log(
                    //     "Whats the response to the add friend button?",
                    //     response
                    // );
                    if (response === false) {
                        setButton("Cancel Request");
                    }
                });
        } else if (button === "Cancel Request") {
            fetch(`/api/cancel-friend-request/${id}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((response) => {
                    // console.log(
                    //     "Whats the response to the cancel friend button?",
                    //     response
                    // );
                    if (!response.length) {
                        setButton("Add Friend");
                    }
                });
        } else if (button === "Accept Friend Request") {
            fetch(`/api/accept-friend-request/${id}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((response) => {
                    // console.log(
                    //     "Whats the response to the accept friend button?",
                    //     response
                    // );
                    if (response) {
                        setButton("End Friendship");
                    }
                });
        } else if (button === "End Friendship") {
            fetch(`/api/cancel-friend-request/${id}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((response) => {
                    // console.log(
                    //     "Whats the response to the cancel friend button?",
                    //     response
                    // );
                    if (!response.length) {
                        setButton("Add Friend");
                    }
                });
        }
    }

    return (
        <>
            <button onClick={decisionOnFrienship}>{button}</button>
        </>
    );
}
