import React  from 'react';
import SearchMissingChild from "./SearchMissingChild";
import MyChildMissing from "./MyChildMissing";
import IHaveSightedChild from "./IHaveSightedChild";
import Dashboard from './Dashboard';
import EditProfile from './EditProfile';
import Account from './Account';
import SignIn from './Signin';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import useToken from './utils/useToken';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Avatar from 'react-avatar';


// function setToken(userToken){
//   sessionStorage.setItem('token',JSON.stringify(userToken));
// }

// function getToken(){
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

//logout
// const clearToken = () => {
//   sessionStorage.removeItem('token');
//   setToken(null);
// };

function Home() {

  const { token,setToken,clearToken} = useToken();
  // const token = getToken();

  if(!token){
    return <SignIn setToken = {setToken} />
  }

  const handleLogout = () => {
    clearToken();
};
  


  return (
    <Router>
      <div className="App">
        <Navbar bg="light" variant="light" expand="md">
          <Navbar.Brand>ChildChaser</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
              <Nav.Item>
                <Link to="/mychildmissing" className="nav-link">My Child Is Missing</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/ihavesightedchild" className="nav-link">I Have Sighted A Child</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/searchmissingchild" className="nav-link">Search A Missing Child</Link>
              </Nav.Item>
              <NavDropdown title={<Avatar name="Sandeep Gogarla" size={30} round />} id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/myaccount">Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<MyChildMissing/>} />
          <Route exact path="/mychildmissing" element={<MyChildMissing />} />
          <Route exact path="/searchmissingchild" element={<SearchMissingChild />} />
          <Route exact path="/ihavesightedchild" element={<IHaveSightedChild />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/myaccount" element={<Account />} />
          <Route exact path="/editprofile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Home;
