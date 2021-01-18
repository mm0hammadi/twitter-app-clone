import React from 'react';
import Tweet from "./Tweet";

const TweetList = ({data}) => {
  return (
    <div>
      {data.map(tweet => <Tweet data={tweet} />)}
    </div>
  );
};

export default TweetList;