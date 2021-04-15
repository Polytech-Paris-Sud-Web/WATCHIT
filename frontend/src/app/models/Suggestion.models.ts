export interface Suggestion{
	"id": number,
	"type": number,
	"name": string,
	"commentaire": string,
	"state": boolean,
	"createdAt": string,
	"updatedAt": string,
	"author": string,
	"owner": string
}


export interface SuggestionUpdate{ 
	"id": number, 
	"type": number, 
	"name": string, 
	"commentaire": string, 
	"state": boolean, 
	"author": string, 
	"owner": string 
}