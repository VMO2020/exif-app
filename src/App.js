import React, { useEffect, useState } from 'react';

// Components
import { Share } from './components/Share';

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
				<span>Image metadata and EXIF data viewer</span>
			</div>

			<section className='image-picker'>
				<ul className='accordion'>
					<li>
						<input type='radio' name='accordion' id='first' defaultChecked />
						<label htmlFor='first'>EXIF data viewer online</label>
						<div className='content'>
							<h1>
								"EXIF Image Data or EXIF Photography Data can be an important
								source of knowledge for discovering how photographers capture
								images and what tools they use in the process. It is a set of
								photo data that describes and gives details about the rights,
								who created them, when and for what, image size, camera or
								mobile model, lens aperture "f", shutter speed "S", ISO
								sensitivity, GPS data, date and more."
							</h1>
						</div>
					</li>
					<li>
						<input type='radio' name='accordion' id='second' />
						<label htmlFor='second'>Metadata viewer online</label>
						<div className='content'>
							<h2>
								"Image metadata, or photo metadata, summarizes basic information
								about the image, making it easy to find and work with particular
								instances of data. The metadata can be created manually to be
								more precise or automatically and contain more basic
								information, for example: The name of the author of the image,
								the copyright of the photo, the date of creation of the image,
								the date of modification of the image, the photo and the file
								size, etc.."
							</h2>
						</div>
					</li>
					<li>
						<input type='radio' name='accordion' id='third' />
						<label htmlFor='third'>XMP data viewer online</label>
						<div className='content'>
							<h2>
								"The XMP files data store changes made to your image in
								post-processing. Extracted XMP tags are grouped by namespace.
								Each one is separate object in output."
							</h2>
						</div>
					</li>
					<li>
						<input type='radio' name='accordion' id='fourth' />
						<label htmlFor='fourth'>Instructions</label>
						<div className='content'>
							<p>1.- Select an Image or Photograph.</p>
							<p>
								2.- The app will display the image, EXIF data, metadata and XMP
								data.
							</p>
							<p>3.- Optional: You can go to RESIZE IMAGE link.</p>
						</div>
					</li>
				</ul>

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
