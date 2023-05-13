import React, { ReactElement } from "react";
import { asRem, darkTheme, styled } from "styles/stitchesConfig";
import TopBar from "./TopBar";
import MovieListProvider from "contexts/MovieList";

const LayoutWrapper = styled("div", {
	$$topBarHeight: asRem(50),
	$$xAxisPadding: asRem(20),
	$$yAxisPadding: asRem(30),
});

const HeaderWrapper = styled("div", {
	height: "$$topBarHeight",
});

const ContentWrapper = styled("div", {
	backgroundColor: "$color2",
	height: "calc(100vh - $$topBarHeight)",
	padding: "$$yAxisPadding $$xAxisPadding",
});

function Layout({ children }: { children: ReactElement }) {
	return (
		<LayoutWrapper className={`${darkTheme} layout`}>
			<HeaderWrapper>
				<TopBar />
			</HeaderWrapper>
			<ContentWrapper>
				<MovieListProvider>{children}</MovieListProvider>
			</ContentWrapper>
		</LayoutWrapper>
	);
}

export default React.memo(Layout);
