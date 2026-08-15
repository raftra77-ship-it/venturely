'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Product, ValidationCartItem } from '@/types';
import { getProducts, recordCartAdd } from '@/lib/data';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  activeProduct: Product | undefined;
  products: Product[];
  refreshProducts: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Real Validation Cart Engine
  validationCart: ValidationCartItem[];
  addToValidationCart: (product: Product, isPreOrder?: boolean) => void;
  removeFromValidationCart: (productId: string) => void;
  clearValidationCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  // Checkout Modal State
  selectedCheckoutProduct: Product | null;
  setSelectedCheckoutProduct: (p: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Waitlist Modal State
  selectedWaitlistProduct: Product | null;
  setSelectedWaitlistProduct: (p: Product | null) => void;
  isWaitlistOpen: boolean;
  setIsWaitlistOpen: (open: boolean) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('FOUNDER');
  const [activeProductId, setActiveProductId] = useState<string>('prod_1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Validation Cart & Modal States
  const [validationCart, setValidationCart] = useState<ValidationCartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [selectedCheckoutProduct, setSelectedCheckoutProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const [selectedWaitlistProduct, setSelectedWaitlistProduct] = useState<Product | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState<boolean>(false);

  const refreshProducts = () => {
    const list = getProducts();
    setProducts(list);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const activeProduct = products.find((p) => p.id === activeProductId) || products[0];

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    showToast(`Switched workspace role to ${newRole}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToValidationCart = (product: Product, isPreOrder: boolean = true) => {
    recordCartAdd(product.id);
    refreshProducts();

    setValidationCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, isPreOrder }];
    });

    showToast(`Added ${product.name} pre-order to Validation Cart!`);
    setIsCartDrawerOpen(true);
  };

  const removeFromValidationCart = (productId: string) => {
    setValidationCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast(`Removed product from Validation Cart.`);
  };

  const clearValidationCart = () => {
    setValidationCart([]);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        activeProductId,
        setActiveProductId,
        activeProduct,
        products,
        refreshProducts,
        toastMessage,
        showToast,
        validationCart,
        addToValidationCart,
        removeFromValidationCart,
        clearValidationCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        selectedCheckoutProduct,
        setSelectedCheckoutProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedWaitlistProduct,
        setSelectedWaitlistProduct,
        isWaitlistOpen,
        setIsWaitlistOpen,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
