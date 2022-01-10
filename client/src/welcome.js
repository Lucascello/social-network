import { Registration } from "./registration";

export default function Welcome() {
    return (
        <>
            <h1>Welcome to Chestbook</h1>
            <img className="chestbook" src="/chestbook.jpg" alt="logo" />
            {/* <img
                style={{ width: 100 + "px", height: auto }}
                src="/chestbook.jpg"
            /> */}
            <Registration />
        </>
    );
}
