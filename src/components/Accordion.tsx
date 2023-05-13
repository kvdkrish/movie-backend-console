import React, { useEffect, useState } from "react";
import { Button, asRem, styled } from "styles/stitchesConfig";

const AccordionWrapper = styled("div", {
	".accordion-content": {
		display: "grid",
		gridTemplateRows: "0fr",
		transition: "grid-template-rows 0.2s ease-out",
		"&.show": {
			gridTemplateRows: "1fr",
			marginBottom: asRem(10),
		},
		".inner": {
			overflow: "hidden",
		},
	},
});

interface IAccordionProps {
	className?: string;
	title: string;
	children: React.ReactElement;
}

function Accordion({ className = "", title = "", children }: IAccordionProps) {
	const [showContent, setShowContent] = useState<boolean>(false);

	const handleOnToggle = () => setShowContent(!showContent);

	return (
		<AccordionWrapper className={`accordion ${className}`}>
			<Button
				styled="noStyle"
				className={`accordion-title ${showContent ? "show" : ""}`}
				onClick={handleOnToggle}
			>
				{title}
			</Button>
			<div className={`accordion-content ${showContent ? "show" : ""}`}>
				<div className="inner">{children}</div>
			</div>
		</AccordionWrapper>
	);
}

export default React.memo(Accordion);
