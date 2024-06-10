import { CartContext } from '@/utils/ContextReducer';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

const Card = props => {
	// const sizeOptions = ['Regular', 'Medium', 'Large'];
	const data = props.foodData;
	const { state, dispatch } = useContext(CartContext);
	const prizeOptions = Object.keys(data.price);
	const [qty, setQty] = useState(1);
	const [size, setSize] = useState(prizeOptions[0]);

	const handleQty = e => {
		setQty(e.target.value);
	};
	const handleSize = e => {
		setSize(e.target.value);
	};
	const handleAddtoCart = () => {
		dispatch({
			type: 'ADD',
			id: data.id,
			name: data.name,
			price: finalPrice,
			qty: qty,
			priceOption: size,
			img:data.img
		});
		console.log(state);
	};
	let finalPrice = qty * parseInt(data.price[size]);
	return (
		<div className="box">
			<div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient">
				<div className="relative w-full h-80">
					<Image
						priority={false}
						src={data.img}
						layout="fill"
						objectFit="cover"
						alt="pizza"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<div className="p-4">
					<div className="font-bold mb-2 text-xl uppercase"> {data.name}</div>
					<p className="short_description text-gray-700 dark:text-gray-400 text-base">
						{data.description}
					</p>
				</div>
				<div className="flex px-4 justify-between">
					<select
						className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded"
						onChange={handleQty}
					>
						{Array.from(Array(6), (e, i) => {
							return (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							);
						})}
					</select>
					<select
						className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded"
						onChange={handleSize}
					>
						{prizeOptions.map(soptions => {
							return (
								<option key={soptions} value={soptions}>
									{soptions}
								</option>
							);
						})}
					</select>
				</div>
				<div className="flex p-4 font-bold  justify-between">
					<button
						className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100 "
						onClick={handleAddtoCart}
					>
						Add to cart
					</button>
					<p className="p-2 text-xl">₹{finalPrice}/-</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
