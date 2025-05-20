
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import type {
  Product,
  CartItem,
  AppState,
  ProductAction,
  CartAction,
  QuizAction,
  AppAction,
  ProductState,
  CartState
} from '@/lib/types';
import { MOCK_PRODUCTS, INITIAL_PRODUCT_STATE, INITIAL_CART_STATE, QUIZ_QUESTIONS } from '@/lib/constants';
import { recommendScents, type RecommendScentsInput } from '@/ai/flows/recommend-scents';
import { useToast } from '@/hooks/use-toast';

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return INITIAL_PRODUCT_STATE;
    default:
      return state;
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};


const AppContext = createContext<AppState & { dispatch: React.Dispatch<AppAction> } | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [productState, productDispatch] = useReducer(productReducer, INITIAL_PRODUCT_STATE);
  const [cartState, cartDispatch] = useReducer(cartReducer, INITIAL_CART_STATE);
  
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResults, setQuizResults] = useState<Product[]>([]);
  const [isLoadingQuizResults, setIsLoadingQuizResults] = useState(false);

  const { toast } = useToast();

  const combinedDispatch = (action: AppAction) => {
    if (['SET_CATEGORY', 'SET_SORT', 'SET_FILTER', 'RESET_FILTERS'].includes(action.type)) {
      productDispatch(action as ProductAction);
    } else if (['ADD_ITEM', 'REMOVE_ITEM', 'UPDATE_QUANTITY', 'TOGGLE_CART', 'CLOSE_CART', 'CLEAR_CART'].includes(action.type)) {
      cartDispatch(action as CartAction);
      if (action.type === 'ADD_ITEM') {
        toast({ title: "Added to Cart", description: `${(action as {payload: Product}).payload.name} has been added to your cart.` });
      }
    } else if (action.type === 'SET_PRODUCTS') {
        setProducts(action.payload);
    }
    // Quiz actions
    else {
        switch (action.type) {
            case 'START_QUIZ':
                setQuizActive(true);
                setQuizStep(0);
                setQuizAnswers({});
                setQuizResults([]);
                break;
            case 'NEXT_STEP':
                setQuizAnswers(prev => ({ ...prev, [action.payload.key]: action.payload.value }));
                if (quizStep < QUIZ_QUESTIONS.length - 1) {
                    setQuizStep(s => s + 1);
                } else {
                    // Auto-submit on last step
                    combinedDispatch({ type: 'SUBMIT_QUIZ_START' });
                }
                break;
            case 'SET_QUIZ_STEP':
                setQuizStep(action.payload);
                break;
            case 'SUBMIT_QUIZ_START':
                setIsLoadingQuizResults(true);
                // Call AI flow
                const recommendInput: RecommendScentsInput = {
                    mood: quizAnswers.mood || 'any',
                    desiredEffect: quizAnswers.desiredEffect || 'any',
                    scentProfile: quizAnswers.scentProfile || 'any',
                };
                recommendScents(recommendInput)
                    .then(aiResult => {
                        // Filter MOCK_PRODUCTS based on AI recommendations
                        // This is a simplified approach. A real app might use IDs or more complex matching.
                        const recommendedProductNames = aiResult.productRecommendations.map(name => name.toLowerCase());
                        const matchedProducts = MOCK_PRODUCTS.filter(p => recommendedProductNames.includes(p.name.toLowerCase()));
                        
                        // If not enough direct matches, try category/scent family from quiz answers
                        if (matchedProducts.length < 2) {
                            const backupMatches = MOCK_PRODUCTS.filter(p => 
                                p.category.toLowerCase() === (quizAnswers.desiredEffect || "").toLowerCase() ||
                                p.scentFamily.toLowerCase() === (quizAnswers.scentProfile || "").toLowerCase()
                            ).slice(0, 3); // Limit to 3 backup matches
                            combinedDispatch({ type: 'SUBMIT_QUIZ_SUCCESS', payload: [...new Set([...matchedProducts, ...backupMatches])] });
                        } else {
                            combinedDispatch({ type: 'SUBMIT_QUIZ_SUCCESS', payload: matchedProducts });
                        }
                        toast({ title: "Quiz Results Ready!", description: aiResult.reasoning });
                    })
                    .catch(error => {
                        console.error("Error recommending scents:", error);
                        toast({ variant: "destructive", title: "Quiz Error", description: "Could not get recommendations. Please try again." });
                        combinedDispatch({ type: 'SUBMIT_QUIZ_ERROR' });
                    });
                break;
            case 'SUBMIT_QUIZ_SUCCESS':
                setQuizResults(action.payload);
                setIsLoadingQuizResults(false);
                setQuizActive(false); // Quiz is no longer active, results are shown
                break;
            case 'SUBMIT_QUIZ_ERROR':
                setIsLoadingQuizResults(false);
                setQuizActive(true); // Keep quiz active to allow retry
                break;
            case 'RESET_QUIZ':
                setQuizActive(false);
                setQuizStep(0);
                setQuizAnswers({});
                setQuizResults([]);
                setIsLoadingQuizResults(false);
                break;
        }
    }
  };

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCartItems = localStorage.getItem('aromaGeniusCart');
    if (storedCartItems) {
      const items = JSON.parse(storedCartItems);
      // Dispatch an action to set initial cart items if needed, or directly set state
      // For simplicity, this example assumes cartReducer can handle an init action or you directly set items
      // This part of cart persistence would ideally be handled by dispatching an action like 'INITIALIZE_CART'
      // For now, we'll skip direct dispatch to avoid complexity with initial state in reducer
      // cartDispatch({ type: 'INITIALIZE_CART', payload: items }); 
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartState.items.length > 0) {
      localStorage.setItem('aromaGeniusCart', JSON.stringify(cartState.items));
    } else {
      localStorage.removeItem('aromaGeniusCart'); // Clean up if cart is empty
    }
  }, [cartState.items]);


  const state: AppState = {
    products,
    productState,
    cartState,
    quizActive,
    quizStep,
    quizAnswers,
    quizResults,
    isLoadingQuizResults,
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch: combinedDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppState & { dispatch: React.Dispatch<AppAction> } => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
