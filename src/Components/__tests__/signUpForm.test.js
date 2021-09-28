import React from 'react';
import SignUpForm from '../SignUpForm/signUpForm';
import {BrowserRouter} from 'react-router-dom'
import {render, screen, fireEvent, act} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

describe("Sign Up Form", () =>{
  describe("With valid inputs", () =>{
    it("does not render first name validation error", async () =>{
      render(
        <BrowserRouter>
          <SignUpForm />
        </BrowserRouter>
      )
      await act(async ()=> {
        const firstNameElement = screen.getByRole("firstNameInput")
        fireEvent.change(firstNameElement, {
        target: {value: "Bill"},
        })
      })
      const submitButton = screen.getByRole("button")
      await act(async ()=> {
        fireEvent.click(submitButton)
      })
      const firstNameErrorElement = screen.queryByRole("firstNameError")
      expect(firstNameErrorElement).not.toBeInTheDocument()
    })
  })
})