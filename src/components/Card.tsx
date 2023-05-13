import React from "react";
import { asRem, styled } from "styles/stitchesConfig";

const CardWrapper = styled("div", {
	background: "linear-gradient(to left top, black, 90%, $colorGold)",
	boxShadow: `${asRem(2)} ${asRem(2)} ${asRem(4)} ${asRem(2)} $shadowGold`,
	borderRadius: asRem(10),
	cursor: "pointer",
	display: "flex",
	flexDirection: "column",
	transition: "all 0.2s ease-in-out",
	"&:hover": {
		transform: "scale(0.95)",
	},
	img: {
		flex: 1,
	},
	h3: {
		flex: "0 0 10%",
		padding: asRem(10),
		textAlign: "center",
	},
});

interface ICardProps {
	item?: any;
}

function Card({ item = {} }: ICardProps) {
	return (
		<CardWrapper className="card">
			<img src="#" />
			<h3>{item?.title}</h3>
		</CardWrapper>
	);
}

export default React.memo(Card);
