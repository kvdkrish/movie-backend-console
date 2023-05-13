import React from "react";
import { createPortal } from "react-dom";
import { asRem, styled, Button } from "styles/stitchesConfig";

const Mask = styled("div", {
	content: "",
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	background: "rgba(0, 0, 0, 0.5)",
	cursor: "pointer",
});

const PopupInner = styled("div", {
	background: "$color1",
	color: "$colorSecondary",
	padding: asRem(20),
	width: asRem(500),
	borderRadius: asRem(10),
	zIndex: "1",
	position: "relative",
	".title": {
		fontSize: asRem(18),
		marginBottom: asRem(20),
		".btn-close": {
			position: "absolute",
			right: asRem(20),
			color: "$colorSecondary",
		},
	},
});

const PopupContainer = styled("div", {
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

const PopupWrapper = styled("div", {});

interface IPopupProps {
	show?: boolean;
	showMask?: boolean;
	className?: string;
	children?: React.ReactElement;
	title?: string;
	onClose?: () => void;
}

function Popup({
	show = false,
	showMask = true,
	className = "",
	title = "",
	children,
	onClose,
}: IPopupProps) {
	return (
		<PopupWrapper className="popup">
			{show &&
				createPortal(
					<PopupContainer className={`popup-container ${className}`.trim()}>
						{showMask && <Mask className="mask" onClick={onClose} />}
						<PopupInner className="popup-inner">
							<div className="title">
								{title}
								<Button
									type="button"
									className="btn-close"
									onClick={onClose}
									styled="noStyle"
								>
									X
								</Button>
							</div>
							<div className="content">{children}</div>
						</PopupInner>
					</PopupContainer>,
					document?.querySelector("#portal") || document?.body
				)}
		</PopupWrapper>
	);
}

export default React.memo(Popup);
