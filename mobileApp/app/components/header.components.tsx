import React from "react";
import { Appbar } from "react-native-paper";
import { theme } from "../../App.style";
import { headerStyle } from "./header.style";

export const HeaderComponent = (props: HeaderComponentParams) => {
    return (
        <Appbar.Header style={headerStyle.appback}>
            <Appbar.BackAction />
            <Appbar.Content title={props.title} />
        </Appbar.Header>
    )
}

interface HeaderComponentParams {
    title: string;
}