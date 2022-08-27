import { PieChart } from 'react-minimal-pie-chart';

const Chart = (props) => {
	return (
		<div>
			<PieChart
				animate
				animationDuration={500}
				animationEasing="ease-out"
				center={[ 50, 50 ]}
				paddingAngle={0}
				data={[
					{ title: 'Occupied Beds', value: 50, color: '#DC143C' },
					{ title: 'Available Beds', value: 50, color: '#3CB371' }
				]}
				viewBoxSize={[ 100, 100 ]}
				label={(data) => data.dataEntry.title}
				labelPosition={70}
				labelStyle={{
					fontSize: '4px',
					fontColor: 'white',
					fontWeight: '800'
				}}
				lengthAngle={360}
				totalValue={100}
				startAngle={0}
				lineWidth={50}
				radius={25}
			/>
		</div>
	);
};

export default Chart;
