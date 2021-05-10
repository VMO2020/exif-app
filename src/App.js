import React, { useEffect, useState } from 'react';

// Components
import { Share } from './components/Share';

// Icons
import { ReactComponent as Icon1 } from './icons/photo.svg';

// Styles
import './app.scss';

// Library
import exifr from 'exifr'; // => exifr/dist/full.umd.cjs

function App() {
	const [previewIMG, setPreviewIMG] = useState();
	const [dataValue, setDataValue] = useState('');
	const [img, setIMG] = useState('');
	const [imgName, setImgName] = useState('');
	const [imgSize, setImgSize] = useState('');

	// INPUT IMAGE
	const handleInputChange = (e) => {
		const reset = '';
		setPreviewIMG(reset);

		// Get the image selected mobile friendly
		setIMG(URL.createObjectURL(e.target.files[0]));

		// Get the image selected
		const file = document.querySelector('#uploader').files[0];
		// const file = (e.target.files[0]);

		// Create a FileReader (Object)
		const reader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
			reader.name = file.name; //get the image's name
			reader.size = file.size; //get the image's size GB
		} else {
			setPreviewIMG('');
			console.log('No Image Loaded');
		}

		reader.onloadend = function () {
			setPreviewIMG(reader.result);
			setImgName(reader.name);
			setImgSize(reader.size);
		};
	};

	useEffect(() => {
		{
			previewIMG &&
				exifr
					.parse(`${previewIMG}`, { userComment: true, xmp: true })
					.then((output) => setDataValue(output));
		}
	}, [previewIMG]);

	return (
		<div className='.general__container exif'>
			<div className='title'>
				<span>Image Metadata EXIF viewer</span>
			</div>

			<section className='image-picker'>
				<h1>
					"The EXIF and XMP metadata, are a set of data that include all kinds
					of information, describing and providing details about the rights, who
					created them, when and what use, image size, camera or mobile model,
					focal length, ISO sensitivity, shutter speed, GPS data and more."
				</h1>
				<h3>Images: JPEG, JPG & PNG</h3>

				<Share url={'exif.vmog.net'} />

				<input
					id='uploader'
					type='file'
					accept='.jpeg, .jpg, .png'
					onChange={handleInputChange}
				/>
				<div className='label-container'>
					<label htmlFor='uploader' className='btn-click'>
						<Icon1 />
						<span>Choose a Photo</span>
					</label>
				</div>
				<hr />

				<div className='image-container'>
					{previewIMG && (
						<pre>
							<img src={`${img}`} id='img1' alt='File type not supported' />
							<p>
								Name: {imgName} Size: {Math.trunc(imgSize / 1000)} KB
							</p>
							{dataValue && (
								<>
									<p>
										Model: {dataValue.Model} Lens: {dataValue.Lens}
									</p>
									<p>
										ISO: {dataValue.ISO} f/{dataValue.FNumber} S: 1/
										{Math.trunc(1 / dataValue.ExposureTime)} FL:{' '}
										{dataValue.FocalLength}mm{' '}
									</p>
								</>
							)}
						</pre>
					)}
				</div>

				<div className='data-container'>
					{previewIMG && (
						<pre id='allMetaDataPrev' className='text-container'>
							<p>{JSON.stringify(dataValue, null, '\t')}</p>
						</pre>
					)}
				</div>
			</section>
			<footer>
				<p>
					{' '}
					<a href='https://vmog.net/' target='_blank' rel='noreferrer'>
						Copyright © and web design by VMOG
					</a>
				</p>
				<p> Liverpool UK 2021 </p>
			</footer>
		</div>
	);
}

export default App;
