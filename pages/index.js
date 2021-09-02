import Head from 'next/head'
import Image from 'next/image'
import Meta from '../component/Meta'
import AskList from '../component/AskList'
import styles from '../styles/Home.module.scss'

export const getServerSideProps = async () => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`);
  const details = await res.json();
  let data = [];

  for (let i = 0; i < details.length; i++) {
    const item = details[i];
      const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/` + item + `.json?print=pretty`);
      const d = await r.json();
      data.push(d);
  }

  return {
      props: {
          details,
          data
      }
  }
}

export default function Home({details, data}) {
  return (
    <div className="container">
      <Meta />
      <div className={`row ` + styles.header}>
        <div className="twelve columns "><h5>Hacker News ASK</h5></div>
      </div>
      <AskList data={data}/>
      
    </div>
  )
}
