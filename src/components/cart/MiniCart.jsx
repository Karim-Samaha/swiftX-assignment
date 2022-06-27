import { useGlobalContext } from "../../context";
import "../../css/miniCart.css";
import { Link } from "react-router-dom";
import Cart from "./Cart";
const MiniCart = () => {
  const {
    cartModule,
    handleCartModule,
    cart,
    setCartModule,
    totalPrice,
    selectedCurrencySymbol,
  } = useGlobalContext();
  return (
    <>
      <div
        onMouseLeave={handleCartModule}
        onMouseEnter={() => setCartModule(true)}
        className="cartModule"
        style={{ height: cartModule ? "75vh" : "0vh" }}
      >
        <div
          style={{ display: cartModule ? "block" : "none" }}
          className="miniCartItems"
        >
          {cart.length == 0 ? (
            <h3 style={{ textAlign: "center", marginTop: "30%" }}>
              Cart is Empty
            </h3>
          ) : (
            <div className="miniCartProducts">
              <Cart />
            </div>
          )}
        </div>
        <div
          className="miniCartOptions"
          style={{ display: cartModule && cart.length > 0 ? "block" : "none" }}
        >
          <div className="totalPrice">
            <h3>Total</h3>
            <h4>
              {`${selectedCurrencySymbol} `}
              {totalPrice}
            </h4>
          </div>
          <div className="miniCartButtons">
            <Link to="/cart">View Bag</Link>
            <button>CHECK OUT</button>
          </div>
        </div>
      </div>
      <div
        style={{ display: cartModule ? "block" : "none" }}
        className="miniCartWrapper"
      ></div>
    </>
  );
};

export default MiniCart;
