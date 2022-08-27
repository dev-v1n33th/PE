import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, InputLabel } from "@mui/material";
// import axios from "axios";
import axios from "../../../Uri";
// import Select from '../../profile/GuestLoginForm/components/Select'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form } from "formik";
import Select from "../../profile/GuestLoginForm/components/Select";


// import { height, width } from "@mui/system";

function Beds() {
	let userData = JSON.parse(sessionStorage.getItem("userdata"));
	let userId = userData.data.userId;
	// console.log(userId);
	var obj1 = null;
	var obj2 = null;

	const INITIAL_FORM_STATE = {
		selectBuilding: "",
		selectFloor: "",
		selectrooms: "",
	};

	const [data, setData] = useState([]);
	const [building, setBuilding] = useState([]);
	const [buildingId, setBuildingId] = useState(null);
	const [floor, setFloor] = useState([]);
	const [floorId, setFloorId] = useState(null);
	const [rooms, setRooms] = useState([]);
	const [roomId, setRoomId] = useState(null);

	let buildingNames = [];
	useEffect(() => {
		axios
			.get("/bed/getBuildingIdAndName")
			.then((res) => {
				setBuilding(res.data);
				res.data.map((post) => {
					buildingNames.push(post.buildingName);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	var obj = building.reduce(function (acc, cur, i) {
		acc[cur.buildingId] = cur.buildingName;

		return acc;
	}, {});

	const columns = [
		{
			title: "Bed No",
			field: "bedId",
			editable: false,
			headerStyle: {
				backgroundColor: "#1E90FF",
				color: "white",
			},
			// validate: (rowData) => {
			//   if (rowData.bedId === undefined) {
			//     return "Bed Id is Required";
			//   }
			//   return true;
			// },
		},
		// {
		//   title: "Room ID",
		//   field: "roomId",
		//   headerStyle: {
		//     backgroundColor: "#1E90FF",
		//     color: "white"},
		//     validate:rowData =>{
		//       if(rowData.roomId===undefined){
		//      return  "Room Id is Required"

		//   }
		//   return true
		//     },
		//   },

		//   {
		//     title: "Building Name",
		//     field: "buildingId",
		//     lookup: obj,
		//     headerStyle: {
		//       backgroundColor: "#1E90FF",
		//       color: "white",
		//     },
		//     validate:rowData =>{
		//       if(rowData.buildingId===undefined){
		//      return  "Building Name is Required"

		//   }
		//   return true
		//   }
		// },

		// {
		//   title: "Bed Status",
		//   field: "bedStatus",
		//  // editable: true,
		//   lookup: { true: "Not Allocated" },
		//   headerStyle: {
		//     backgroundColor: "#1E90FF",
		//     color: "white",
		//   },
		// },
		{
			title: "Bed Name",
			field: "bedName",
			editable:"onAdd",
			headerStyle: {
				backgroundColor: "#1E90FF",
				color: "white",
			},
			validate: (rowData) => {
				if (rowData.bedName === undefined) {
					return "Bed Name is Required";
				} else if (!rowData.bedName.match(/[^0-9]/g)) {
					return " Please enter valid name";
				}
				return true;
			},
		},
		{
			title: "Default Rent",
			field: "defaultRent",
			headerStyle: {
				backgroundColor: "#1E90FF",
				color: "white",
			},
			validate: (rowData) => {
				if (rowData.defaultRent === undefined) {
					return "Default Rent is Required";
				}
				//  else if (rowData.defaultRent.match(/[^0-9]/g)) {
				//   return " Please enter valid number";
				// }
				return true;
			},
		},
		// {
		//   title: "Security Deposit",
		//   field: "securityDeposit",
		//   headerStyle: {
		//     backgroundColor: "#1E90FF",
		//     color: "white",
		//   },
		//   validate: (rowData) => {
		//     if (rowData.securityDeposit === undefined) {
		//       return "Security Deposit is Required";
		//     }
		//     //  else if (rowData.securityDeposit.match(/[^0-9]/g)) {
		//     //   return " Please enter valid numbers";
		//     // }
		//     return true;
		//   },
		// },
		{
			title: "Room Type",
			field: "ac",
			lookup: { true: "Ac", false: "Non_Ac" },
			headerStyle: {
				backgroundColor: "#1E90FF",
				color: "white",
			},
		},
	];

	// useEffect(() => {
	//   axios

	//     .get("/bed/getAllBeds")

	//     .then((res) => {
	//       setData(res.data);

	//       console.log(res.data);
	//     })

	//     .catch((err) => {
	//       console.log(err);
	//       toast.error("Server error");
	//     });
	// }, []);

	useEffect(() => {
		axios
			.get(`bed/getFloorIdAndNameByBuildingId/${buildingId}`)

			.then((res) => {
				setFloor(res.data);

				// console.log(res.data);
			})

			.catch((err) => {
				console.log(err);
			});
	}, [buildingId]);
	obj1 = floor.reduce(function (acc, cur, i) {
		acc[cur.floorId] = cur.floorNumber;

		return acc;
	}, {});

	useEffect(() => {
		axios

			.get(`/bed/getRoomIdAndNameByFloorId/${floorId}`)

			.then((res) => {
				setRooms(res.data);
			})

			.catch((err) => {
				console.log(err);
			});
	}, [floorId]);

	obj2 = rooms.reduce(function (acc, cur, i) {
		acc[cur.roomId] = cur.roomNumber;

		return acc;
	}, {});
	// console.log(obj2);

	useEffect(() => {
		axios

			.get(`/bed/getBedsByRoomId/${roomId}`)

			.then((res) => {
				setData(res.data);
			})

			.catch((err) => {
				console.log(err);
			});
	}, [roomId]);

	// const owner="admin"
	const obje = { createdBy: userId };

	const obje1 = { buildingId: buildingId };

	const obje2 = {
		roomId: roomId,
		floorId: floorId
	};

	return (
		<div className="App">
			<Formik initialValues={{ ...INITIAL_FORM_STATE }}>
				{(formProps) => (
					<Form>
						<Grid container>
							<Grid item xs={4}>
								<InputLabel>Select Building</InputLabel>
								<Select
									name="selectBuilding"
									options={obj}
									onClick={(i) => {
										setBuildingId(i.target.dataset.value);
										console.log(i.target.dataset.value);
										console.log(i);
									}}
								/>
							</Grid>

							{obj1 === null ? (
								console.log("obj1 is null")
							) : (
								<Grid item xs={4}>
									<InputLabel>Select Floor</InputLabel>
									<Select
										name="selectFloor"
										options={obj1}
										onClick={(i) => {
											setFloorId(i.target.dataset.value);
											// console.log(floorId);
										}}
									/>
								</Grid>
							)}

							{obj2 === null ? (
								console.log("obj2 is null")
							) : (
								<Grid item xs={4}>
									<InputLabel>Select rooms</InputLabel>
									<Select
										name="selectrooms"
										options={obj2}
										onClick={(i) => {
											setRoomId(i.target.dataset.value);
											//  console.log(roomId)
										}}
									/>
								</Grid>
							)}
						</Grid>
					</Form>
				)}
			</Formik>

			<Grid container>
				<Grid xs={12}>
					<MaterialTable
						title="Manage Beds"
						data={data}
						sx={{ color: "white" }}
						columns={columns}
						editable={{
							onRowAdd: (newRow) =>



								new Promise((resolve, reject) => {
									const updatedRows = [
										...data,
										{ id: Math.floor(Math.random() * 100), ...newRow },
									];
									// console.log(buildingId);
									if (buildingId && floorId && roomId) {
										setTimeout(() => {
											const newRow1 = Object.assign(newRow, obje);
											const newRow2 = Object.assign(newRow1, obje1);
											const newRow3 = Object.assign(newRow2, obje2);
											const res = axios
												.post(
													"/bed/addBed",

													newRow3
												)
												.catch((err) => {
													toast.error("Server error🤦‍♀️");
												});
											// console.log(newRow3);

											toast.success("New Bed added👍");

											//console.log(newRow1);
											setData(updatedRows);
											resolve();
										}, 2000);
									}
									else {
										toast.error("Please select Building, Floor/Room to proceed.😁");
									}

								}),
							onRowUpdate: (updatedRow, oldRow) =>
								new Promise((resolve, reject) => {
									const index = oldRow.id;
									const updatedRows = [...data];
									updatedRows[oldRow.tableData.id] = updatedRow;
									setTimeout(() => {
										const res = axios
											.put(`/bed/updateBedById/${index}`, updatedRow)
											.then((res) => { toast.success("Bed updated Successfully👍"); })
											.catch((err) => {
												toast.error("Server error");
											});


										setData(updatedRows);
										resolve();
									}, 2000);
								}),
							onRowDelete: (selectedRow) =>
								new Promise((resolve, reject) => {
									const index = selectedRow.id;
									const updatedRows = [...data];
									updatedRows.splice(index, 1);
									setTimeout(() => {
										const res = axios.delete(`/bed/deleteBed/${index}`)
											.then((res) => {
												console.log(res)
												if (res.data === "Action Failed: Bed contains Guest")
												// console.log("heeeeeeeeeeeeeeeeeiiiiii")
												{
													toast.error("Bed can't be deletes as it contains Guest🤷‍♂️")
												}
												else {
													toast.success("Bed deleted successfully👍")
												}
											});
										console.log(res);
										// console.log(updatedRows);
										setData(updatedRows);
										resolve();
									}, 2000);
								}),

						}}
						options={{
							exportButton: true,
							actionsColumnIndex: -1,
							grouping: true,
							addRowPosition: "first",
							headerStyle: {
								backgroundColor: "#1E90FF",
								color: "white",
								fontSize: "15px",
								//height: "10px",
								//fontWeight: 'bold'
							},
							rowStyle: {
								fontSize: 16,
							},
						}}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default Beds;
