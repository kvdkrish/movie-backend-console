import { useEffect, useState } from "react";

interface IClientOnlyProps {
	children: React.ReactElement;
}

function ClientOnly({ children }: IClientOnlyProps) {
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) return null;
	return <div>{children}</div>;
}

export default ClientOnly;
