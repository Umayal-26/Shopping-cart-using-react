import React, { useReducer } from "react";
import "./App.css"; 
import image1 from './image1.webp'
import image2 from './image2.jpg'
import image3 from './image3.webp'
import image4 from './image5.webp'
import image5 from './image6.jpg'
import image6 from './image7.webp'
const initialState = {
  cart: []
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id)
      };

    default:
      return state;
  }
};

// Main container
const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const products = [
    { id: 1, name: "Flower", price: 60, image: image1 },
    { id: 2, name: "Lotus", price: 40, image: image2 },
    { id: 3, name: "Purply", price: 80, image: image3 },
    { id: 4, name: "Rose", price: 100, image: image4 },
    { id: 4, name: "Lotus", price: 10, image: image5 },
    { id: 4, name: "Florida", price: 130, image: image6 }
  ];

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };
  const totalPrice = state.cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="shopping-cart-container">
      <h2 className="head">Shopping Cart</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addItem(product)}>Add Item</button>
          </div>
        ))}
      </div>
      <h3>Cart Items</h3>
      <ul className="cart-list">
        {state.cart.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            {item.name} - Quantity: {item.quantity} - Price: ₹{item.price}
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                }
              >
                -
              </button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total Price: ₹{totalPrice}</h3>
    </div>
  );
};

export default App;
