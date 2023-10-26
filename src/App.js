import React, { useEffect, useState } from 'react';

// Components
import { Share } from './components/Share';
import { AppText } from './components/AppText';

// Hooks
import { useDevice } from '../src/hooks/useDevice';

// Icons
import { ReactComponent as Icon1 } from './assets/icons/image.svg';

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

	// const { width, height, device, lang, mode, userLang } = useDevice();
	const { device } = useDevice(); // device = mobile, tablet or desktop

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

		// Scroll to image
		handlescroll();
	};

	const handlescroll = () => {
		setTimeout(() => {
			document
				.getElementById('photo')
				.scrollIntoView({ behavior: 'smooth', block: 'start' }, true);
		}, 500);
	};

	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			openFullscreen();
		}
	}

	// View in fullscreen
	function openFullscreen() {
		// Get the documentElement (<html>) to display the page in fullscreen */
		const elem = document.documentElement;

		if (elem.requestFullscreen) {
			// Full screen
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			// Full screen in Firefox
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			// Full screen in Chrome, Safari y Opera
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			// Full screen in IE11 y Edge
			elem.msRequestFullscreen();
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	useEffect(() => {
		previewIMG &&
			exifr
				.parse(`${previewIMG}`, { userComment: true, xmp: true })
				.then((output) => setDataValue(output));
	}, [previewIMG]);

	return (
		<div className='.general__container exif'>
			<div className='title'>
				<h1>Image metadata and EXIF data viewer</h1>
				{device === 'mobile' && (
					<button className='btn' onClick={toggleFullScreen}>
						Full Screen
					</button>
				)}
			</div>

			<section className='image-picker'>
				{/* <h3>{device}</h3> */}

				<AppText />

				<h3>Images: JPEG, JPG, PNG & TIFF</h3>

				<Share url={'exif.vmog.net'} />

				<input
					id='uploader'
					type='file'
					accept='.jpeg, .jpg, .png'
					onChange={handleInputChange}
				/>
				<div className='label-container'>
					<label htmlFor='uploader' className='btn__click'>
						<Icon1 />
						<span>Select Image</span>
					</label>
				</div>
				<br />

				<div className='image-container'>
					<span id='photo' />
					{previewIMG && (
						<pre>
							<img src={`${img}`} id='img1' alt='File type not supported' />
							<p>Name: {imgName}</p>
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
									<p>Size: {Math.trunc(imgSize / 1000)} KB</p>
								</>
							)}
						</pre>
					)}
				</div>

				<div className='link'>
					{previewIMG && (
						<a
							href='https://image.vmog.net/'
							target='_blank'
							rel='noreferrer'
							className='btn btn__link'
						>
							Go to RESIZE IMAGE
						</a>
					)}
				</div>

				{previewIMG && <h2>EXIF data + Metadata + XMP data: </h2>}
				<div className='data-container'>
					{previewIMG && (
						<pre id='allMetaDataPrev' className='text-container'>
							<p id='data'>{JSON.stringify(dataValue, null, '\t')}</p>
						</pre>
					)}
				</div>
			</section>

			<footer>
				<p>
					<a href='https://vmog.net/' target='_blank' rel='noreferrer'>
						Copyright and web design by © VMOG
					</a>
				</p>
				<p> Liverpool UK 2022 </p>
			</footer>
		</div>
	);
}

export default App;
