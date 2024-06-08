'use strict'
import Card from '@/componenets/home/Card';
import CarouselComponent from '@/componenets/home/Carousel';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<CarouselComponent/>
			<Card/>
		</>
	);
}
