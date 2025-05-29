import { CSSProperties } from "react";
import { IconType } from "react-icons";

export interface IndexPageContent {
    HEADER: {
        title: string;
        description: string;
    };
    SECTIONS: IndexPageContent_Section[];
}

export interface IndexPageContent_Section {
    additionalStyles?: CSSProperties;
    id: string;
    items: IndexPageContent_Section_Item[];
    title: string;
}

interface IndexPageContent_Section_Item {
    Icon: IconType,
    title: string,
    description?: string;
}