import React from 'react'
import './SliderInput.css'

export default function SliderInput({
	onChange,
	value,
	min = 0,
	max = 1000,
	step = 1,
	name = 'value',
}) {
	return (
		<div className="input__wrapper">
			<div className="input__heading">
				<div>{name} :</div>
				<div>{value} GB</div>
			</div>
			<div className="input__container">
				<div className="input__border input__order__left">
					<div className="input__dash"></div>
					<span className="input__min">{min}</span>
				</div>
				<input
					type="range"
					name="Gigabytes"
					id="GBInput"
					className="GBInput"
					onChange={onChange}
					min={min}
					max={max}
					step={step}
					value={value}
				/>
				<div className="input__border input__order__right">
					<div className="input__dash"></div>
					<span className="input__max">{max}</span>
				</div>
			</div>
		</div>
	)
}
