import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from 'recharts';
import { getWeeklyTotals } from '../../../api';
import Title from './Title';

interface totals {
	totals: {
		current: number;
		previousLess1: number;
		previousLess2: number;
		previousLess3: number;
		previousLess4: number;
		previousLess5: number;
		previousLess6: number;
	};

	setWeeklyTotals: Function;
}

// Generate Sales Data
function createData(time: string, amount?: number) {
	return { time, amount };
}

export default function Chart() {
	const [weeklyTotals, setWeeklyTotals] = useState<totals>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>(null);
	const theme = useTheme();

	useEffect(() => {
		if (weeklyTotals) {
			setData([
				createData('Today', weeklyTotals?.totals.current),
				createData('1', weeklyTotals?.totals.previousLess1),
				createData('2', weeklyTotals?.totals.previousLess2),
				createData('3', weeklyTotals?.totals.previousLess3),
				createData('4', weeklyTotals?.totals.previousLess4),
				createData('5', weeklyTotals?.totals.previousLess5),
				createData('6', weeklyTotals?.totals.previousLess6),
			]);
		}
	}, [weeklyTotals]);

	useEffect(() => {
		getWeeklyTotals(setWeeklyTotals, setIsLoading);
	}, []);

	return (
		<>
			<Title>This Week</Title>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 16,
						right: 16,
						bottom: 30,
						left: 24,
					}}>
					<XAxis
						dataKey='time'
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}>
						<Label
							angle={0}
							position='bottom'
							style={{
								textAnchor: 'middle',
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}>
							Previous 7 days
						</Label>
					</XAxis>
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
