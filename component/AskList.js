import React from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import styles from '../styles/Home.module.scss'



function Asklist({data}) {
    return (
        <>
        {data.map((row, index) => (
            <div className={`row ` + styles.contentList} key={row.id}>
                <div className="twelve column">
                    <div className="row">
                    <div className="one column"></div>
                    <div className={`twelve columns home ` + styles.listContainer}  data-numbering={(index + 1) + '.'}>
                        <div className="row">
                        <div className={`twelve columns ` + styles.titleLink}><Link href={`/ask/` + row.id}>{row.title}</Link></div>
                        </div>
                        <div className="row">
                        <div className={`twelve columns ` + styles.subTitle}>{row.score} points by {row.by} <Moment fromNow>{row.time}</Moment> | {row.kids !== undefined ? row.kids.length + ' comments' : 'discuss'}</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            ))}
        </>
    )
}

export default Asklist
