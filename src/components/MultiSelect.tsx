import React, { useEffect, useRef } from "react";
import { KeyboardEvent } from "react";
import { useState } from "react";
import { Button, asRem, styled } from "styles/stitchesConfig";

const Chipset = styled("div", {
	display: "flex",
	alignItems: "center",
	overflowX: "auto",
	gap: asRem(5),
	width: "100%",
	"&::-webkit-scrollbar": {
		display: "none",
	},
	span: {
		whiteSpace: "nowrap",
		background: "$color3",
		padding: asRem(5),
		borderRadius: asRem(10),
		display: "flex",
		alignItems: "center",
	},
	".btn-close": {
		marginLeft: asRem(5),
		color: "$colorSecondary",
	},
});

const MultiSelectWrapper = styled("div", {
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
	label: {
		marginBottom: asRem(5),
	},
});

interface IMultiSelectProps {
	label?: string;
	name?: string;
	selectedItems?: string[];
	onRemove?: (x?: string) => void;
	onMultiSelectChange?: (x?: string) => void;
}

function MultiSelect({
	label = "",
	name = "",
	selectedItems = [],
	onRemove,
	onMultiSelectChange,
}: IMultiSelectProps) {
	const inputRef = useRef<any>(null);

	const handleOnKeyUp = (e: KeyboardEvent) => {
		if (e?.key !== "Enter") return;
		onMultiSelectChange?.(inputRef?.current?.value);
		inputRef.current.value = "";
	};

	const handleOnKeyDown = (e: KeyboardEvent) =>
		e?.key === "Enter" && e?.preventDefault();

	return (
		<MultiSelectWrapper className="multi-select">
			{label && <label>{label}</label>}
			<input
				type="text"
				placeholder="Enter the cast"
				name={name}
				ref={inputRef}
				onKeyUp={handleOnKeyUp}
				onKeyDown={handleOnKeyDown}
			/>
			<Chipset>
				{selectedItems?.map((item: string, idx: number) => (
					<span key={`${item}_${idx}`}>
						{item}
						<Button
							className="btn-close"
							styled="noStyle"
							onClick={() => onRemove?.(item)}
						>
							x
						</Button>
					</span>
				))}
			</Chipset>
		</MultiSelectWrapper>
	);
}

export default React.memo(MultiSelect);
