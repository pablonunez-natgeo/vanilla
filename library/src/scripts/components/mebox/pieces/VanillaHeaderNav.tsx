/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import * as React from "react";
import classNames from "classnames";
import VanillaHeaderNavItem, { IHeaderNav } from "./VanillaHeaderNavItem";

export interface IVanillaHeaderNavProps {
    className?: string;
    children: IHeaderNav[];
    linkClassName?: string;
    linkContentClassName?: string;
}

/**
 * Implements Navigation component for header
 */
export default class VanillaHeaderNav extends React.Component<IVanillaHeaderNavProps> {
    public render() {
        const content = this.props.children.map((item, key) => {
            return (
                <VanillaHeaderNavItem
                    {...item}
                    linkContentClassName={this.props.linkContentClassName}
                    linkClassName={this.props.linkClassName}
                    key={`headerNavItem-${key}`}
                />
            );
        });
        return (
            <nav className={classNames("headerNavigation", this.props.className)}>
                <ul className="headerNavigation-items">{content}</ul>
            </nav>
        );
    }
}
