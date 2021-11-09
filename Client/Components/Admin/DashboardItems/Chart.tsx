import { useTheme } from '@mui/material/styles';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time: string, amount?: number) {
	return { time, amount };
}

const data = [
	createData('Monday', 0),
	createData('Tuesday', 3),
	createData('Wednesday', 6),
	createData('Thursday', 8),
	createData('Friday', 1),
	createData('Saturday', 2),
	createData('Sunday', 4),
];

export default function Chart() {
	const theme = useTheme();

	return (
		<>
			<Title>This Week</Title>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}>
					<XAxis
						dataKey='time'
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}
					/>
					<YAxis
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}>
						<Label
							angle={270}
							position='left'
							style={{
								textAnchor: 'middle',
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}>
							Items Sold
						</Label>
					</YAxis>
					<Line
						isAnimationActive={false}
						type='monotone'
						dataKey='amount'
						stroke={theme.palette.primary.main}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}
