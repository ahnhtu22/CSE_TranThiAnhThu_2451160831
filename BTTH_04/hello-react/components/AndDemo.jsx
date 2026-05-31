export default function AndDemo() {
    const hasNotification = true;
    const notificationCount = 5;
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Thông báo</h2>
            {hasNotification && (
                <div style={{ background: "#fff3cd", padding: "10px" }}>
                    Bạn có {notificationCount} thông báo mới!
                </div>
            )}
        </div>
    );
}