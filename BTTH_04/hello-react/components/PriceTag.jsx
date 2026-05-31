export default function PriceTag({ originalPrice, salePrice }) {
    return (
        <div>
            <span style={{ textDecoration: "line-through", color: "#999" }}>{originalPrice}đ</span>
            <span style={{ color: "#e74c3c", fontWeight: "bold", marginLeft: "10px" }}>{salePrice}đ</span>
        </div>
    );
}