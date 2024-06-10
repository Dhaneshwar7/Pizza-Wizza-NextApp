import { createContext, useMemo, useReducer } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [...state, {
                id:action.id,
                name: action.name,
                price: action.price,
                qty: action.qty,
                size: action.priceOption,
                img: action.img
            }];

		default:
			console.log('reducer working');
	}
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, []);
	const contextValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
