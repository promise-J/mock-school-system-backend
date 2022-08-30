import React from "react";

import { useDispatch } from "react-redux";
import { dispatchUnNotify } from "../../redux/actions/appAction";
function NotificationItem({ id, message, status }, ref) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(dispatchUnNotify(id));
    }, 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, id]);

  return (
    <div ref={ref} className={`notifications__item ${status}`}>
      {message}
    </div>
  );
}

export default React.forwardRef(NotificationItem);
