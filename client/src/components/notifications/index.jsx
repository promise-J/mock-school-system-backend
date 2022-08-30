import React, { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";
import "./notification.css";
import NotificationItem from "./NotificationItem";

export default function Notifications() {
  const { notifications } = useSelector((state) => state.app);
  const nodeRef = useRef(null);
  const refsList = [];

  return (
    <div className="notifications__list" ref={nodeRef}>
      <TransitionGroup component={null}>
        {notifications.map((notification, idx) => {
          refsList[idx] = React.createRef(null);
          return (
            <CSSTransition
              nodeRef={refsList[idx]}
              classNames="notification"
              timeout={2000}
              key={notification.id}
            >
              <NotificationItem ref={refsList[idx]} {...notification} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
