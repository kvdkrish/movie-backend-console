import { asRem, keyframes, styled } from "styles/stitchesConfig";

const spin = keyframes({
	"0%": {
		transform: "rotate(0deg)",
	},
	"100%": {
		transform: "rotate(360deg)",
	},
});

export const LoaderInnerWrapper = styled("div", {
	border: `${asRem(4.2)} solid rgba($colorRGBWhite, 0.5)`,
	borderTop: `${asRem(4.2)} solid $color4`,
	borderRadius: "50%",
	width: asRem(44),
	height: asRem(44),
	animation: `${spin} 0.6s linear infinite`,
	zIndex: 10,
});

export const LoaderMaskWrapper = styled("div", {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: "rgb($colorRGBWhite, 0.2)",
	borderRadius: asRem(5),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 9,
});

const LoaderWrapper = styled("div", {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

interface ILoaderProps {
	showMask?: boolean;
}

function Loader({ showMask = true }: ILoaderProps) {
	return (
		<LoaderWrapper>
			{showMask && <LoaderMaskWrapper />}
			<LoaderInnerWrapper className="inner" />
		</LoaderWrapper>
	);
}

export default Loader;
