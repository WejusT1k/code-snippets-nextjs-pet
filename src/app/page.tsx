import { db } from "@/db";
import Link from 'next/link';

export default async function Home() {
	const response = await db.snippet.findMany();
	return (
		<div>
			<div className="flex m-2 justify-between items-center">
				<h1 className="text-xl font-bold">Snippets</h1>
				<Link
					href="/snippets/new"
					className="border p-2 rounded"
				>
					New
				</Link>
			</div>
			<div className="flex flex-col gap-2">
				{response.map(snippet => {
					return (
						<Link
							href={`/snippets/${snippet.id}`}
							className="flex justify-between items-center p-2 border rounded"
							key={snippet.id}
						>
							<div>{snippet.title}</div>
							<div>View</div>
						</Link>
					)
				})}
			</div>
		</div>
	);
}
