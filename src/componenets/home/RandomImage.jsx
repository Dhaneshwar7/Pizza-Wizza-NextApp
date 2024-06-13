import React, { useEffect, useState } from 'react';

const RandomImage = ({ category, imgAlt }) => {
	const [imageSrc, setImageSrc] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await fetch(
					`https://api.api-ninjas.com/v1/randomimage?category=${category}`,
					{
						method: 'GET',
						headers: {
							'X-Api-Key': 'c6ZMnpZhgtyIzGhZJlFAvA==dPM9Mgvm2uCK4plZ',
							Accept: 'image/jpg',
						},
					}
				);

				if (!response.ok) {
					const errorMessage = `Error: ${response.status} ${response.statusText}`;
					console.error(errorMessage);
					throw new Error(errorMessage);
				}

				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				setImageSrc(url);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchImage();
	}, [category]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{imageSrc ? <img src={imageSrc} alt={imgAlt} /> : <p>Loading...</p>}
		</div>
	);
};

export default RandomImage;
