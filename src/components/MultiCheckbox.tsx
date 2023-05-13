import { styled } from "styles/stitchesConfig";
import Checkbox from "./Checkbox";
import React, { useCallback } from "react";

const MultiCheckboxWrapper = styled("div", {
	color: "$colorSecondary",
	label: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
	},
});

interface ICheckBox {
	label: string;
	name: string;
	checked?: boolean;
}

interface IMultiCheckboxProps {
	items?: ICheckBox[];
	type?: string;
	selectedVal?: string;
	name: string;
	behaviour?: "radio";
	onChange?: (x?: string, y?: string[]) => void;
}

function MultiCheckbox({
	items = [],
	name = "",
	selectedVal = "",
	behaviour,
	onChange,
}: IMultiCheckboxProps) {
	const handleOnChange = useCallback(
		(key: string = "", val: boolean = false) => {
			if (behaviour === "radio") {
				if (selectedVal === key) {
					onChange?.(name);
					return;
				}
				if (val) onChange?.(name, [key]);
			}
		},
		[selectedVal, behaviour, name]
	);

	return (
		<MultiCheckboxWrapper className="multi-checkbox">
			{items?.map(({ label, name: cn, checked = false }: ICheckBox) => {
				return (
					<Checkbox
						key={cn}
						label={label}
						name={cn}
						checked={selectedVal === cn ? true : checked}
						onChange={handleOnChange}
					/>
				);
			})}
		</MultiCheckboxWrapper>
	);
}

export default React.memo(MultiCheckbox);
