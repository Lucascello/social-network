import { Registration } from "./registration";

export default function Welcome() {
    return (
        <>
            <header className="header">
                <h1 className="title">Welcome to Connections</h1>
                <img
                    className="connections"
                    src="/connections.png"
                    alt="logo"
                />
                {/* <img
                style={{ width: "100px", height: auto }}
                src="/connections.png"
            /> */}
            </header>
            <main>
                <Registration />
            </main>
        </>
    );
}
