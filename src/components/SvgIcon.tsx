interface IIconValue {
	width: string;
	height: string;
	viewBox: string;
	path: React.ReactElement;
}

interface IIcon {
	[key: string]: IIconValue;
}

interface IOptions {
	fill?: string;
	stroke?: string;
	strokeWidth?: string;
}

interface ISvgIconProps {
	name: string;
	className?: string;
	options?: IOptions;
	onClick?: () => void;
}

const icons: IIcon = {
	backArrow: {
		width: "18",
		height: "18",
		viewBox: "0 0 490 490",
		path: (
			<polygon points="242.227,481.919 314.593,407.95 194.882,290.855 490,290.855 490,183.86 210.504,183.86 314.593,82.051    242.227,8.081 0,244.996  " />
		),
	},
};

function SvgIcon({
	className = "",
	name = "",
	onClick,
	options = {},
}: ISvgIconProps) {
	const svgData = icons?.[name] || null;

	if (!svgData) return null;
	return (
		<svg
			className={className}
			width={svgData?.width}
			height={svgData?.height}
			viewBox={svgData?.viewBox}
			fill="none"
			onClick={onClick}
			{...options}
		>
			{svgData?.path}
		</svg>
	);
}

export default SvgIcon;
