import "../../css/cart.css";
import { useGlobalContext } from "../../context";
import CartProduct from "./CartProduct";
const Cart = () => {
  const { cart } = useGlobalContext();

  return (
    <section className="cartSection">
      <h2>Cart</h2>
      {cart.length == 0 ? (
        <h2 style={{ textAlign: "center" }}>Your Cart Is Empty</h2>
      ) : (
        <div className="cartProducts">
          {cart.map((item) => {
            return <CartProduct key={item.id} item={item} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Cart;
