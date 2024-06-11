import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import './index.scss'

export interface InputProps extends React.InputHTMLAttributes<any> {
	label?: string;
	className?: string;
	warning?: string;
	showWarning?: boolean;
	onChange?:
	| React.ChangeEventHandler<HTMLInputElement>
	| React.ChangeEventHandler<HTMLTextAreaElement>
	| any;
	as?: "textarea";
	rows?: number;
	required?: boolean;
}
export const InputField: React.FC<InputProps> = ({ ...props }) => {
	const {
		label,
		name,
		className,
		placeholder,
		type,
		warning,
		required = false,
		minLength,
		showWarning,
		defaultValue,
		as,
		rows,
		disabled,
		id,
		onChange,
		...rest
	} = props;

	const [isPasswordVisible, setisPasswordVisible] = useState(false)

	const tooglePaswword = () => {
		setisPasswordVisible(current => !current)
	}

	const passwordType = isPasswordVisible ? 'text' : 'password'
	return (
		<div className="input-group">
			{label && (
				<label
					className={`input-label ${disabled && "disabled"}`}
					htmlFor={name}>
					{label}
					&nbsp;
					{required === true ? (
						<span className="input-field--required">*</span>
					) : (
						<span className="input-field--optional">(optional)</span>
					)}
				</label>
			)}
			<div className='input'>
				{as ? (
					<textarea
						name={name}
						className={`${className}`}
						placeholder={placeholder}
						onChange={onChange}
						required={required}
						minLength={minLength}
						defaultValue={defaultValue}
						rows={rows}
						style={showWarning ? { borderColor: "#d92d20" } : {}}
						disabled={disabled}
						id={id}
						data-mtk-input={true}
						{...rest}
					/>
				) : (
					<input
						name={name}
						className={`input-field ${className}`}
						placeholder={placeholder}
						type={type === 'password' ? passwordType : type}
						disabled={disabled}
						onChange={onChange}
						id={id}
						required={required}
						minLength={minLength}
						defaultValue={defaultValue}
						style={showWarning ? { borderColor: "#d92d20" } : {}}
						data-mtk-input={true}
						{...rest}
					/>
				)}
				{type === 'password' && (
					<button type='button' onClick={tooglePaswword}>
						{
							isPasswordVisible ?
								<span className='p-icon'>Hide</span> :
								<span className='p-icon'>Show</span>
						}
					</button>
				)}
			</div>
			{showWarning && warning && (
				<label className="input-warning">{warning}</label>
			)}
		</div>
	);
};


export interface OTPInputProps extends React.InputHTMLAttributes<any> {
	num?: number;
	getOTP?: (otp: string) => void;
	label?: string;
	className?: string;
	warning?: string;
	showWarning?: boolean;
	onChange?:
	| React.ChangeEventHandler<HTMLInputElement>
	| React.ChangeEventHandler<HTMLTextAreaElement>
	| any;
	as?: "textarea";
	rows?: number;
	required?: boolean;
}
export const OTPInput: React.FC<OTPInputProps> = ({ ...props }) => {
	const {
		getOTP,
		num = 6,
		label,
		name,
		className,
		placeholder,
		type,
		warning,
		required = false,
		minLength,
		showWarning,
		defaultValue,
		as,
		rows,
		disabled,
		id,
		onChange,
		...rest
	} = props;
	const [otp, setOtp] = useState(new Array(num).fill(''));

	useEffect(() => {
		getOTP(otp.join(''))
	}, [otp])

	const handleChange = (element: any, index: number) => {
		if (isNaN(element.value)) return false; // Allow only numbers
		const newOtp = [...otp];
		newOtp[index] = element.value;
		setOtp(newOtp);

		// Focus next input
		if (element.nextSibling && element.value) {
			element.nextSibling.focus();
		}

		//  return otp
		getOTP(otp.join(''));
	};

	const handleBackspace = (element: any, index: number) => {
		if (element.previousSibling) {
			const newOtp = [...otp];
			newOtp[index] = '';
			setOtp(newOtp);
			element.previousSibling.focus();

			//  return otp
			getOTP(otp.join(''));
		}
	};


	return (
		<div className="input-group">
			{label && (
				<label
					className={`input-label ${disabled && "disabled"}`}
					htmlFor={name}>
					{label}
					&nbsp;
					{required === true ? (
						<span className="input-field--required">*</span>
					) : (
						<span className="input-field--optional">(optional)</span>
					)}
				</label>
			)}
			<div className="input">
				<div className="otp-input">
					{otp.map((data, index) => (
						<input
							className="otp-input-field"
							type="text"
							name="otp"
							maxLength={1}
							key={index}
							value={data}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
							onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
								e.key === 'Backspace' && handleBackspace(e.currentTarget, index)
							}
							data-mtk-input
							required
						/>
					))}
				</div>
			</div>
		</div>
	)
}
