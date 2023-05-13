import React, { useCallback, useEffect, useMemo, useState } from "react";
import { asRem, styled } from "styles/stitchesConfig";
import Accordion from "./Accordion";
import MultiCheckbox from "./MultiCheckbox";
import FilterSelect from "./FilterSelect";
import { IFilter, IFilterValue, ISort } from "pages";

const GridActionsWrapper = styled("div", {
	">.accordion": {
		button: {
			color: "$colorSecondary",
			padding: `${asRem(10)} ${asRem(20)}`,
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			fontSize: asRem(16),
			"&::after": {
				content: "",
				border: `${asRem(2)} solid $colorSecondary`,
				borderLeft: "none",
				borderTop: "none",
				padding: asRem(3),
				transform: "rotateZ(-45deg)",
				transition: "transform 0.2s linear",
			},
			"&.show::after": {
				transform: "rotateZ(45deg)",
			},
		},
		">button": {
			background: "$colorPrimary",
			borderRadius: asRem(5),
			marginBottom: asRem(10),
		},
		".checkbox": {
			padding: `${asRem(10)} ${asRem(20)}`,
		},
		".filter-select": {
			padding: `${asRem(0)} ${asRem(20)}`,
			select: {
				border: "none",
				background: "transparent",
				borderBottom: `${asRem(1)} solid $colorGold`,
				oultine: "none",
			},
		},
	},
});

interface IGridActionsProps {
	sort?: ISort;
	filter?: IFilter;
	onSortChange?: (x?: string, y?: string[]) => void;
	onFilterChange?: (x: string, y: IFilterValue) => void;
}

function GridActions({
	sort,
	filter,
	onSortChange,
	onFilterChange,
}: IGridActionsProps) {
	const sortOptions = useMemo(
		() => ({
			ratings: [
				{ label: "Low to High", name: "asc" },
				{ label: "High to Low", name: "desc" },
			],
			title: [
				{ label: "A to Z", name: "asc" },
				{ label: "Z to A", name: "desc" },
			],
			year: [
				{ label: "Old to New", name: "asc" },
				{ label: "New to Old", name: "desc" },
			],
		}),
		[]
	);

	const filterOptions = useMemo(
		() => ({
			ratings: {
				range: [0, 5],
			},
			year: {
				range: [2010, new Date().getFullYear()],
			},
		}),
		[]
	);

	return (
		<GridActionsWrapper className="grid-actions">
			<Accordion title="Sort">
				<>
					<Accordion title="Ratings">
						<MultiCheckbox
							name="ratings"
							behaviour="radio"
							items={sortOptions?.ratings}
							selectedVal={sort?.ratings}
							onChange={onSortChange}
						/>
					</Accordion>
					<Accordion title="Tile">
						<MultiCheckbox
							name="title"
							behaviour="radio"
							items={sortOptions?.title}
							selectedVal={sort?.title}
							onChange={onSortChange}
						/>
					</Accordion>
					<Accordion title="Year">
						<MultiCheckbox
							name="year"
							behaviour="radio"
							items={sortOptions?.year}
							selectedVal={sort?.year}
							onChange={onSortChange}
						/>
					</Accordion>
				</>
			</Accordion>
			<Accordion title="Filter">
				<>
					<Accordion title="ratings">
						<FilterSelect
							name="ratings"
							selectedVal={filter?.ratings}
							range={filterOptions?.ratings?.range}
							onChange={onFilterChange}
						/>
					</Accordion>
					<Accordion title="year">
						<FilterSelect
							name="year"
							selectedVal={filter?.ratings}
							range={filterOptions?.year?.range}
							onChange={onFilterChange}
						/>
					</Accordion>
				</>
			</Accordion>
		</GridActionsWrapper>
	);
}

export default React.memo(GridActions);
