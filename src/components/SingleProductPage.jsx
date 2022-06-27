import "../css/single-product-page.css";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { SINGLE_PRODUCT } from "../graphQl/queries";
const SingleProductPage = () => {
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [singleProductData, setSingleProductData] = useState({});
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const {
    setSelectedCategory,
    addToCartHandler,
    selectedCurrency,
    selectedCurrencySymbol,
    handleAttributes,
  } = useGlobalContext();

  const { data, loading } = useQuery(SINGLE_PRODUCT, {
    variables: { productId: id },
  });
  useEffect(() => {
    setSelectedCategory("");
    if (!loading) {
      setSingleProductData(data.product);
      setPageLoading(false);
    }
  }, [data]);

  if (pageLoading) {
    return (
      <section className="singleProductPage">
        <h2>Loading...</h2>
      </section>
    );
  }
  const { name, gallery, attributes, prices, description } = singleProductData;
  // Getting Price based on Selected Currency
  const price = prices.filter(
    (price) => price.currency.label == selectedCurrency
  );
  return (
    <section className="singleProductPage">
      <div className="imgSection">
        <div className="imgSelection">
          {gallery.map((img, i) => (
            <img key={i} onClick={() => setImgIndex(i)} src={img} alt="Image" />
          ))}
        </div>
        <img className="activeImg" src={gallery[imgIndex]} alt="Image" />
      </div>
      <div className="infoSection">
        <h2>{name}</h2>
        {attributes.map((attr) => {
          const { id: attrId, name, items } = attr;
          return (
            <div className="attributes" key={attrId}>
              <h3>{name}</h3>
              <ul className="attributeList">
                {items.map((item) => {
                  const { value, id, displayValue } = item;
                  return (
                    <li
                      onClick={() =>
                        handleAttributes(
                          {
                            id: attrId,
                            value: value,
                          },
                          selectedAttributes,
                          setSelectedAttributes
                        )
                      }
                      className={
                        selectedAttributes.some(
                          (e) => e.id == attrId && e.value == value
                        )
                          ? "attributeListItems selectedAttr"
                          : "attributeListItems"
                      }
                      value={value}
                      key={id}
                    >
                      {displayValue}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <h2>Price:</h2>
        <h2 className="priceValue">
          {`${selectedCurrencySymbol} `}
          {price[0].amount}
        </h2>
        <button
          onClick={() =>
            addToCartHandler({
              ...singleProductData,
              selectedAttributes: selectedAttributes,
              quantity: 1,
            })
          }
          className="addToCartBtn"
        >
          Add To Cart
        </button>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  );
};

export default SingleProductPage;
