export default function User({ name }) {
    const username = name || "Biran";

    return <span>{username}</span>;
}
