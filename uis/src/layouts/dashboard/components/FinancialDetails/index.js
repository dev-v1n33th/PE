
import Card from '@mui/material/Card';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import Finance from 'layouts/dashboard/components/Finance';

function FinancialDetails({ name }) {
	return (
		<Card id="delete-account">
			<MDBox px={2}>
				<MDTypography align="center" variant="h5" fontWeight="medium">
					{name}
				</MDTypography>
			</MDBox>
			<MDBox>
				<MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
					<Finance />
				</MDBox>
			</MDBox>
		</Card>
	);
}

export default FinancialDetails;
