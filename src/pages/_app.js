import '@/styles/globals.css'
import '@/styles/general.scss'
import MainLayout from '@/components/layouts/main-layout'

export default function App({ Component, pageProps }) {
	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	)
}
