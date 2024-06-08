'use strict';
import Card from '@/componenets/home/Card';
import CarouselComponent from '@/componenets/home/Carousel';
import cardData from '@/store/cardData.json';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	let categories = new Set();
	const foodData = [];
	const handleCatData = () => {
		cardData.map(data => {
			return foodData.push(data), categories.add(data.category);
		});
	};

	handleCatData();
	const categoryArray = [...categories];
	return (
		<>
			<CarouselComponent />
			<div className="container mx-auto">
				{categoryArray.map(category => {
					return (
						<>
							<div
								key={category}
								className="text-4xl mt-10 mb-3 uppercase font-bold"
							>
								{category}
							</div>
							<hr />
							<div className="flex flex-col items-center justify-center">
								<div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
									{foodData
										?.filter(foodData => category === foodData.category)
										?.map(data => {
											return <Card key={data.id} foodData={data} />;
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
