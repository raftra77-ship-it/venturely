'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Product, TrialCartItem } from '@/types';
import { getProducts } from '@/lib/data';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  activeProduct: Product | undefined;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Smytten-Style Trial Point System
  userTrialPoints: number;
  maxTrialPoints: number;
  trialCart: TrialCartItem[];
  addToTrialCart: (product: Product) => boolean;
  removeFromTrialCart: (productId: string) => void;
  clearTrialCart: () => void;
  isTrialDrawerOpen: boolean;
  setIsTrialDrawerOpen: (open: boolean) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('FOUNDER');
  const [activeProductId, setActiveProductId] = useState<string>('prod_1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Smytten-inspired 6 Trial Points State
  const maxTrialPoints = 6;
  const [userTrialPoints, setUserTrialPoints] = useState<number>(6);
  const [trialCart, setTrialCart] = useState<TrialCartItem[]>([]);
  const [isTrialDrawerOpen, setIsTrialDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const list = getProducts();
    setProducts(list);
    if (list.length > 0 && !activeProductId) {
      setActiveProductId(list[0].id);
    }
  }, [activeProductId]);

  const activeProduct = products.find((p) => p.id === activeProductId) || products[0];

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    showToast(`Switched view mode to ${newRole}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToTrialCart = (product: Product): boolean => {
    const cost = product.trialPointsCost || 1;
    if (trialCart.some((item) => item.product.id === product.id)) {
      showToast(`Already added ${product.name} sample to your Trial Pack!`);
      return false;
    }

    if (userTrialPoints < cost) {
      showToast(`Not enough Trial Points! You need ${cost} point(s), but have ${userTrialPoints} remaining.`);
      return false;
    }

    setTrialCart((prev) => [...prev, { product, pointsCost: cost }]);
    setUserTrialPoints((prev) => prev - cost);
    showToast(`Added ${product.name} sample to Trial Pack! (${cost} point)`);
    setIsTrialDrawerOpen(true);
    return true;
  };

  const removeFromTrialCart = (productId: string) => {
    const item = trialCart.find((i) => i.product.id === productId);
    if (item) {
      setUserTrialPoints((prev) => prev + item.pointsCost);
      setTrialCart((prev) => prev.filter((i) => i.product.id !== productId));
      showToast(`Removed sample from Trial Pack.`);
    }
  };

  const clearTrialCart = () => {
    setTrialCart([]);
    setUserTrialPoints(6);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        activeProductId,
        setActiveProductId,
        activeProduct,
        toastMessage,
        showToast,
        userTrialPoints,
        maxTrialPoints,
        trialCart,
        addToTrialCart,
        removeFromTrialCart,
        clearTrialCart,
        isTrialDrawerOpen,
        setIsTrialDrawerOpen,
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
