import { styled } from "styles/stitchesConfig";

const CheckboxWrapper = styled("div", {
	color: "$colorSecondary",
	label: {
		cursor: "pointer",
	},
});

export interface ICheckboxProps {
	label?: string;
	name: string;
	checked?: boolean;
	onChange?: (x?: string, y?: boolean) => void;
}

function Checkbox({
	label = "",
	name = "",
	checked,
	onChange,
}: ICheckboxProps) {
	return (
		<CheckboxWrapper className="checkbox">
			<label>
				<input
					type="checkbox"
					checked={checked}
					name={name}
					onChange={(e) => onChange?.(name, e?.target?.checked)}
				/>
				<span>{label}</span>
			</label>
		</CheckboxWrapper>
	);
}

export default Checkbox;
