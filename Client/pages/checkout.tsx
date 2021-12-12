import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../Components/Checkout/AddressForm';
import PaymentForm from '../Components/Checkout/PaymentForm';
import Review from '../Components/Checkout/Review';
import { useAppSelector } from '../Redux/hooks';
import { RootState } from '../Redux/store';

interface address {
	firstName: string;
	lastName: string;
	addressLineOne: string;
	email: string;
	city: string;
	county: string;
	postCode: string;
	country: string;
}

const steps = ['Shipping address', 'Payment details'];

function GetStepContent(step: number) {
	const [address, setAddress] = useState<address>({
		firstName: '',
		lastName: '',
		addressLineOne: '',
		email: '',
		city: '',
		county: '',
		postCode: '',
		country: '',
	});
	switch (step) {
		case 0:
			return <AddressForm address={address} setAddress={setAddress} />;
		case 1:
			return <PaymentForm address={address} />;
		default:
			throw new Error('Unknown step');
	}
}

const theme = createTheme();

export default function Checkout() {
	const [activeStep, setActiveStep] = React.useState(0);
	const isComplete = useAppSelector((state: RootState) => state.form.value);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
				<Paper
					variant='outlined'
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
					<Typography component='h1' variant='h4' align='center'>
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant='h5' gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant='subtitle1'>
									Your order number is #2001539. We have emailed your order
									confirmation, and will send you an update when your order has
									shipped.
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{GetStepContent(activeStep)}
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									{activeStep !== 0 && (
										<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
											Back
										</Button>
									)}
									{activeStep === steps.length - 1 ? (
										''
									) : (
										<Button
											variant='contained'
											onClick={handleNext}
											disabled={!isComplete}
											sx={{ mt: 3, ml: 1 }}>
											Next
										</Button>
									)}
								</Box>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
			</Container>
		</ThemeProvider>
	);
}
