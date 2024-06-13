import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const randomImgUrl = [
	{
		category1:
			'https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category2:
			'https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category3:
			'https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		category1:
			'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category2:
			'https://images.unsplash.com/photo-1625242662167-9ba73d268139?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category3:
			'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		category1:
			'https://images.unsplash.com/photo-1630278156268-12d56c2e135f?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category2:
			'https://images.unsplash.com/photo-1575417634984-8e608b88a04b?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category3:
			'https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		category1:
			'https://plus.unsplash.com/premium_photo-1679436987530-ee11b5600161?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category2:
			'https://images.unsplash.com/photo-1575080424619-0f203e09e6ec?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category3:
			'https://images.unsplash.com/photo-1571805618149-3a772570ebcd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
];

function CarouselComponent() {
	const [randomIndex, setRandomIndex] = useState(0);

	useEffect(() => {
		// Select a random index when the component mounts
		const index = Math.floor(Math.random() * randomImgUrl.length);
		setRandomIndex(index);
		// console.log(index);
	}, []);

	const selectedCategories = randomImgUrl[randomIndex];
	// console.log(selectedCategories);

	return (
		<Carousel
			autoPlay
			navButtonsAlwaysVisible
			infiniteLoop
			showStatus={false}
			emulateTouch
			showThumbs={false}
		>
			{Object.values(selectedCategories).map((category, index) => (
				<div
					key={index}
					style={{ maxHeight: '36rem' }}
					className="object-center brightness-50"
				>
					<img
						src={`${category}`}
						alt={`Random ${category}`}
					/>
				</div>
			))}
		</Carousel>
	);
}

export default CarouselComponent;
