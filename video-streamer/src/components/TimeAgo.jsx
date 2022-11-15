import { formatDistanceToNow } from "date-fns";
import parseISO from "date-fns/parseISO";

import React from "react";

function TimeAgo({ timestamp, streamData }) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp;{" "}
      <i>
        by {streamData.username} - {timeAgo}
      </i>
    </span>
  );
}

export default TimeAgo;
