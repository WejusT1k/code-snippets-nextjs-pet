"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string){
	await db.snippet.update({
		where: { id },
		data: { code }
	})

	redirect(`/snippets/${id}`)
}

export const deleteSnippet = async (id: number) => {
	await db.snippet.delete({
		where: {id}
	})

	revalidatePath('/')
	redirect('/')
}

export const createSnippet = async (formState: {message: string},formData: FormData) => {
	// check the user inputs and make sure they're valid
	const title = formData.get('title');
	const code  = formData.get('code');

	if(typeof title !== 'string' || title.length < 3)
		return {
			message: 'Title must be longer'
		}
	
	if(typeof code !== 'string' || code.length < 10)
		return {
			message: 'Code must be longer'
		}

	// create new record in the db

	try {
		await db.snippet.create({
			data: {
				title,
				code
			}
		});
	}
	catch(err: unknown) {
		if(err instanceof Error){
			return {
				message: err.message
			}
		}
		else {
			return {
				message: 'Unexpected error'
			}
		}
	}

	// redirect the user back to the root route
	revalidatePath('/');
	redirect('/');
};