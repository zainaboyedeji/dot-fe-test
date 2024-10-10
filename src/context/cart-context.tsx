import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  isCartOpen: boolean;
  toggleCartDrawer: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  handleQuantityChange: (index: number, increment: boolean) => void;
  calculateTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsCartOpen((prev) => !prev);
  };

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setIsCartOpen(true); 
  };

  const removeFromCart = (index: number) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedCartItems = [...cartItems];
    if (increment) {
      updatedCartItems[index].quantity += 1;
    } else {
      updatedCartItems[index].quantity = Math.max(1, updatedCartItems[index].quantity - 1);
    }
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        isCartOpen,
        toggleCartDrawer,
        addToCart,
        removeFromCart,
        handleQuantityChange,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
