import { useState, useEffect } from 'react';

// react-router-dom components
import { Link, useNavigate, component } from 'react-router-dom';

// @mui material components
import {Card,Grid} from '@mui/material';

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import axios from '../../../Uri';
// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';
// Images
//import bgImage from 'assets/images/signin.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function ForgotBasic() {
	const navigate = useNavigate();

	const [ newPassword, setNewPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');


	const notify = () => toast();

	const handleSubmit = (e) => {
		e.preventDefault();
		
        if(newPassword==confirmPassword){
		const submitpassword = async () => {

			const result = await axios.put('/login/updateUserByEmail', { email, newPassword, confirmPassword });
			// if(result.data){
			// 	toast.success('password resetted successfully')
			// 	navigate('/authentication/sign-in')

			// }
			// else{
			// 	toast.error('something went wrong, unable to update password');
			// }

			{
				result.data
					? (navigate('/authentication/sign-in'),console.log('hii'))
					: toast.error('something went wrong, unable to update password😢');
			}
			
		};

		submitpassword();
	}
	
    else
	{
		toast.error("new password and confrim password should be same😊");
	}
};

	useEffect(() => {
		const listener = (event) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				navigate('/dashboard');
				//console.log('Enter key was pressed. Run your function.');
				event.preventDefault();
				// callMyFunction();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);


	

	return (
		<BasicLayout image={bgImage}>
			<Card>
				<MDBox
					variant="gradient"
					bgColor="info"
					borderRadius="lg"
					coloredShadow="info"
					mx={2}
					mt={-3}
					p={2}
					mb={1}
					textAlign="center"
				>
					<MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
						SRI LAKSHMI HEAVENS
					</MDTypography>
				</MDBox>
				<MDBox pt={4} pb={3} px={3}>
					<MDBox component="form" role="form">
						<MDBox mb={2}>
							<MDInput
								type="email"
								label="Email"
								name="email"
								onChange={(e) => setEmail(e.target.value)}
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								type="password"
								label="New Password"
								name="newPassword"
								onChange={(e) => setNewPassword(e.target.value)}
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								type="password"
								label="Confirm Password"
								name="confirmPassword"
								onChange={(e) => setConfirmPassword(e.target.value)}
								fullWidth
							/>
						</MDBox>
						<MDBox mt={4} mb={1}>
							<MDButton
								variant="gradient"
								color="info"
								onClick={handleSubmit}
								type="submit"
								fullWidth
							>
								<MDTypography variant="button" color="inherit" fontWeight="medium" textGradient>
									Set New Password
								</MDTypography>
							</MDButton>
						</MDBox>
						<MDBox mt={4} mb={1}>
							<MDButton
								variant="gradient"
								color="info"
								component={Link}
								to="/authentication/sign-in"
								fullWidth
							>
								<MDTypography variant="button" color="inherit" fontWeight="medium" textGradient>
									Cancel
								</MDTypography>
							</MDButton>
						</MDBox>
					</MDBox>
				</MDBox>
			
				<ToastContainer
               position="top-right"
               min-width= "2%"
			  
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               />
			  
			</Card>
		</BasicLayout>
	);
}

export default ForgotBasic;
