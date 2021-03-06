/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import * as React from "react";
import { dropDownMenu } from "@library/components/icons/common";
import { getRequiredID } from "@library/componentIDs";
import PopoverController from "@library/components/PopoverController";
import DropDownContents from "./DropDownContents";
import { ButtonBaseClass } from "@library/components/forms/Button";

export interface IProps {
    id?: string;
    name?: string;
    children: React.ReactNode;
    className?: string;
    renderAbove?: boolean; // Adjusts the flyout position vertically
    renderLeft?: boolean; // Adjusts the flyout position horizontally
    describedBy?: string;
    contentsClassName?: string;
    buttonContents?: React.ReactNode;
    buttonClassName?: string;
    buttonBaseClass?: ButtonBaseClass;
    disabled?: boolean;
    toggleButtonClassName?: string;
    setExternalButtonRef?: (ref: React.RefObject<HTMLButtonElement>) => void;
    onVisibilityChange?: (isVisible: boolean) => void;
}

export interface IState {
    selectedText: string;
}

/**
 * Creates a drop down menu
 */
export default class DropDown extends React.Component<IProps, IState> {
    private id;
    public constructor(props) {
        super(props);
        this.id = getRequiredID(props, "dropDown");
        this.state = {
            selectedText: "",
        };
    }

    public setSelectedText(selectedText) {
        this.setState({
            selectedText,
        });
    }

    public get selectedText(): string {
        return this.state.selectedText;
    }

    public render() {
        return (
            <PopoverController
                id={this.id}
                className={this.props.className}
                buttonBaseClass={this.props.buttonBaseClass || ButtonBaseClass.CUSTOM}
                name={this.props.name}
                buttonContents={this.props.buttonContents || dropDownMenu()}
                buttonClassName={this.props.buttonClassName}
                selectedItemLabel={this.selectedText}
                disabled={this.props.disabled}
                setExternalButtonRef={this.props.setExternalButtonRef}
                toggleButtonClassName={this.props.toggleButtonClassName}
                onVisibilityChange={this.props.onVisibilityChange}
            >
                {params => {
                    return (
                        <DropDownContents
                            {...params}
                            id={this.id + "-handle"}
                            parentID={this.id}
                            className={this.props.contentsClassName}
                            onClick={this.doNothing}
                            renderLeft={!!this.props.renderLeft}
                            renderAbove={!!this.props.renderAbove}
                        >
                            <ul className="dropDownItems">{this.props.children}</ul>
                        </DropDownContents>
                    );
                }}
            </PopoverController>
        );
    }

    private doNothing = e => {
        e.stopPropagation();
    };
}
