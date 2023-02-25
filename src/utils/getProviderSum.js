export default function getProviderSum(provider, storageGB, transferGB) {
	let storageSum =
		provider.options.current[0] * (storageGB - provider.options.current[2])
	if (storageSum < 0) {
		storageSum = 0
	}
	let transferSum =
		provider.options.current[1] * (transferGB - provider.options.current[3])
	if (transferSum < 0) {
		transferSum = 0
	}
	let sum = storageSum + transferSum

	if (provider.minTotalPrice && sum < provider.minTotalPrice) {
		sum = provider.minTotalPrice
	}
	if (provider.maxTotalPrice && sum > provider.maxTotalPrice) {
		sum = provider.maxTotalPrice
	}
	return sum
}
