import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const EventPage = ({ data }) => {
	const { image, title, description } = data;
	const inputEmail = useRef();
	const router = useRouter();
	const [message, setMessage] = useState('');

	const onRegisterClick = async (e) => {
		e.preventDefault();
		const emailValue = inputEmail.current.value;
		const eventId = router?.query.slug;

		try {
			const response = await fetch('/api/email-registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: emailValue, eventId })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const data = await response.json();
			setMessage(data.message);
			inputEmail.current.value = '';
		} catch (e) {
			console.log('ERROR', e);
		}
	};

	return (
		<div>
			<Image src={image} width={500} height={500} alt={title} />
			<h1>{title}</h1>
			<p>{description}</p>
			<form onSubmit={onRegisterClick}>
				<label>Get registered for this event</label>
				<input ref={inputEmail} type={'email'} id='email' placeholder='Please insert your email here' />
				<button>Submit</button>
				<p>{message}</p>
			</form>
		</div>
	)
};

export default EventPage;

export async function getStaticPaths() {
	const { allEvents } = await import('/data/data.json');

	const allPaths = allEvents.map(event => {
		return {
			params: {
				slug: event.id,
				category: event.city
			}
		}
	});

	return {
		paths: allPaths,
		fallback: false
	}
}

export async function getStaticProps(context) {
	const slug = context.params.slug;
	const { allEvents } = await import('/data/data.json');
	const eventData = allEvents.find(event => event.id === slug);

	return {
		props: {
			data: eventData
		}
	}
}