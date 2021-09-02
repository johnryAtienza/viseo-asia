import React from 'react'
import Link from 'next/link'
import Meta from '../../component/Meta'
import styles from '../../styles/Home.module.scss'
import detailStyles from '../../styles/Details.module.scss'
import Moment from 'react-moment'

export const getServerSideProps = async (context) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${context.params.id}.json?print=pretty`);
    const details = await res.json();
    const commentId = details.kids ? details.kids[0] : false;
    let hasComment = commentId === false ? commentId : true;
    let comment = {};
    console.info(details.kids, commentId);
    if (commentId) {
            
        const com = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`);
        comment = await com.json();
    }

    return {
        props: {
            details,
            hasComment,
            comment
        }
    }
}
function AskDetails({details, hasComment, comment}) {
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    return (
        <div className="container">
            <Meta />
            <div className={`row ` + styles.header}>
                <div className="twelve columns "><h5>Hacker News ASK</h5></div>
            </div>
            <div className={`row ` + styles.contentList}>
                <div className="twelve column">
                    <div className="row">
                        <div className="one column">&nbsp;</div>
                        <div className={`eleven columns ` + styles.listContainer}>
                            <div className="row">
                                <div className={`twelve columns ` + styles.titleLink}><Link href={`/ask/` + details.id}>{details.title}</Link></div>
                            </div>
                            <div className="row">
                                <div className={`twelve columns ` + styles.subTitle}>{details.score} points by {details.by} <Moment fromNow>{details.time}</Moment> | hide | past | web | favorite | {details.kids ? details.kids.length + ' comments' : 'discuss'}</div>
                            </div>
                            <div className="row">
                                <div className='twelve columns '>{renderHTML(details.text)}</div>
                            </div>
                            <div className="row">
                                <div className='twelve columns '>
                                    <textarea className="u-full-width" placeholder="Comment" ></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className='twelve columns '>
                                    <input className="button-primary" type="button" value="Add Comment"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {hasComment && (
                    <div className="row">
                        <div className="one column">&nbsp;</div>
                        <div className={`eleven columns ` + styles.listContainer}>
                            <div className="row">
                                <div className={`twelve columns ` + styles.commentor}>{comment.by} <Moment fromNow>{comment.time}</Moment></div>
                            </div>
                            <div className="row">
                                <div className={`twelve columns ` + styles.commentContent}>{renderHTML(comment.text)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Link href="/">Go Back</Link>
        </div>
    )
}

export default AskDetails
