import AllEvents from '@/components/events/events-page';

const EventsPage = ({ data }) => {
	return <AllEvents data={data} />
};

export default EventsPage;

export async function getStaticProps() {
	const { events_categories: eventsCategories } = await import('/data/data.json');

	return {
		props: {
			data: eventsCategories
		}
	}
}