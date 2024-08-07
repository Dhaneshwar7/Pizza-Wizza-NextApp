'use strict';
import Card from '@/componenets/home/Card';
import CarouselComponent from '@/componenets/home/Carousel';
import { baseUrl } from '@/utils/baseUrl';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ data }) {
	let categories = new Set();
	const [typeFilter, setTypeFilter] = useState(false);
	const foodData = [];
	const handleCatData = () => {
		data?.map(data => {
			return foodData.push(data), categories.add(data.category);
		});
	};

	handleCatData();
	const categoryArray = [...categories];
	// useEffect(() => {
	// 	localStorage.setItem('isAdmin', false); //added this line here to prevent anyone from accessing /admin if not logged in.
	// }, []);
	return (
		<>
			<Head>
				<title>Pizza 🍕🏠</title>
			</Head>
			<CarouselComponent />
			<div className="container mx-auto">
				<div className="my-6 space-x-5">
					<button
						className={`border-black rounded-full dark:border-white text-black dark:text-gray-100 border-2 py-1 px-3 ${
							!typeFilter && 'bg-slate-300 dark:bg-slate-700 '
						} `}
						onClick={() => setTypeFilter(false)}
					>
						All
					</button>
					<button
						className={`border-black rounded-full dark:border-white border-2 text-black dark:text-gray-100 py-1 px-3 ${
							typeFilter === 'Veg' && 'bg-slate-300 dark:bg-slate-700 '
						} `}
						onClick={() => {
							setTypeFilter('Veg');
						}}
					>
						<span
							className={
								'lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500'
							}
						>
							●
						</span>
						Veg
					</button>
					<button
						className={`border-black rounded-full dark:border-white text-black dark:text-gray-100 border-2 py-1 px-3 ${
							typeFilter === 'Non-Veg' && 'bg-slate-300  dark:bg-slate-700 '
						} `}
						onClick={() => {
							setTypeFilter('Non-Veg');
						}}
					>
						<span
							className={
								'lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500'
							}
						>
							●
						</span>
						Non Veg
					</button>
				</div>
				{categoryArray.map((category, index) => {
					return (
						<>
							<div
								key={index}
								className="text-4xl text-black dark:text-white mt-10 mb-3 uppercase font-bold"
							>
								{category}
							</div>
							<hr />
							<div className="flex flex-col items-center justify-center">
								<div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
									{foodData
										?.filter(foodData => category === foodData.category)
										?.filter(foodData =>
											typeFilter ? typeFilter === foodData.foodType : foodData
										)
										?.map((data, idx) => {
											return <Card key={idx} foodData={data} />;
										})}
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}
export async function getStaticProps() {
	let data;
	try {
		const pizzaData = await fetch(baseUrl + 'api/foodData', { method: 'GET' })
			.then(response => response.json())
			.catch(error => error.message);

		data = await JSON.parse(JSON.stringify(pizzaData)); // step required during deployment in staticProps
	} catch (error) {
		console.log(error.message);
	}

	return {
		props: {
			data: data.data || null,
		},
		revalidate: 10,
	};
}
