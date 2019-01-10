export default function isEven(number) {
	return {
		status: number % 2 === 0,
		number,
	};
}
