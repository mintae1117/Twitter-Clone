import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdDate: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdDate", "desc"),
      limit(30)// 최근 30개만 가져오기. 요금제 때문에.
    );
    const spanshot = await getDocs(tweetsQuery);
    const tweets = spanshot.docs.map((doc) => {
      const { tweet, createdDate, userId, username, photo } = doc.data();
      return {
        tweet,
        createdDate,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweet(tweets);
  };
  
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}