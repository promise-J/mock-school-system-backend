import React from "react";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { dispatchNotify } from "./redux/actions/appAction";

export function useNotify() {
  const dispatch = useDispatch();
  const notify = React.useCallback(
    (status, message) => {
      dispatch(dispatchNotify(status, message));
    },
    [dispatch]
  );

  return notify;
}

export function useFilter(pathname, defaults = {}) {
  const { search } = useLocation();
  const history = useHistory();
  const filter = React.useMemo(() => queryString.parse(search), [search]);
  // console.log('filter ', filter)
  const updateFilter = (newFilter) => {
    const filterWithoutDefaults = {};
    for (const key in newFilter) {
      if (newFilter[key] !== defaults[key]) {
        filterWithoutDefaults[key] = newFilter[key];
      }
    }
    const urlWithQuery = queryString.stringify(filterWithoutDefaults);
    history.push({ pathname, search: urlWithQuery });
  };

  return { updateFilter, filter };
}
