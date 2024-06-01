import React, { FormEvent, FormHTMLAttributes, RefObject, useRef, } from 'react'
import './index.scss'

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
   onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^[0-9 +]{7,}$/;

export function Form(props: IForm) {
   const formRef: RefObject<HTMLFormElement> = useRef(null)
   const { onSubmit: handleSubmit, children } = props

   let errorMessage = 'This field is required; '

   const displayError = (el: HTMLInputElement, message: string) => {
      el.classList.add('invalid')
      if (!el.nextElementSibling?.classList.contains('input-error')) {
         const errorElem = document.createElement('span')
         errorElem.textContent = el.getAttribute('data-warning') || message
         errorElem.className = 'input-error'
         el.insertAdjacentElement('afterend', errorElem)
      }
      else el.nextElementSibling.textContent = el.getAttribute('data-warning') || message
   }

   const removeError = (el: HTMLInputElement) => {
      el.addEventListener('input', () => {
         el.classList.remove('invalid')

         if (el.nextElementSibling?.classList.contains('input-error')) el.nextElementSibling.remove()

         if (el.getAttribute('type') === 'radio') validateInput() // this allows to clear the error when a radio button is selected
      })
   }

   const validateInput = () => {
      let invalidForm = false
      const formElements = formRef.current?.querySelectorAll('[data-mtk-input]')

      if (formElements) {
         Array.from(formElements).forEach((el) => {

            // check if input is empty
            if (el.getAttribute('required') != null && (el as HTMLInputElement).value === '' || (el as HTMLInputElement).value === null) {
               invalidForm = true;
               displayError(el as HTMLInputElement, errorMessage)
            } else if ((el as HTMLInputElement).value !== '' || (el as HTMLInputElement).value !== null) { // form is filled

               // check if email is valid
               if (el.getAttribute('type') === 'email' && (el as HTMLInputElement).value.match(emailRegex) === null) {
                  invalidForm = true;
                  displayError(el as HTMLInputElement, 'Invalid Email')
               }
               // check for radio inputs
               else if (el.getAttribute('type') === 'radio') {
                  const radioGroup = formRef.current?.querySelectorAll(`[name="${el.getAttribute('name')}"]`)

                  if (radioGroup && !Array.from(radioGroup)?.find((radio) => (radio as HTMLInputElement).checked)) {
                     invalidForm = true;
                     el.classList.add('invalid')
                  } else el.classList.remove('invalid')
               }

               // check for tel inputs
               else if (el.getAttribute('type') === 'tel' && (el as HTMLInputElement).value.match(telRegex) === null) {
                  invalidForm = true;
                  displayError(el as HTMLInputElement, 'Invalid Phone Number')
               }
            }

            removeError(el as HTMLInputElement)
         });
      }
      return invalidForm
   };


   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const isInvalid = validateInput()
      if (isInvalid) {
         return
      } else {
         handleSubmit(e) // Pass the event object as an argument
      }

   }


   return (
      <form  {...props} ref={formRef} onSubmit={handleFormSubmit} noValidate id='mtk-form'>
         {children}
      </form>
   )
}
