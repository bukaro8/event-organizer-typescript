function simpleUUID(uuid: string): string {
	// Remove dashes and take the first 6 characters
	const cleanUuid = uuid.replace(/-/g, '').slice(0, 6);

	// Convert hex to a readable pattern (letter-number alternation)
	return cleanUuid
		.split('')
		.map((char, index) =>
			index % 2 === 0
				? String.fromCharCode(97 + (parseInt(char, 16) % 26))
				: char
		)
		.join('');
}
export default simpleUUID;
