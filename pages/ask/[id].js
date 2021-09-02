import React, {useState} from 'react'
import Link from 'next/link'
import Meta from '../../component/Meta'
import styles from '../../styles/Home.module.scss'
import detailStyles from '../../styles/Details.module.scss'
import Moment from 'react-moment'
import _ from 'lodash'

export const getServerSideProps = async (context) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${context.params.id}.json?print=pretty`);
    const details = await res.json();
    const commentId = details.kids ? details.kids[0] : false;
    let hasComment = commentId === false ? commentId : true;
    let comment = {};
    
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
    const [commentData, setUpdateComment] = useState(comment)
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

    const addComment = () => {
        const c = document.getElementById('txtComment').value;

        if(!c) {
            return 'Please input comment first';
        }
        
        const commentIdList = details.kids || [];
        const generatedId = _.maxBy(commentIdList, o => { return o }) || 0;
        const newCommentId = generatedId + 1;
        console.info('comment: ', c)
        console.info('ids: ', commentIdList)
        console.info('max value: ', generatedId)
        // TODO: build object for new comment
        let data = {
            by: 'johnry',
            id: newCommentId,
            parent: details.id,
            text: c,
            time: new Date().getTime(),
            type: "comment"
        }
        console.info("KIDS: ", details.kids)
        // TODO: add comment ID to the kids property
        if (details.kids) {
            details.kids.push(newCommentId);
        } else {
            details.kids = [newCommentId]
        }
       
        console.info(data);
        console.info('details', details);
        // TODO: update comment
        setUpdateComment(data);
        // TODO: clear text area
        document.getElementById('txtComment').value = '';
    }
    return (
        <div className="container">
            <Meta />
            <div className={`row ` + styles.header}>
                <div className="twelve columns "><h5>Hacker News ASK</h5></div>
            </div>
            <div className={`row ` + styles.contentList}>
                <div className="twelve column">
                    <div className="row">
                        <div className={`twelve columns ` + styles.listContainer}>
                            <div className="row">
                                <div className={`twelve columns ` + styles.titleLink}>{details.title}</div>
                            </div>
                            <div className="row">
                                <div className={`twelve columns ` + styles.subTitle}>{details.score} points by {details.by} <Moment fromNow>{details.time}</Moment> | hide | past | web | favorite | {details.kids ? details.kids.length + ' comments' : 'discuss'}</div>
                            </div>
                            <div className="row">
                                <div className={`twelve columns ` + styles.commentText}>{renderHTML(details.text)}</div>
                            </div>
                            <div className="row">
                                <div className='twelve columns '>
                                    <textarea className="u-full-width" placeholder="Comment" id="txtComment"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className='twelve columns '>
                                    <input className="button-primary" type="button" onClick={addComment} value="Add Comment"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Comment Section */}
                {hasComment && (
                    <div className="row">
                        <div className={`twelve columns ` + styles.listContainer}>
                            <div className="row">
                                <div className={`twelve columns ` + styles.commentor}>{commentData.by} <Moment fromNow>{commentData.time}</Moment>&nbsp;[+]</div>
                            </div>
                            <div className="row">
                                <div className={`twelve columns ` + styles.commentContent}>{renderHTML(commentData.text)}</div>
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
