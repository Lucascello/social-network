import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";

export default function OtherProfile() {
    const history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`/api/user/${id}`)
            .then((response) => {
                console.log("response in /api/user/${id}:", response);
                console.log("response.url in /api/user/${id}:", response.url);
            })
            .catch((error) => {
                console.log("error in /api/user/:id", error);
            });
    }, [id]);

    return (
        <>
            <h1>It worked</h1>
        </>
    );
}
