import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

import ReportGeneratorForm from './ReportGeneratorCheck';
import Footer from 'examples/Footer';

function ReportGenerator() {
	return (
		<DashboardLayout>
			<MDBox bgColor="white">
				<MDBox mt={-2} py={1} px={2}>
					<Grid container spacing={6}>
						<Grid item xs={12} md={10} lg={20}>
							<ReportGeneratorForm />
						</Grid>
					</Grid>
				</MDBox>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default ReportGenerator;
