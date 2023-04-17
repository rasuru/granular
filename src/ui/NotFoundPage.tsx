import { Link } from 'react-router-dom';
import { Header } from './Header';

export function NotFoundPage() {
	return (
		<div>
			<Header />
			<section className="mx-auto max-w-7xl px-4 py-32">
				<div className="mx-auto w-full lg:w-1/3">
					<p className="mt-5 mb-3 text-xl font-bold text-black md:text-2xl">
						Page not found (404)
					</p>
					<p className="mb-3 text-base font-medium text-gray-700">
						The page you're looking for may have moved or no longer exists.
					</p>
					<Link to="/" className="underline">
						Go to home page
					</Link>
				</div>
			</section>
		</div>
	);
}
