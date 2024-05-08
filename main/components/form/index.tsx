import React,{ FormEvent, FormHTMLAttributes, RefObject, useRef, } from 'react'
import './index.scss'

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
   onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function Form(props: IForm) {
   const formRef: RefObject<HTMLFormElement> = useRef(null)
   const { onSubmit: handleSubmit, children } = props

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   let errorMessage = 'This field is required; '

   const displayError = (el: HTMLInputElement, message: string) => {
      el.classList.add('invalid')
      if (!el.nextElementSibling?.classList.contains('input-error')) {
         const errorElem = document.createElement('span')
         errorElem.textContent = message || el.getAttribute('warning')
         errorElem.className = 'input-error'
         el.insertAdjacentElement('afterend', errorElem)
      } else {
         el.nextElementSibling.textContent = message || el.getAttribute('warning')
      }
   }

   const removeError = (el: HTMLInputElement) => {
      el.addEventListener('change', () => {
         el.classList.remove('invalid')
         if (el.nextElementSibling?.classList.contains('input-error')) {
            el.nextElementSibling.remove()
         }
      })
   }

   const validateInput = () => {
      let invalidForm = false
      const formElements = formRef.current?.querySelectorAll('[data-mtk-input]')
      console.log(formElements);

      if (formElements) {
         Array.from(formElements).forEach((el) => {
            if (el.getAttribute('required') != null && (el as HTMLInputElement).value === '' || (el as HTMLInputElement).value === null) {

               invalidForm = true;
               displayError(el as HTMLInputElement, errorMessage)

            } else if ((el as HTMLInputElement).value !== '' || (el as HTMLInputElement).value !== null) { // form is filled

               // check if email is valid
               if (el.getAttribute('type') === 'email' && (el as HTMLInputElement).value.match(emailRegex) === null) {
                  invalidForm = true;
                  displayError(el as HTMLInputElement, 'Invalid Email')
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
