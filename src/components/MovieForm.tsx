import React, { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";
import Popup from "./Popup";
import MultiSelect from "./MultiSelect";
import Select from "./Select";
// import { client } from "pages/_app";
import { styled } from "@stitches/react";
import { Button, asRem } from "styles/stitchesConfig";
import { IDirector, IMovieInfo } from "contexts/MovieList";
import { useMoviesAPI } from "api/moviesAPI";
import { useDirectorsAPI } from "api/directorsAPI";

const MovieFormWrapper = styled("form", {
	$$flexGap: asRem(20),
	display: "flex",
	flexWrap: "wrap",
	gap: "$$flexGap",
	"label, .select, .multi-select": {
		flex: "0 0 calc(100% / 2 - $$flexGap)",
		"&:is(label)": {
			display: "flex",
			flexDirection: "column",
			span: {
				marginBottom: asRem(5),
			},
		},
	},
	input: {
		border: "none",
		borderBottom: `${asRem(1)} solid $colorGold`,
		background: "transparent",
		outline: "none",
		marginBottom: asRem(10),
		color: "$colorSecondary",
		width: "100%",
		padding: asRem(8),
		"&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
			display: "none",
		},
	},
	".footer": {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		width: "100%",
	},
});

interface IMLCreatePopupProps {
	data?: IMovieInfo;
	show?: boolean;
	cbk?: (x?: IMovieInfo) => void;
	onToggle?: (x?: boolean) => void;
}

function MovieForm({
	data = {},
	show = false,
	onToggle,
	cbk,
}: IMLCreatePopupProps) {
	const [movieInfo, setMovieInfo] = useState<IMovieInfo>({
		casts: data?.casts?.length ? data?.casts : [],
		directorId: data?.director?.id || "",
	});
	const { doCreate, doUpdate } = useMoviesAPI();
	const { fetchDirectors, directorsList, isFetching } = useDirectorsAPI();

	const directorOptions = useMemo(() => {
		return directorsList?.map((director: IDirector) => ({
			label: director?.name,
			value: director?.id,
		}));
	}, [directorsList]);

	const handleOnClose = useCallback(() => {
		onToggle?.(false);
		setMovieInfo((prev: IMovieInfo) => ({ ...prev, movieInfo: {} }));
	}, []);

	const handleOnMultiSelect = useCallback((val: string = "") => {
		if (!val) return;
		setMovieInfo((prev: IMovieInfo) => ({
			...prev,
			casts: [...(prev?.casts || []), val],
		}));
	}, []);

	const handleOnSelect = useCallback((val: string = "") => {
		if (!val) return;
		setMovieInfo((prev: IMovieInfo) => ({ ...prev, directorId: val }));
	}, []);

	const handleOnKeyDown = (e: any) => e?.key === "Enter" && e?.preventDefault();

	const handleOnSubmit = async (e: any) => {
		e?.preventDefault();
		const formData = {
			title: e?.target?.title?.value,
			genre: e?.target?.genre?.value,
			ratings: parseInt(e?.target?.ratings?.value, 10),
			year: parseInt(e?.target?.year?.value, 10),
		};

		const isValid = ![
			!!formData?.title,
			!!formData?.genre,
			!!formData?.ratings,
			!!formData?.year,
			!!movieInfo?.directorId,
		]?.includes(false);

		if (!isValid) return;
		if (data?.id) {
			doUpdate({
				input: { id: data?.id, ...formData, ...movieInfo },
				cbk: (data) => {
					cbk?.(data);
					onToggle?.(false);
				},
			});
		} else {
			doCreate({
				input: { ...formData, ...movieInfo },
				cbk: () => {
					cbk?.();
					onToggle?.(false);
				},
			});
		}
	};

	const handleOnRemove = useCallback((item: string = "") => {
		setMovieInfo((prev: IMovieInfo) => ({
			...prev,
			casts: prev?.casts?.filter((cast: string) => cast !== item),
		}));
	}, []);

	useEffect(() => {
		if (!directorsList?.length) fetchDirectors();
	}, []);

	return (
		<Popup
			title={data?.id ? "Edit Movie" : "Create Movie"}
			show={show}
			onClose={handleOnClose}
		>
			<MovieFormWrapper
				className={data?.id ? "edit-form" : "create-form"}
				onSubmit={handleOnSubmit}
			>
				<label>
					<span>Title:</span>
					<input
						type="text"
						name="title"
						placeholder="Title"
						defaultValue={data?.title || ""}
						onKeyDown={handleOnKeyDown}
					/>
				</label>
				<label>
					<span>Genre:</span>
					<input
						type="text"
						name="genre"
						placeholder="Genre"
						defaultValue={data?.genre || ""}
						onKeyDown={handleOnKeyDown}
					/>
				</label>
				<label>
					<span>Ratings:</span>
					<input
						type="number"
						name="ratings"
						placeholder="Ratings"
						min={0}
						max={5}
						defaultValue={data?.ratings || 0}
						onKeyDown={handleOnKeyDown}
					/>
				</label>
				<label>
					<span>Year:</span>
					<input
						type="number"
						name="year"
						placeholder="Year"
						defaultValue={data?.year || ""}
						onKeyDown={handleOnKeyDown}
					/>
				</label>
				<MultiSelect
					label="Casts:"
					name="casts"
					selectedItems={movieInfo?.casts}
					onRemove={handleOnRemove}
					onMultiSelectChange={handleOnMultiSelect}
				/>
				<Select
					label="Director:"
					options={directorOptions}
					selectedVal={data?.director?.id}
					onSelectChange={handleOnSelect}
				/>
				<div className="footer">
					<Button styled="normal" type="submit" className="btn-submit">
						{data?.id ? "Save" : "Create"}
					</Button>
				</div>
			</MovieFormWrapper>
		</Popup>
	);
}

export default React.memo(MovieForm);
