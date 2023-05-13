import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { asRem, styled, Button } from "styles/stitchesConfig";
import Card from "./Card";
import Loader from "./Loader";

export const HeaderWrapper = styled("div", {
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "space-between",
	height: "$$gridHeaderHeight",
	marginBottom: "$$gridHeaderMb",
	input: {
		background: "transparent",
		border: "none",
		borderBottom: `${asRem(1)} solid $colorGold`,
		color: "$colorSecondary",
		padding: asRem(5),
		marginRight: asRem(20),
		outline: "none",
		width: asRem(300),
	},
	".btn-clear": {
		marginLeft: asRem(10),
	},
});

export const ContentWrapper = styled("div", {
	$$rowGap: asRem(20),
	display: "grid",
	gridTemplateColumns: "repeat(5, calc((100% / 5) - $$rowGap))",
	gap: `${asRem(30)} $$rowGap`,
	overflow: "auto",
	position: "relative",
	button: {
		height: asRem(341.5),
	},
});

export const GridWrapper = styled("div", {
	$$gridHeaderHeight: asRem(50),
	$$gridHeaderMb: asRem(10),
});

interface IGridProps {
	items?: any;
	searchedVal?: string;
	totalCount?: number;
	isLoading?: boolean;
	onClear?: () => void;
	onLoadMore?: () => void;
	onSearch?: (x?: any) => void;
	onCreate?: () => void;
}

function Grid({
	items = [],
	searchedVal = "",
	totalCount = 0,
	isLoading = false,
	onClear,
	onLoadMore,
	onSearch,
	onCreate,
}: IGridProps) {
	const [searchVal, setSaerchVal] = useState<string>(searchedVal);
	const timeoutRef = useRef<any>(null);

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			if (!searchVal) return;
			onSearch?.(searchVal);
		}, 1000);
		return () => clearTimeout(timeoutRef?.current);
	}, [searchVal]);

	return (
		<GridWrapper className="grid">
			<HeaderWrapper className="grid-header">
				<h2>Movies:</h2>
				<aside>
					<input
						type="text"
						placeholder="Search..."
						onChange={(e) => setSaerchVal(e?.target?.value)}
					/>
					<Button
						type="button"
						styled="normal"
						className="btn-create"
						onClick={onCreate}
					>
						Add Movie
					</Button>
					<Button
						type="button"
						styled="normal"
						className="btn-clear"
						onClick={onClear}
					>
						Claer All
					</Button>
				</aside>
			</HeaderWrapper>
			<ContentWrapper className="grid-content">
				{isLoading && <Loader />}
				{!!items?.length &&
					items?.map((item: any) => {
						return (
							<Link key={item?.id} href={`/movie/${item?.id}`}>
								<Card item={item} />
							</Link>
						);
					})}
				{items?.length < totalCount && (
					<Button styled="normal" onClick={onLoadMore}>
						Load More
					</Button>
				)}
			</ContentWrapper>
		</GridWrapper>
	);
}

export default React.memo(Grid);
