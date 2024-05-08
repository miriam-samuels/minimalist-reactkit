import React from 'react'
import useClose from '../../hooks/useClose';
import './index.scss'


export interface ModalProps {
	heading?: string;
	sub?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	show?: boolean;
	className?: string;
	hide: () => void;
};
function Modal(props: ModalProps) {
	const { heading, sub, children, className, show, hide } = props;
	const ref = useClose(hide);
	if (show) {
		return (
			<div id="modal">
				<div className="modal-container">
					<div className="modal-box"></div>
					<div className={`modal ${className && className}`} ref={ref}>
						<button className='cancel-btn' onClick={hide}>x</button>
						<div className="modal-head">
							{heading && <h4 className="modal-heading">{heading}</h4>}
							{sub && <span className="modal-sub">{sub}</span>}
						</div>
						<div className="modal-content">{children}</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}


export default Modal
