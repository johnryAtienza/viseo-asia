import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Meta from '../component/Meta'
import Moment from 'react-moment'

export const getServerSideProps = async () => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`);
  const details = await res.json();
  let limit = 10;
  let data = [];

  for (let i = 0; i < limit; i++) {
    const item = details[i];
      const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/` + item + `.json?print=pretty`);
      const d = await r.json();
      data.push(d);
  }
  console.info("promise")

  return {
      props: {
          details,
          data
      }
  }
}

export default function Home({details,data}) {
  return (
    <div className="container">
      <Meta />
      <div className={`row ` + styles.header}>
        <div className="twelve columns "><h5>Hacker News ASK</h5></div>
      </div>
      {data.map((row, index) => (
        <div className={`row ` + styles.contentList} key={row.id}>
          <div className="twelve column">
            <div className="row">
              <div className="one column"><span className={styles.listNumber}>{index + 1}.</span> <span className={styles.arrow}>▶</span></div>
              <div className={`eleven columns ` + styles.listContainer}>
                <div className="row">
                  <div className="twelve columns">{row.title}</div>
                </div>
                <div className="row">
                  <div className={`twelve columns ` + styles.subTitle}>{row.score} points by {row.by} <Moment fromNow>{row.time}</Moment> | {row.kids ? row.kids.length + ' comments' : 'discuss'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  )
}
