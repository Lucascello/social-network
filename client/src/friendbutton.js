import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function OtherProfile() {
    const [button, setButton] = useState("");
    const { id } = useParams();

    useEffect(() => {
        console.log("button mounted");
        fetch(`/api/frienRequest/${id}`)
            .then((res) => res.json())
            .then((response) => {
                console.log("Whats the response to add a friend?", response);
                setButton(response);
            })
            .catch((err) => {
                console.log("Error in adding friend (button)", err);
            });
    }, [id]);

    function decisionOnFrienship() {
        if (button === "Add Friend") {
            fetch(`/api/add-friend/${id}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log(
                        "Whats the response to the add friend button?",
                        response
                    );
                    setButton(response.accepted);
                });
        } 
        // else if (button === "Cancel Request") {
        // }
    }

    return (
        <>
            <button onClick={decisionOnFrienship}>{button}</button>
        </>
    );
}
