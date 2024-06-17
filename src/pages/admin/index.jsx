import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Admin = () => {
	const router = useRouter();
	const sidePriceOptions = { single: '', double: '' };
	const pizzaPriceOptions = { regular: '', medium: '', large: '' };
	const [foodData, setFoodData] = useState({
		name: '',
		foodCategory: '',
		foodType: '',
		price: '',
		description: '',
		img: '',
	});

	const handleChange = e => {
		setFoodData(prevdata => {
			return { ...prevdata, [e.target.name]: e.target.value };
		});
		// console.log(foodData);

		if (e.target.name === 'foodCategory') {
			if (e.target.value === 'Pizza') {
				setFoodData(prevData => {
					return { ...prevData, price: pizzaPriceOptions };
				});
			} else if (e.target.value === 'SIDES & BEVERAGES') {
				setFoodData(prevData => {
					return { ...prevData, price: sidePriceOptions };
				});
			} else {
				setFoodData(prevData => {
					return { ...prevData, price: e.target.value };
				});
			}
		}
	};
	const handleSubmit = async e => {
		e.preventDefault();
		// console.log(foodData);

		const response = await fetch('api/createFoodData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(foodData),
		});
		const result = await response.json();
		if (result.success) {
			alert('Food Data Created Successfully');
			router.push('/');
		} else {
			alert('Failed to Create Data');
		}
	};

	return (
		<div
			style={{
				minheight: '80vh',
				backgroundImage:
					'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
				backgroundSize: 'cover',
			}}
			className="flex justify-center items-center"
		>
			<div className="container w-full max-w-md">
				<form
					onSubmit={handleSubmit}
					className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mt-4 mb-4"
				>
					<div className="mb-3">
						<label
							htmlFor="name"
							className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
						>
							Food Name
						</label>
						<input
							placeholder="Enter Food Name"
							name="name"
							onChange={handleChange}
							type="text"
							required
							className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
							value={foodData.name}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="foodCategory"
							className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
						>
							Food Category
						</label>
						<select
							style={{ '-webkit-appearance': 'auto' }}
							name="foodCategory"
							onChange={handleChange}
							type="foodCategory"
							required
							className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
							value={foodData.foodCategory}
						>
							<option value="">Select Category</option>
							<option value="Pizza">PIZZA</option>
							<option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
						</select>
					</div>
					<div className="mb-3">
						<label
							htmlFor="foodType"
							className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
						>
							Food Type
						</label>
						<select
							style={{ '-webkit-appearance': 'auto' }}
							name="foodType"
							onChange={handleChange}
							type="text"
							required
							className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
							value={foodData.foodType}
						>
							<option value="">Select Food Type</option>
							<option value="Veg">VEG</option>
							<option value="Non-Veg">NON-VEG</option>
						</select>
					</div>
					{foodData.foodCategory !== '' && (
						<div className="mb-4">
							<label
								htmlFor="foodType"
								className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
							>
								Food Price
							</label>
							{foodData.price !== '' &&
								Object.keys(foodData.price).map(data => {
									return (
										<div
											key={data}
											className="ml-4 mb-2 flex items-center gap-3"
										>
											<label
												className="inline-block pl-8 m-auto w-full text-gray-700 capitalize  dark:text-gray-300 text-sm font-bold mb-2"
												htmlFor={data}
											>
												{data}
											</label>
											<input
												key={data}
												type="number"
												name={data}
												placeholder={`Price of ${data}`}
												value={foodData?.price[data]}
												onChange={e => {
													setFoodData({
														...foodData,
														price: {
															...foodData.price,
															[data]: e.target.value,
														},
													});
												}}
												className="shadow appearance-none border border-gray-300 rounded w-full mr-8 py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
											/>
										</div>
									);
								})}
						</div>
					)}

					<div className="mb-2">
						<label
							htmlFor="description"
							className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
						>
							Description
						</label>
						<textarea
							rows={4}
							placeholder="description"
							name="description"
							onChange={handleChange}
							type="text"
							required
							className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
							value={foodData.description}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="img"
							className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
						>
							Food Image
						</label>
						<input
							placeholder="img"
							name="img"
							onChange={handleChange}
							type="url"
							required
							className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
							value={foodData.img}
						/>
					</div>
					<button
						type="submit"
						className="border font-bold text-gray-900 dark:text-gray-100 dark:border-gray-400 border-gray-900 rounded p-2 mr-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100"
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
};

export default Admin;
