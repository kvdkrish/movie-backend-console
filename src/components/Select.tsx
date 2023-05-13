import { asRem, styled } from "styles/stitchesConfig";

const SelectWrapper = styled("div", {
	display: "flex",
	flexDirection: "column",
	label: {
		marginBottom: asRem(10),
	},
	select: {
		background: "transparent",
		padding: asRem(5),
		border: `${asRem(1)} solid $colorGold`,
		borderRadius: asRem(5),
		color: "$colorSecondary",
		outline: "none",
	},
});

interface IOption {
	label: string;
	value: string;
}

interface ISelectProps {
	label?: string;
	options?: IOption[];
	selectedVal?: string;
	onSelectChange?: (x?: string) => void;
}

function Select({
	label = "",
	options = [],
	selectedVal,
	onSelectChange,
}: ISelectProps) {
	const handleOnChange = (e: any) => onSelectChange?.(e?.target?.value);

	return (
		<SelectWrapper className="select">
			{label && <label>{label}</label>}
			<select value={selectedVal} onChange={handleOnChange}>
				<option value="-1">Select</option>
				{options?.map(({ label, value }: IOption) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
		</SelectWrapper>
	);
}

export default Select;
