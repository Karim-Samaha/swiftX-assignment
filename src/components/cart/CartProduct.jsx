import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import "../../css/cart.css";

const CartProduct = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [productAttributes, setProductAttributes] = useState(
    item.selectedAttributes
  );
  const {
    selectedCurrency,
    selectedCurrencySymbol,
    removeFromCart,
    handleAttributes,
    setCart,
    cart,
  } = useGlobalContext();

  const handleQuantity = (type) => {
    if (type == "increase") {
      setQuantity(quantity + 1);
    } else if (type == "decrease") {
      // If Quantity Went to 0 Product will be Removed From Cart
      setQuantity(quantity > 0 ? quantity - 1 : 1);
    }
  };

  //Updating Cart If Attributes Changed
  useEffect(() => {
    const newCart = cart.map((product) => {
      if (product.id == item.id) {
        item.selectedAttributes = productAttributes;
        item.quantity = quantity;
      }
      return product;
    });
    setCart(newCart);
  }, [productAttributes, quantity]);

  // Removing Product If Quantity IS 0
  useEffect(() => {
    if (quantity == 0) {
      removeFromCart(id);
    }
  }, [quantity]);

  const { name, id, gallery, prices, selectedAttributes, attributes } = item;
  // Getting Price based on Selected Currency
  const price = prices.filter(
    (price) => price.currency.label == selectedCurrency
  );
  return (
    <div key={id} className="cartItem">
      <div className="sectionLeft">
        <h2>{name}</h2>
        <h3>
          {`${selectedCurrencySymbol} `}
          {price[0].amount * quantity}
        </h3>
        {attributes.map((item) => {
          const { id: attrId, items, name } = item;
          return (
            <ul key={attrId}>
              <h6>{name}</h6>
              {items.map((attr) => {
                const { id, value, displayValue } = attr;
                return (
                  <li
                    onClick={() =>
                      handleAttributes(
                        {
                          id: attrId,
                          value: value,
                        },
                        productAttributes,
                        setProductAttributes
                      )
                    }
                    className={
                      selectedAttributes.some(
                        (e) => e.value == value && e.id == attrId
                      )
                        ? "attributeListItems selectedAttr"
                        : "attributeListItems"
                    }
                    key={id}
                    value={value}
                  >
                    {displayValue}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
      <div className="sectionRight">
        <div className="qtyControls">
          <span
            onClick={() => handleQuantity("increase")}
            className="incButton"
          >
            +
          </span>
          <span>{item.quantity}</span>
          <span
            onClick={() => handleQuantity("decrease")}
            className="decButton"
          >
            -
          </span>
        </div>
        <img src={gallery[0]} alt="Product Img" />
      </div>
    </div>
  );
};

export default CartProduct;
