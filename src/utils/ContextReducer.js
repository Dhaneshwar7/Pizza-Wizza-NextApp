import { createContext, useMemo, useReducer } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [
				...state,
				{
					id: action.id,
					tempId: action.tempId,
					name: action.name,
					price: action.price,
					qty: action.qty,
					size: action.priceOption,
					img: action.img,
				},
			];
		case 'UPDATE':
			let updatedArr = [...state];
			updatedArr.find((food, index) => {
				if (food.tempId === action.tempId) {
					updatedArr[index] = {
						...food,
						qty: parseInt(action.qty) + parseInt(food.qty),
						price: action.price + food.price,
					};
				}
			});
			return updatedArr;

		case 'REMOVE':
			let removeAndUpdateArr = [...state];
			removeAndUpdateArr.splice(action.index, 1);
			return removeAndUpdateArr;

		case 'INCREMENT':
			return state.map(food =>
				food.tempId === action.tempId
					? {
							...food,
							qty: food.qty + 1,
							price: food.price + action.unitPrice,
					  }
					: food
			);
		case 'DECREMENT':
			return state.map(food =>
				food.tempId === action.tempId
					? {
							...food,
							qty: food.qty > 1 ? food.qty - 1 : 1, // ensure qty doesn't go below 1
							price: food.qty > 1 ? food.price - action.unitPrice : food.price, // ensure price doesn't decrease if qty is 1
					  }
					: food
			);

		case 'DROP':
			return [];

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
