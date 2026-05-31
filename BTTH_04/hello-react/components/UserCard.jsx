export default function UserCard({ name, email, avatar }) {
    return (
        <div style={{ border: "1px solid #eee", padding: "10px", margin: "10px", textAlign: "center" }}>
            <img src={avatar} alt={name} style={{ width: "50px", borderRadius: "50%" }} />
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
}