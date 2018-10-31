/**
 * @author Adam (charrondev) Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import Header from "quill/formats/header";
import { slugify } from "@library/utility";

interface IValue {
    level: 2;
    ref: string;
}

/**
 * Overridden heading blot that keeps a deterministicly calculated reference to its contents.
 */
export default class HeaderBlot extends Header {
    /**
     * Extend the existing header blot creation to allow for extra data saved.
     *
     * @param value - Either the basic header blot format (just the number of the level), or an expanded one with a ref.
     */
    public static create(value: IValue | number) {
        let level;
        if (typeof value === "number") {
            level = value;
        } else {
            level = value.level;
        }

        const element = super.create(level) as Element;
        if (typeof value === "object" && value.ref) {
            element.setAttribute("data-id", value.ref);
        }
        return element;
    }

    /**
     * Calculate a "unique" ID for the header.
     * This is deterministic but there can be collisions if headings are identical.
     *
     * @param val
     */
    private static calcUniqueID(val: string): string {
        return encodeURIComponent(slugify(val));
    }

    /**
     * Override built in formats method to return a unique ID in addition to the heading level.
     *
     * @param domNode The element to pull a value out of.
     */
    public static formats(domNode: Element): IValue {
        return {
            level: super.formats(domNode),
            ref: this.calcUniqueID(domNode.textContent || ""),
        };
    }
}