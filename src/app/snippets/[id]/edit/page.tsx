import EditSnippetForm from "@/components/EditSnippetForm";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface IProps {
	params: {
		id: string
	}
}

export default async function SnippetEditPage(props: IProps) {
	const id = parseInt(props.params.id);

	const snippet = await db.snippet.findFirst({
		where: {
			id
		}
	})

	if(!snippet)
		return notFound();

	return <div>
		<EditSnippetForm snippet={snippet}/>
	</div>
}