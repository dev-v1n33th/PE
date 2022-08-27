
import PropTypes from 'prop-types';



import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import { useMaterialUIController } from 'context';
import { Grid } from '@mui/material';

function Finance({ name, company, email, vat, noGutter }) {
	const [ controller ] = useMaterialUIController();
	const { darkMode } = controller;

	return (
		<MDBox
			component="li"
			display="flex"
			justifyContent="space-between"
			alignItems="flex-start"
			bgColor={darkMode ? 'transparent' : 'grey-100'}
			borderRadius="lg"
			p={3}
			mb={noGutter ? 0 : 1}
			mt={2}
		>
			<MDBox width="100%" display="flex" flexDirection="column">
				<Grid container spacing={3}>
					<Grid align="center" style={{ color: 'blue' }} item xs={2.4}>
						INR 7500
						<MDTypography align="center" variant="h6" fontWeight="medium">
							Total
						</MDTypography>
					</Grid>
					<Grid align="center" style={{ color: 'green' }} item xs={2.4}>
						INR 5000
						<MDTypography  align="center" variant="h6" fontWeight="medium">
							Paid
						</MDTypography>
					</Grid>
					<Grid align="center" style={{ color: 'orange' }} item xs={2.4}>
						INR 0
						<MDTypography align="center" variant="h6" fontWeight="medium">
							Partial
						</MDTypography>
					</Grid>
					<Grid align="center" style={{ color: 'orange' }} item xs={2.4}>
						INR 500
						<MDTypography align="center" variant="h6" fontWeight="medium">
							Discount
						</MDTypography>
					</Grid>
					<Grid align="center" style={{ color: 'red' }} item xs={2.4}>
						INR 2000
						<MDTypography align="center" variant="h6" fontWeight="medium">
							Pending
						</MDTypography>
					</Grid>
				</Grid>
			</MDBox>
		</MDBox>
	);
}

Finance.defaultProps = {
	noGutter: false
};

Finance.propTypes = {
	name: PropTypes.string.isRequired,
	company: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	vat: PropTypes.string.isRequired,
	noGutter: PropTypes.bool
};

export default Finance;
