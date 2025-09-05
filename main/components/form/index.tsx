import React, { FormEvent, FormHTMLAttributes, useContext, useRef } from 'react';
import './index.scss';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const telRegex = /^[0-9 +]{7,}$/;

export interface IForm extends FormHTMLAttributes<HTMLFormElement> {
   onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

interface FormState {
   checkValidity: () => boolean;
}
const FormContext = React.createContext<FormState>({
   checkValidity: () => true
})

export const useForm = () => {
   const baseConsumer = useContext(FormContext);
   return baseConsumer;
};

export function Form(props: IForm) {
   const formRef = useRef<HTMLFormElement>(null);

   const { onSubmit: handleSubmit, children } = props;

   const errorMessage = 'This field is required; ';

   const displayError = (el: HTMLInputElement, message: string) => {
      el.classList.add('invalid');
      if (!el.nextElementSibling?.classList.contains('input-error')) {
         const errorElem = document.createElement('span');
         errorElem.textContent = message;
         errorElem.className = 'input-error';
         el.insertAdjacentElement('afterend', errorElem);
      } else el.nextElementSibling.textContent = message;
   };

   const removeError = (el: HTMLInputElement) => {
      const handler = () => {
         el.classList.remove('invalid');

         if (el.nextElementSibling?.classList.contains('input-error')) el.nextElementSibling.remove();

         if (el.getAttribute('type') === 'radio') validateInputs(); // this allows to clear the error when a radio button is selected
      };
      el.removeEventListener('input', handler); //remove any previous listeners
      el.addEventListener('input', handler);
   };

   const validateInputs = () => {
      const invalidForm: boolean[] = [];

      const formElements = formRef.current?.querySelectorAll('[data-mtk-input]');

      if (formElements) {
         Array.from(formElements).forEach(el => {
            invalidForm.push(validateInput(el as HTMLInputElement));
            if (invalidForm.length === 1 && invalidForm[0]) {
               el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
         });
      }


      return invalidForm.includes(true);
   };

   const validateInput = (el: HTMLInputElement) => {
      let invalidForm = false;

      // check if input is empty
      if ((el.getAttribute('required') != null && (el as HTMLInputElement).value === '') || (el as HTMLInputElement).value === null) {
         invalidForm = true;
         displayError(el as HTMLInputElement, errorMessage);
      } else if ((el as HTMLInputElement).value !== '' || (el as HTMLInputElement).value !== null) {
         // form is filled
         // check if email is valid
         if (el.getAttribute('type') === 'email' && (el as HTMLInputElement).value.match(emailRegex) === null) {
            invalidForm = true;
            displayError(el as HTMLInputElement, 'Invalid Email');
         }
         // check for radio inputs
         else if (el.getAttribute('type') === 'radio') {
            const radioGroup = formRef.current?.querySelectorAll(`[name="${el.getAttribute('name')}"]`);

            if (radioGroup && !Array.from(radioGroup)?.find(radio => (radio as HTMLInputElement).checked)) {
               invalidForm = true;
               el.classList.add('invalid');
            } else el.classList.remove('invalid');
         }

         // check for tel inputs
         else if (el.getAttribute('type') === 'tel' && (el as HTMLInputElement).value.match(telRegex) === null) {
            invalidForm = true;
            displayError(el as HTMLInputElement, 'Invalid Phone Number');
         }
      }

      if (el.getAttribute('data-error') == 'true') {
         invalidForm = true;
         const err = el.getAttribute('data-warning') || '';
         displayError(el as HTMLInputElement, err);
      }

      removeError(el as HTMLInputElement);

      return invalidForm;
   };

   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isInvalid = validateInputs();
      if (isInvalid) {
         return;
      } else handleSubmit(e); // Pass the event object as an argument
   };

   const checkValidity = () => {
      return !validateInputs()
   }

   const value: FormState = {
      checkValidity
   };

   return (
      <FormContext.Provider value={value}>
         <form {...props} ref={formRef} onSubmit={handleFormSubmit} noValidate id="mtk_form">
            {children}
         </form>
      </FormContext.Provider>
   );
}

