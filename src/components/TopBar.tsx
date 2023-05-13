import Link from "next/link";
import { asRem, styled } from "styles/stitchesConfig";
import SvgIcon from "./SvgIcon";

const TopBarWrapper = styled("div", {
	background: "$color1",
	height: "100%",
	color: "$colorSecondary",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0 $$xAxisPadding",
	textTransform: "uppercase",
	a: {
		display: "flex",
		alignItems: "center",
		color: "$colorSecondary",
		svg: {
			marginRight: asRem(10),
		},
	},
});

function TopBar() {
	return <TopBarWrapper className="topbar">Movie Console</TopBarWrapper>;
}

export default TopBar;
