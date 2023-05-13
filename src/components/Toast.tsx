import React, { useEffect, useRef } from "react";
import { asRem, styled } from "styles/stitchesConfig";

const ToastWrapper = styled("div", {
	position: "absolute",
	top: asRem(30),
	right: 0,
	background: "$colorPrimary",
	color: "$colorSecondary",
	width: 0,
	overflow: "hidden",
	minHeight: asRem(50),
	borderRadius: asRem(2),
	display: "flex",
	alignItems: "center",
	transition: "width 0.2s linear",
	zIndex: 1,
	"&.show": {
		borderLeft: `${asRem(5)} solid green`,
		padding: asRem(10),
		width: asRem(400),
	},
});

interface IToastProps {
	show?: Boolean;
	message?: string;
	onClose?: () => void;
}

function Toast({ show = false, message = "", onClose }: IToastProps) {
	const timeoutRef = useRef<any>(null);

	useEffect(() => {
		if (!show) return;
		timeoutRef.current = setTimeout(() => {
			onClose?.();
		}, 5000);

		return () => clearTimeout(timeoutRef?.current);
	}, [show]);

	return (
		<ToastWrapper className={`toast ${show ? "show" : ""}`}>
			{message}
		</ToastWrapper>
	);
}

export default React.memo(Toast);
