import { CartContext } from '@/utils/ContextReducer';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const Card = props => {
	const data = props.foodData;
	const { state, dispatch } = useContext(CartContext);
	const prizeOptions = Object.keys(data.price);
	const [qty, setQty] = useState(1);
	const [size, setSize] = useState(prizeOptions[0]);

	const handleQty = e => {
		setQty(parseInt(e.target.value));
	};

	const handleSize = e => {
		setSize(e.target.value);
	};

	const handleAddtoCart = () => {
		const tempId = data['_id'] + size;
		const existingItem = state.find(item => item.tempId === tempId);

		const finalPrice = qty * parseInt(data.price[size]);

		if (!existingItem) {
			dispatch({
				type: 'ADD',
				id: data['_id'],
				tempId: tempId,
				name: data.name,
				price: finalPrice,
				qty: qty,
				priceOption: size,
				img: data.img,
			});
		} else {
			dispatch({
				type: 'UPDATE',
				tempId: tempId,
				price: finalPrice,
				qty: qty,
			});
		}
	};

	const finalPrice = qty * parseInt(data.price[size]);

	return (
		<div className="box">
			<div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient">
				<Link href={{ pathname: '/Item/[item]' }} as={`Item/${data['_id']}`}>
					{' '}
					<div className="relative w-full h-80">
						<Image
							className="object-contain"
							priority={false}
							src={data.img}
							alt="food item"
							placeholder="empty"
							layout="fill"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
					<div className="p-4">
						<div className="font-bold mb-2 text-xl uppercase">{data.name}</div>
						<p className="short_description text-gray-700 dark:text-gray-400 text-base">
							{data.description}
						</p>
					</div>
				</Link>
				<div className="flex px-4 justify-between">
					<select
						className="h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
						value={qty}
						onChange={handleQty}
					>
						{Array.from({ length: 6 }, (e, i) => (
							<option key={i+1} value={i + 1}>
								{i + 1}
							</option>
						))}
					</select>
					<select
						className="h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
						value={size}
						onChange={handleSize}
					>
						{prizeOptions.map((options, index) => (
							<option key={index} value={options}>
								{options}
							</option>
						))}
					</select>
				</div>
				<div className="flex p-4 font-bold justify-between">
					<button
						className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
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
