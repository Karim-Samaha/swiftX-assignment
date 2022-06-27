import "../css/products.css";
import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../graphQl/queries";
import { useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
const Products = () => {
  const {
    products,
    setProducts,
    selectedCategory,
    addToCartHandler,
    selectedCurrency,
    selectedCurrencySymbol,
  } = useGlobalContext();

  const { data, loading } = useQuery(PRODUCTS, {
    variables: { category: selectedCategory },
  });

  useEffect(() => {
    if (!loading) {
      setProducts(data.category.products);
    }
  }, [data]);

  return (
    <section className="productsSection">
      <h2>{selectedCategory.toUpperCase()}</h2>
      <div className="productsContainer">
        {products.map((item) => {
          const { id, name, prices, gallery, attributes } = item;
          // Getting Price based on Selected Currency
          const price = prices.filter(
            (price) => price.currency.label == selectedCurrency
          );
          return (
            <div key={id} className="productItem">
              <img className="productImg" src={gallery[0]} alt="Product Img" />
              <img
                onClick={() =>
                  addToCartHandler({
                    ...item,
                    selectedAttributes: [],
                    quantity: 1,
                  })
                }
                className="addToCart"
                src="./assets/add-to-cart.png"
                alt="Add To Cart"
              />
              <Link to={`/product/${id}`}></Link>
              <h3>{name}</h3>
              <h4>
                {`${selectedCurrencySymbol} `}
                {price[0].amount}
              </h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
