import "../css/nav.css";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { CATEGORIES } from "../graphQl/queries";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Currency from "./Currency";
const Navbar = () => {
  const { data, loading } = useQuery(CATEGORIES);

  const {
    categories,
    setCategories,
    setSelectedCategory,
    selectedCategory,
    cart,
    handleCartModule,
  } = useGlobalContext();

  useEffect(() => {
    if (!loading) {
      setCategories(data.categories.map((ctg) => ctg.name));
    }
  }, [data]);

  return (
    <nav>
      <div className="left">
        <ul>
          {categories.map((ctg) => {
            return (
              <li onClick={() => setSelectedCategory(ctg)} key={ctg}>
                <Link
                  style={{
                    color: selectedCategory === ctg ? "#5ECE7B" : "black",
                  }}
                  to="/"
                >
                  {ctg.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="center">
        <div className="logoContainer">
          <img src="../assets/brand-icon.png" alt="Brand Icon" />
          <Link to="/"></Link>
        </div>
      </div>
      <div className="right">
        <Currency />
        <div onMouseEnter={handleCartModule} className="cart">
          <Link to="/cart">
            <img src="../assets/vector.png" alt="Cart" />
            <span className="cartQty">{cart.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
