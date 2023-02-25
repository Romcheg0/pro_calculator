import React, { useEffect, useState } from 'react'
import getProviderSum from '../../utils/getProviderSum'
import './CustomChart.css'
export default function CustomChart({ bars, storageGB, transferGB }) {
	const [align, setAlign] = useState('horizontal') //Screen alignment
	const [max, setMax] = useState(100) //Max total price of bar
	const [data, setData] = useState(bars) //Data copy to work with
	function sortComparator(a, b) {
		//Comparator for sorting the data
		return (
			getProviderSum(a, storageGB, transferGB) -
			getProviderSum(b, storageGB, transferGB)
		)
	}
	function prepareData() {
		//Sorting and coloring
		let temp = data.concat()
		temp.sort(sortComparator) //sorting by total price
		let defaultColor = bars[temp.length - 1].backGround
		const cheapestColor = 'linear-gradient(to top right, #FFB04A, #ff9100)'
		let tempMaxSum = getProviderSum(
			temp[temp.length - 1],
			storageGB,
			transferGB
		) //get max price to set the chart size
		tempMaxSum < 300 ? setMax(300) : setMax(tempMaxSum)
		let min = getProviderSum(temp[0], storageGB, transferGB) //get min price to set the color of the cheapest element

		for (let item of data) {
			//set the color of the cheapest element and sort data by label
			temp.splice(temp.indexOf(item), 1)
			let minItem = Object.assign({}, item)
			minItem.backGround =
				getProviderSum(item, storageGB, transferGB) === min
					? cheapestColor
					: defaultColor
			temp.push(minItem)
			temp.sort((a, b) => {
				return a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
			})
			setData([...temp])
		}
	}
	useEffect(() => {
		prepareData()
		window.addEventListener('resize', () => {
			window.innerWidth < 768 ? setAlign('vertical') : setAlign('horizontal')
		})
	}, [])

	return (
		<section className={`chart ${align}`}>
			<div className={`bars ${align}`}>
				{data.map((bar, index) => {
					return (
						<div
							className={`bar ${align}`}
							key={index}
							style={
								align === 'vertical'
									? {
											width: `calc(80% / ${data.length})`,
									  }
									: {
											height: `calc(80% / ${data.length})`,
									  }
							}
						>
							<div className={`bar__value ${align}`}>
								{getProviderSum(bar, storageGB, transferGB) + bar.currency}
							</div>
							<div
								className={`bar__body ${align}`}
								style={
									align === 'vertical'
										? {
												height:
													getProviderSum(bar, storageGB, transferGB) === max
														? '90%'
														: (getProviderSum(bar, storageGB, transferGB) /
																max) *
																90 +
														  '%',
												background: bar.backGround,
										  }
										: {
												width:
													getProviderSum(bar, storageGB, transferGB) === max
														? '90%'
														: (getProviderSum(bar, storageGB, transferGB) /
																max) *
																90 +
														  '%',
												background: bar.backGround,
										  }
								}
							/>
						</div>
					)
				})}
			</div>
			<div className={`labels ${align}`}>
				{data.map((bar, index) => {
					return (
						<div
							key={index}
							style={
								align === 'vertical'
									? { width: `calc(80% / ${data.length})` }
									: {
											height: `calc(80% / ${data.length})`,
									  }
							}
							className={`bar__label ${align}`}
						>
							<div className="bar__label__container">
								<span className="bar__label__text">{bar.label}</span>
								{Object.entries(bar.options).length > 1 &&
									Object.entries(bar.options)
										.slice(1)
										.map((option, index) => {
											let key = option[0]
											let value = option[1]
											return (
												<div
													className="bar__label__option__container"
													key={key}
												>
													<input
														type="radio"
														name={bar.label}
														id={`bar__label__option${index}`}
														defaultChecked={
															Object.values(bar.options)[1] === value
														}
														onChange={() => {
															let temp = Object.assign({}, bar)
															temp.options.current = value
															setData(
																[
																	...data.filter((item) => item !== bar),
																	temp,
																].sort((a, b) => {
																	return a.label.toLowerCase() <
																		b.label.toLowerCase()
																		? -1
																		: 1
																})
															)
															prepareData()
														}}
														value={key}
														className="bar__option__input"
													/>
													<label
														htmlFor={`bar__label__option${index}`}
														className="bar__option__label"
													>
														{key}
													</label>
												</div>
											)
										})}
							</div>
							<img
								src={bar.image}
								alt={bar.label}
								className="bar__label__image"
							/>
						</div>
					)
				})}
			</div>
		</section>
	)
}
