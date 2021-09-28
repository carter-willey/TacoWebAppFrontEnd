import React from 'react';
import LoginForm from '../LoginForm/loginForm';
// import { shallow, render, mount } from 'enzyme';
// import Enzyme from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

describe("login form renders", ()=>{
  it("renders login form", async () =>{
    render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
    )
    const logForm = screen.getByRole("logInForm")
    expect(logForm).toBeInTheDocument()

  })
  it("renders brand image without crashing", async ()=>{
    render(
    <BrowserRouter>
        <LoginForm />
    </BrowserRouter>
    )
    const logoElement = screen.getByTestId("imgloginform-1")
    expect(logoElement).toBeInTheDocument()
  });
  // it("renders TacoDex logo")

})