import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import BodyShort from '../BodyShort';
import PostActionButtons from '../PostActionButtons';
import Avatar from '../../widgets/Avatar';
import BookmarkButton from '../../bookmarks/BookmarkButton';
import PostModalLink from './../PostModalLink';
import ProfileTooltipOrigin from '../../user/profileTooltip/ProfileTooltipOrigin';
import './PostFeedList.scss';

const PostFeedList = ({
  post,
  onCommentRequest,
  bookmarks,
  toggleBookmark,
  notify,
  jsonMetadata,
  imagePath,
  openPostModal,
  reblog,
  isReblogged,
  handleShowCommentsRequest,
  handleShowLikesRequest,
  layout,
  intl,
}) =>
  <div className="PostFeedList">
    { imagePath &&
      <div className="PostFeedList__thumbs">
        <PostModalLink
          post={post}
          onClick={() => openPostModal(post.id)}
        >
          <img src={imagePath} />
        </PostModalLink>
      </div>
    }
    <div className="PostFeedList__cell PostFeedList__cell--body">
      <BookmarkButton
        post={post}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
      />
      <h2>
        <PostModalLink
          post={post}
          onClick={() => openPostModal(post.id)}
        >
          {post.title}
        </PostModalLink>
      </h2>
      <BodyShort body={post.body} />
      <div className="PostFeedList__cell PostFeedList__cell--bottom">
        <PostActionButtons
          post={post}
          notify={notify}
          onCommentRequest={onCommentRequest}
          onShowCommentsRequest={handleShowCommentsRequest}
          onShowLikesRequest={handleShowLikesRequest}
          reblog={reblog}
          isReblogged={isReblogged}
          layout={layout}
        />
        <span>
          <ProfileTooltipOrigin username={post.author} >
            <Link to={`/@${post.author}`}>
              <Avatar xs username={post.author} />
              {` ${post.author}`}
            </Link>
          </ProfileTooltipOrigin>
          <span className="hidden-xs">
            { ' ' }<FormattedMessage id="in" />{ ' ' }
            <Link to={`/hot/${post.category}`}>#{post.category}</Link>
          </span>
        </span>
      </div>

    </div>
  </div>;

export default injectIntl(PostFeedList);
