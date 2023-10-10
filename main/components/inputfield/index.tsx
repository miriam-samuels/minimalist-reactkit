import React, { useState } from 'react'
import './index.scss'

interface InputProps extends React.InputHTMLAttributes<any> {
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

export default InputField
