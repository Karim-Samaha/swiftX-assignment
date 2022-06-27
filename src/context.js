import React, { useContext, useEffect, useState } from "react";


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState("$");
    const [cartModule, setCartModule] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);



    //Add Product to Cart
    const addToCartHandler = (item) => {
        if (cart.some(elm => elm.id == item.id)) {
            setCart(cart)
        } else {
            setCart([...cart, item])
        }
    }
    //Remove Product from Cart
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id))
    }
    //For Currency Selection
    const handelChangeCurrency = (label) => {
        const pickedCurrency = currencies.filter((currency) => currency.label == label)
        setSelectedCurrency(pickedCurrency[0].label)
    }

    //Toggling Mini Cart
    const handleCartModule = () => {
        setCartModule(!cartModule)
    }

    //Getting Total Price
    useEffect(() => {
        if (cart.length > 0) {
            const arrayOfAmountsAndQuantities = cart.map((item) => {
                return {
                    amount: item.prices.filter((price) => price.currency.label == selectedCurrency)[0].amount,
                    quantity: item.quantity
                }
            })

            let sumPrices = 0
            arrayOfAmountsAndQuantities.map((item) => sumPrices += (+item.amount * item.quantity))
            setTotalPrice(sumPrices)

        }
    }, [cart, selectedCurrency])


    // Handle Products Attributes Selection, arguments are (attribute, state of array, setState)
    const handleAttributes = (attr, arr, fun) => {
        fun([...arr, attr]);
        arr.map((item) => {
            if (item.id == attr.id) {
                let filteredArray = arr.filter(
                    (attrbuite) => attrbuite.id !== item.id
                );
                fun([...filteredArray, attr]);
            }
        });
    };




    return <AppContext.Provider value={{
        categories,
        setCategories,
        products,
        setProducts,
        selectedCategory,
        setSelectedCategory,
        cart,
        setCart,
        addToCartHandler,
        removeFromCart,
        currencies,
        setCurrencies,
        handelChangeCurrency,
        selectedCurrency,
        selectedCurrencySymbol,
        setSelectedCurrencySymbol,
        cartModule,
        handleCartModule,
        setCartModule,
        totalPrice,
        handleAttributes
    }} >
        {children}
    </AppContext.Provider>

}

export const useGlobalContext = () => {
    return useContext(AppContext);
}


export { AppContext, AppProvider };