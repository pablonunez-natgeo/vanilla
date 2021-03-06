/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import * as React from "react";
import className from "classnames";
import { Link } from "react-router-dom";

interface IProps {
    className?: string;
    lastElement: boolean;
    url: string;
    name: string;
}

/**
 * A component representing a single crumb in a breadcrumb component.
 */
export default class Breadcrumb extends React.Component<IProps> {
    public render() {
        let ariaCurrent;
        if (this.props.lastElement) {
            ariaCurrent = `page`;
        }

        return (
            <li className="breadcrumb">
                <Link
                    to={this.props.url}
                    title={this.props.name}
                    aria-current={ariaCurrent}
                    className={className("breadcrumb-link", this.props.className, { isCurrent: ariaCurrent })}
                    itemScope
                    itemType="http://schema.org/Thing"
                    itemProp="item"
                >
                    <span className="breadcrumb-label" itemProp="name">
                        {this.props.name}
                    </span>
                </Link>
            </li>
        );
    }
}
