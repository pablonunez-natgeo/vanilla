/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import * as React from "react";
import { uniqueIDFromPrefix } from "@library/componentIDs";
import DropDown from "@library/components/dropdown/DropDown";
import { t } from "@library/application";
import FrameHeader from "@library/components/frame/FrameHeader";
import FrameBody from "@library/components/frame/FrameBody";
import FramePanel from "@library/components/frame/FramePanel";
import FrameFooter from "@library/components/frame/FrameFooter";
import Button, { ButtonBaseClass } from "@library/components/forms/Button";
import LinkAsButton from "@library/components/LinkAsButton";
import Frame from "@library/components/frame/Frame";
import { notifications, settings } from "@library/components/icons/common";

export interface INotification {
    unread?: boolean;
}

export interface INotificationsDropDownProps {
    className?: string;
    data: INotification[];
    userSlug: string;
}

interface IState {
    hasUnread: false;
    open: boolean;
}

/**
 * Implements Messages Drop down for header
 */
export default class NotificationsDropDown extends React.Component<INotificationsDropDownProps, IState> {
    private id = uniqueIDFromPrefix("notificationsDropDown");

    public constructor(props) {
        super(props);
        this.state = {
            hasUnread: false,
            open: false,
        };
    }

    public render() {
        return (
            <DropDown
                id={this.id}
                name={t("Messages")}
                buttonClassName={"vanillaHeader-messages"}
                renderLeft={true}
                buttonContents={notifications(this.state.open)}
                onVisibilityChange={this.setOpen}
            >
                <Frame>
                    <FrameHeader className="isShadowed" title={t("Notifications")}>
                        <LinkAsButton
                            title={t("Notification Preferences")}
                            className="headerDropDown-headerButton headerDropDown-messages button-pushRight"
                            to={`/profile/preferences/${this.props.userSlug}`}
                            baseClass={ButtonBaseClass.TEXT}
                        >
                            {settings()}
                        </LinkAsButton>
                    </FrameHeader>
                    <FrameBody className="isSelfPadded">
                        <FramePanel>{t("Messages Here")}</FramePanel>
                    </FrameBody>
                    <FrameFooter className="isShadowed">
                        <LinkAsButton
                            className="headerDropDown-footerButton headerDropDown-allButton button-pushLeft"
                            to={"/kb/messages"}
                            baseClass={ButtonBaseClass.TEXT}
                        >
                            {t("All Messages")}
                        </LinkAsButton>
                        <Button
                            onClick={this.handleAllRead}
                            disabled={this.state.hasUnread}
                            baseClass={ButtonBaseClass.TEXT}
                        >
                            {t("Mark All Read")}
                        </Button>
                    </FrameFooter>
                </Frame>
            </DropDown>
        );
    }

    private handleAllRead = e => {
        alert("Todo!");
    };

    private setOpen = open => {
        this.setState({
            open,
        });
    };
}