import React, { useRef, useState } from "react";
import { asRem, styled } from "styles/stitchesConfig";
import { iterator } from "utils/common";

const Divider = styled("div", {
	"&::before": {
		content: ":",
	},
});

const FilterSelectWrapper = styled("div", {
	display: "flex",
	gap: asRem(5),
});

interface IValue {
	operator: string;
	value: string | string[];
}

interface IFilterSelectProps {
	selectedVal?: IValue;
	name: string;
	range?: number[];
	onChange?: (x: string, y: IValue) => void;
}

function FilterSelect({
	name,
	range = [],
	selectedVal,
	onChange,
}: IFilterSelectProps) {
	const [selectedOperator, setSelectedOperator] = useState<string>("eq");
	const minSelectRef = useRef<any>(null);
	const maxSelectRef = useRef<any>(null);

	const handleOnChange = (key: string, val: string) => {
		if (key === "range") {
			if (
				parseInt(minSelectRef?.current?.value, 10) < 0 ||
				parseInt(maxSelectRef?.current?.value, 10) < 0
			)
				return;
			onChange?.(name, {
				operator: key,
				value: [minSelectRef?.current?.value, maxSelectRef?.current?.value],
			});
		} else {
			if (parseInt(val, 10) < -1) return;
			onChange?.(name, { operator: key, value: val });
		}
	};

	const getComponent = (operatorType: string) => {
		switch (operatorType) {
			case "eq":
			case "ne":
				return (
					<select
						value={selectedVal?.value}
						onChange={(e) => handleOnChange(operatorType, e?.target?.value)}
						style={{ width: "100%" }}
					>
						<option value={-1}>select</option>
						{iterator(range[1] + 1, range[0])?.map((num: number) => (
							<option key={num} value={num}>
								{num}
							</option>
						))}
					</select>
				);
			case "range":
				return (
					<>
						<select
							className="min-range"
							ref={minSelectRef}
							value={selectedVal?.value?.[0]}
							onChange={(e) => handleOnChange(operatorType, e?.target?.value)}
						>
							<option value={-1}>select</option>
							{iterator(range[1] + 1, range[0])?.map((num: number) => (
								<option key={num} value={num}>
									{num}
								</option>
							))}
						</select>
						<span>&nbsp;btw&nbsp;</span>
						<select
							className="max-range"
							ref={maxSelectRef}
							value={selectedVal?.value?.[1]}
							onChange={(e) => handleOnChange(operatorType, e?.target?.value)}
						>
							<option value={-1}>select</option>
							{iterator(range[1] + 1, range[0])?.map((num: number) => (
								<option key={num} value={num}>
									{num}
								</option>
							))}
						</select>
					</>
				);
			default:
				console.log("No Operators matched!");
		}
	};

	return (
		<FilterSelectWrapper className="filter-select">
			<select
				className="operator"
				onChange={(e) => setSelectedOperator(e?.target?.value)}
				style={{ width: asRem(65) }}
			>
				<option value="eq">Equals</option>
				<option value="ne">Not equals</option>
				<option value="range">Range</option>
			</select>
			<Divider />
			<div>{getComponent(selectedOperator)}</div>
		</FilterSelectWrapper>
	);
}

export default React.memo(FilterSelect);
