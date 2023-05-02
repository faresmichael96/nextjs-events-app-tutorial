import Image from 'next/image';
import Link from 'next/link';

const EventsCategoryPage = ({ data, pageName }) => {
	return (
		<div>
			<h1>Events in {pageName}</h1>
			<div>
				{
					data.map((event) => (
						<Link
							key={event.id}
							href={`/events/${event.city}/${event.id}`}
							passHref
						>
							<div style={{ width: '100%', height: '100%', position: 'relative' }}>
								<Image
									src={event.image}
									alt={event.title}
									width={300}
									height={300}
								/>
							</div>
							<h2>{event.title}</h2>
							<p>{event.description}</p>
						</Link>
					))
				}
			</div>
		</div>
	)
};

export default EventsCategoryPage;

export async function getStaticPaths() {
	const { events_categories: eventsCategories } = await import('/data/data.json');
	const allPaths = eventsCategories.map((event) => {
		return {
			params: {
				category: event.id.toString()
			}
		}
	});

	return {
		paths: allPaths,
		fallback: false
	}
}

export async function getStaticProps(context) {
	const id = context?.params.category;
	const { allEvents } = await import('/data/data.json');
	const data = allEvents.filter(event => event.city === id);

	return {
		props: {
			data,
			pageName: id
		}
	}
}