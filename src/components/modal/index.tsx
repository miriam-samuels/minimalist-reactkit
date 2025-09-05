import React from 'react'
import { createPortal } from 'react-dom';
import useClose from '../../hooks/useClose';
import './index.scss'


export interface ModalProps {
	heading?: string;
	sub?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	show?: boolean;
	className?: string;
	hide: () => void;
}

export function Modal(props: ModalProps) {
	const { heading, sub, children, className, show, hide } = props;
	const ref = useClose(hide);
	if (show) {
		return (
			<>
				{createPortal(
					<div id="modal">
						<div className="modal-container">
							<div className="modal-box"></div>
							<div className={`modal ${className && className}`} ref={ref}>
								<button className='cancel-btn' onClick={hide}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
									</svg>
								</button>
								<div className="modal-head">
									{heading && <h4 className="modal-heading">{heading}</h4>}
									{sub && <span className="modal-sub">{sub}</span>}
								</div>
								<div className="modal-content">{children}</div>
							</div>
						</div>
					</div>
					, document.body
				)}
			</>
		);
	} else {
		return <></>;
	}
}

