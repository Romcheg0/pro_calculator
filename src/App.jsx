import { useState } from 'react'
import CustomChart from './Components/CustomChart/CustomChart'
import SliderInput from './Components/SliderInput/SliderInput'
import data from './providers'
import './App.css'
export default function App() {
	const [storage, setStorage] = useState(0)
	const [transfer, setTransfer] = useState(0)
	return (
		<div className="App">
			<div className="inputs__container">
				<SliderInput
					onChange={(e) => {
						setStorage(e.target.value)
					}}
					value={storage}
					name="Storage"
				/>
				<SliderInput
					onChange={(e) => {
						setTransfer(e.target.value)
					}}
					value={transfer}
					name="Transfer"
				/>
			</div>
			<CustomChart bars={data} storageGB={storage} transferGB={transfer} />
		</div>
	)
}
