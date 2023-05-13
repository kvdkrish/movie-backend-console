import { Button, styled, darkTheme, asRem } from "styles/stitchesConfig";
import Popup from "./Popup";

const DeleteWrapper = styled("div", {
	strong: {
		color: "$color3",
	},
	h4: {
		padding: asRem(20),
	},
	".footer": {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
	},
});

interface IDeleteMoviePopupProps {
	show?: boolean;
	title: string;
	onToggle?: (x?: boolean) => void;
	onDelete?: () => void;
}

function DeleteMoviePopup({
	show = false,
	title = "",
	onDelete,
	onToggle,
}: IDeleteMoviePopupProps) {
	return (
		<Popup show={show} onClose={() => onToggle?.(false)}>
			<DeleteWrapper className={`delete-popup ${darkTheme}`}>
				<h4>
					Are you sure want to delete <strong>{title}</strong>?
				</h4>
				<div className="footer">
					<Button styled="normal" onClick={onDelete}>
						Delete
					</Button>
				</div>
			</DeleteWrapper>
		</Popup>
	);
}

export default DeleteMoviePopup;
