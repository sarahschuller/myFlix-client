import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ birthdayErr, setBirthdayErr ] = useState('');

    // Validate Inputs
    const validate = () => {
      let isReq = true;
      if(!username){
        setUsernameErr('Username Required');
        isReq = false;
      }else if(username.length < 2){
        setUsernameErr('Username must be 2 characters long');
        isReq = false;
      }
      if(!password){
        setPasswordErr('Password Required');
        isReq = false;
      }else if(password.length < 6){
        setPassword('Password must be 6 characters long');
        isReq = false;
      }
      if(!email){
        setEmailErr('Email Required')
      }else if(email.indexOf('@') === -1) {
        isReq = false;
      }
      if(!birthday){
        setBirthdayErr('Birthday Required')
        isReq = false;
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send request to the server for authentication */
        axios.post('https://flixfile.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('Cannot register user')
        });
        props.onLoggedIn(Username);
    };

    return (
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            {/* code added here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {/* code added here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            {/* code added here to display validation error */}
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="birthday" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
            {/* code added here to display validation error */}
            {birthdayErr && <p>{birthdayErr}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit
          </Button>
        </Form>
    );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
}