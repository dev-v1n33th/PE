
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import IconButton from '@mui/material/IconButton';
import { CardContent, Divider } from '@mui/material';


import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function BedandBill(props) {
	return (
		<div>
			<Grid container spacing={3}>
				{/* <Grid item xs={12} md={6} lg={3}>
					<MDBox mb={1.5}>
						<Card sx={{ minWidth: 240, minHeight: 100, background: '#00008B' }}>
							<CardContent sx={{ align: 'center' }}>
								<MDTypography color="light" mt={1} fontWeight="regular" style={{ fontSize: '2em' }}>
									45,000
								</MDTypography>
								<MDTypography color="light" fontWeight="light">
								Overdue amount
								</MDTypography>
								<Divider variant="insent" fullWidth />
								<MDTypography
									color="light"
									align="center"
									textTransform="capitalize"
									fontWeight="regular"
								>
									More Info
									<IconButton>
										<ArrowCircleRightRoundedIcon fontSize="medium" />
									</IconButton>
								</MDTypography>
							</CardContent>
						</Card>
					</MDBox>
				</Grid> */}
				{/* <Grid item xs={12} md={6} lg={3}>
					<MDBox mb={1.5}>
						<Card sx={{ minWidth: 240, minHeight: 100, background: '#2F4F4F' }}>
							<CardContent sx={{ align: 'center' }}>
								<MDTypography color="light" mt={1} fontWeight="regular" style={{ fontSize: '2em' }}>
									25
								</MDTypography>
								<MDTypography color="light" fontWeight="light">
	Upcoming Checkouts 							</MDTypography>
								<Divider variant="insent" fullWidth />
								<MDTypography
									color="light"
									align="center"
									textTransform="capitalize"
									fontWeight="regular"
								>
									More Info
									<IconButton>
										<ArrowCircleRightRoundedIcon fontSize="medium" />
									</IconButton>
								</MDTypography>
							</CardContent>
						</Card>
					</MDBox>
				</Grid> */}
				{/* <Grid item xs={12} md={6} lg={3}>
					<MDBox mb={1.5}>
						<Card sx={{ minWidth: 240, minHeight: 100, background: '#DC143C' }}>
							<CardContent sx={{ align: 'center' }}>
								<MDTypography color="light" mt={1} fontWeight="regular" style={{ fontSize: '2em' }}>
									175500
								</MDTypography>
								<MDTypography color="light" fontWeight="light">
									Income
								</MDTypography>
								<Divider variant="insent" fullWidth />
								<MDTypography
									color="light"
									align="center"
									textTransform="capitalize"
									fontWeight="regular"
								>
									More Info
									<IconButton>
										<ArrowCircleRightRoundedIcon fontSize="medium" />
									</IconButton>
								</MDTypography>
							</CardContent>
						</Card>
					</MDBox>
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<MDBox mb={1.5}>
						<Card sx={{ minWidth: 240, minHeight: 100, background: '#4B0082' }}>
							<CardContent sx={{ align: 'center' }}>
								<MDTypography color="light" mt={1} fontWeight="regular" style={{ fontSize: '2em' }}>
									25400
								</MDTypography>
								<MDTypography color="light" fontWeight="light">
									Expenditure
								</MDTypography>
								<Divider variant="insent" fullWidth />
								<MDTypography
									color="light"
									align="center"
									textTransform="capitalize"
									fontWeight="regular"
								>
									More Info
									<IconButton>
										<ArrowCircleRightRoundedIcon fontSize="medium" />
									</IconButton>
								</MDTypography>
							</CardContent>
						</Card>
					</MDBox>
				</Grid> */}
			</Grid>
		</div>
	);
}
export default BedandBill;
