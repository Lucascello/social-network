import { useEffect, useState } from "react";

export function HooksDemo() {
    const [search, setSearch] = useState();

    useEffect(() => {
        let abort = false;
        fetch(`/countries?search=${search}`)
            .then((res) => res.json())
            .then((countries) => {
                if (!abort) {
                    console.log(countries);
                }
            });
        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <>
            <h1>Hooks Demo</h1>
            <input onChange={(e) => setSearch(e.target.value)} />
        </>
    );
}
