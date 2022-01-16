import { useEffect, useState } from "react";

export default function FindUsers(props) {
    const [search, setSearch] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        fetch(`/users?search=${search}`)
            .then((res) => res.json())
            .then((users) => {
                if (!abort) {
                    console.log(users);
                    setUsers(users);
                }
            });
        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <>
            <h1>Find Other Users</h1>
            <input onChange={(e) => setSearch(e.target.value)} />
            <h3 onClick={props.toggleFindUserIsVisible} className="bio-h3">
                Return To My Page
            </h3>
        </>
    );
}
