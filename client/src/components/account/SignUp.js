import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { reStyles } from "../../reusableStyles";

export const SignUp = (props) => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [addUser] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        if (formState.password === formState.confirm_password) {
            try {
                const { data } = await addUser({
                    variables: { ...formState },
                });
                Auth.login(data.addUser.token);
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('Your password needs to match!')
        }
    };

    return (
        <Box sx={{
            ...reStyles.flexContainer, bgcolor: 'primary.main', width: '100%', alignItems: 'center',
        }} component='form'>
            < Paper
                elevation={20}
                sx={{
                    padding: '20px',
                    minWidth: '300px',
                    width: '70%',
                    ml: '30px',
                    mr: '30px',
                }}>
                < Typography sx={{ fontSize: '3rem' }} >
                    Signup
                </Typography >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    name="username"
                    type="username"
                    value={formState.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete='false'
                    value={formState.password}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirm_password"
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    autoComplete='false'
                    value={formState.confirm_password}
                    onChange={handleChange}
                />
                <Button style={{ padding: 0 }} color='inherit'>
                    <Typography sx={{ fontSize: '16px', textTransform: 'none', m: '9px', mr: '0px' }} onClick={() => { props.setIsLoginScreen(!props.isLoginScreen) }}>Have an account?</Typography>
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(event) => { handleFormSubmit(event) }}
                >
                    Sign In
                </Button>
                {/* <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                /> */}
            </Paper >
        </Box >
    )
};