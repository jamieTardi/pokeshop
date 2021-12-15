import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface props {
	open: boolean;
	setOpen: Function;
	setCookie: Function;
}

export default function CookiePolicy({ open, setOpen, setCookie }: props) {
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const acceptPolicy = () => {
		setCookie('privacyPolicyPoke', 'Accepted', { maxAge: 222592000 });
		handleClose();
	};

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id='transition-modal-title' variant='h6' component='h2'>
							🍪 Cookies and our Site 🍪
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							On our site we use cookies to store certain pieces of information
							to ensure you have a good shopping experience. To continue using
							the site you need accept our cookie policy, if you do not agree to
							our cookie policy, we cannot offer you the services on this site.
							No personal information is stored in the client browser storage
							settings whether that is a cookie or local storage. By clicking
							accept you are accepting our policy.
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							If you wish to read the full policy it is located{' '}
							<a
								href='/Cookie-Policy-Poke-Decks.pdf'
								rel='noopener noreferrer'
								download>
								HERE
							</a>
						</Typography>
						<Button
							variant='contained'
							color='primary'
							onClick={acceptPolicy}
							sx={{ marginTop: '5%' }}>
							Accept Policy
						</Button>
						<Button
							variant='contained'
							color='error'
							sx={{ marginTop: '5%', marginLeft: '3%' }}>
							<a href='https://www.google.com/'>Leave Site</a>
						</Button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
