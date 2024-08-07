'use client';

import { Editor } from "@monaco-editor/react";
import { Snippet } from '@prisma/client';
import { useState } from "react";
import * as actions from '@/actions';

interface IProps {
	snippet: Snippet
}

export default function EditSnippetForm(props: IProps) {
	const snippet = props.snippet;
	const [code, setCode] = useState(snippet.code);

	const handleEditorChange = (value: string = "") => {
		setCode(value);
	}

	const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

	return <div>
		<form action={editSnippetAction}>
			<Editor 
				height="40vh"
				theme="vs-dark"
				defaultLanguage="javascript"
				value={code}
				onChange={handleEditorChange}
				options={{
					minimap: { enabled: false }
				}}
			/>
			<button
				type="submit"
				className="p-2 border rounded"
			>
				Save
			</button>
		</form>
	</div>
}