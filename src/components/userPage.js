import { Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserDataTable, setFaq} from "../redux/app.reducer";


const UserPage = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const userDataTable = useSelector((state) => state.app.userDataTable);
  const faq = useSelector((state) => state.app.faq);

  useEffect(() => {
    getData();
    getFaq();
  }, []);

  const getData = async () => {
    const response = await axios({
      method: "GET",
      url: "https://sandbox.practical.me/api/user/profile",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setUserDataTable(response.data.data));
  };

  const getFaq = async () => {
    const response = await axios({
      method: "GET",
      url: "https://sandbox.practical.me/api/faq",
      headers: { },
    });
    dispatch(setFaq(response.data.data));
  };

  return (
    <>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Surname</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{userDataTable.first_name}</TableCell>
              <TableCell align="right">{userDataTable.sur_name}</TableCell>
              <TableCell align="right">{userDataTable.email}</TableCell>
              <TableCell align="right">{userDataTable.phone}</TableCell>
            </TableRow>
        </TableBody>


      </Table>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Question</TableCell>
            <TableCell align="right">Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {faq.map((row) => (

          <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.question}</TableCell>
              <TableCell align="right">{row.answer}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserPage;
