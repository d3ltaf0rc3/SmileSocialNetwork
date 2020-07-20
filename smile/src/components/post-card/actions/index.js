import React, { Component } from 'react'
import styles from './index.module.css';
import commentIcon from '../../../images/comment.svg';
import heartIcon from '../../../images/heart.svg';
import redHeartIcon from '../../../images/redHeart.svg'

class PostActions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasLiked: false
        }
    }

    changeIcon = () => {
        this.setState({
            hasLiked: !this.state.hasLiked
        })
    }

    render() {
        return (
            <div className={styles["post-actions"]}>
                <span>
                    <img src={this.state.hasLiked ? redHeartIcon : heartIcon} className={styles["post-action"]} alt="heart" onClick={this.changeIcon} />
                </span>
                <span>
                    <label htmlFor={this.props.imageUrl}><img src={commentIcon} className={styles["post-action"]} alt="comment" /></label>
                </span>
            </div>
        )
    }
};

export default PostActions;