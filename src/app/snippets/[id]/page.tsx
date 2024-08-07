import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from 'next/link';
import * as actions from '@/actions';

interface SnippetShowPageProps {
  params: {
    id: string
  }
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
	const id = props.params.id;
	const snippet = await db.snippet.findFirst({
		where: { id: parseInt(id) }
	})
	console.log(snippet);

	if(!snippet)
		return notFound();

	const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

	return <div>
		<div className="flex m-4 justify-between items-center">
			<h1 className="text-xl font-bold">{snippet.title}</h1>
			<div className="flex items-center gap-2">
				<Link
					href={`/snippets/${snippet.id}/edit`}
					className="p-2 border rounded"
				>
					Edit
				</Link>
				<form action={deleteSnippetAction}>
					<button
						type="submit"
						className="p-2 border rounded"
					>
							Delete
					</button>
				</form>
			</div>
		</div>
		<pre className="p-3 border rounded bg-gray-200 border-gray-200">
			{snippet.code}
		</pre>
	</div>
}