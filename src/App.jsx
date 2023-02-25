import CustomChart from './Components/CustomChart/CustomChart'
import data from './providers'
export default function App() {
	return (
		<div className="App">
			<CustomChart bars={data} storageGB="100" transferGB="200" />
		</div>
	)
}
