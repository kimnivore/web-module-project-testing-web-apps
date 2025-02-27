import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from './ContactForm';

// the component renders the contact form component without errors.
test('renders without errors', ()=>{
    render(<ContactForm />);
});

// the header h1 element exists. Include three asserts, if the header is in the document, if the heads is truthy, if the header has the correct test content.
test('renders the contact form header', ()=> {
    render(<ContactForm/>)

    const header = screen.queryByText(/contact form/i);

    expect(header).toBeInTheDocument();  
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

// the component renders ONE error message if the user enters less than 4 characters into the firstname field. Make sure to use async / await and the correct screen method to account for state change.
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstname = screen.getByLabelText(/first name*/i);
    userEvent.type(firstname, 'kim');

    const error = await screen.findAllByTestId('error');
    expect(error).toHaveLength(1);
});

// the component renders THREE error messages if the user submits without filling in any values.
test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const error = screen.queryAllByTestId('error');
        expect(error).toHaveLength(3);
    })
});

//the component renders ONE error message if the user submits without filling in the email field.
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstname = screen.getByLabelText(/first name*/i);
    const lastname = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);
    const button = screen.getByRole('button');
    userEvent.type(firstname, 'kimmy');
    userEvent.type(lastname, 'nguyen');
    userEvent.type(email, '');
    userEvent.click(button);

    const error = await screen.findAllByTestId('error');
    expect(error).toHaveLength(1);
    
});
//await === find
// the component renders the text "email must be a valid email address" if an invalid email address is typed into the email field.
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'kim@gmail');

    const error = await screen.findByText(/email must be a valid email address/i);
    expect(error).toBeInTheDocument();

});

//the component renders the text "lastName is a required field" the form is submitted without a last name.
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    // const lastname = screen.getByLabelText(/last name*/i);
    const button = screen.getByRole('button');
    // userEvent.type(lastname, '');
    userEvent.click(button);

    const error = await screen.findByText(/lastName is a required field/i);
    expect(error).toBeInTheDocument();

});

//the component renders the firstname, lastname and email text when submitted with valued fields and does not render a message value when one is not entered into the message field.
test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstname = screen.getByLabelText(/first name*/i);
    const lastname = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);
    const button = screen.getByRole('button');
    userEvent.type(firstname, 'kimmy');
    userEvent.type(lastname, 'nguyen');
    userEvent.type(email, 'kim@kim.com');
    userEvent.click(button);
    

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText('kimmy');
        const lastnameDisplay = screen.queryByText('nguyen');
        const emailDisplay =  screen.queryByText('kim@kim.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

// renders all fields when the user submits with valid text filled in for all fields.
test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstname = screen.getByLabelText(/first name*/i);
    const lastname = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);
    const message = screen.getByLabelText(/message/i);
    const button = screen.getByRole('button');
    userEvent.type(firstname, 'kimmy');
    userEvent.type(lastname, 'nguyen');
    userEvent.type(email, 'kim@kim.com');
    userEvent.type(message, 'test test test');
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText('kimmy');
        const lastnameDisplay = screen.queryByText('nguyen');
        const emailDisplay =  screen.queryByText('kim@kim.com');
        const messageDisplay = screen.queryByText('test test test');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    })
});
