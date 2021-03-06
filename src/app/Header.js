import React, { Component, PropTypes } from 'react';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showSidebar } from '../actions';
import Icon from '../widgets/Icon';
import './Header.scss';

@connect(
  state => ({
    app: state.app,
    auth: state.auth,
  }),
  dispatch => bindActionCreators({
    showSidebar: showSidebar,
  }, dispatch)
)
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    showSidebar: PropTypes.func,
    title: PropTypes.string,
  };

  render() {
    return (
      <header>
        <div className="top-nav">
          {!this.props.app.sidebarIsVisible &&
            <a className="left ml-2" onClick={() => this.props.showSidebar()}>
              <Icon name="menu" className="Icon--menu" />
            </a>
          }
          <div className="Header__title">
            {this.props.title}
          </div>
          <div className="section-content top-head">
            <div className="logo">
              <Link to="/" onlyActiveOnIndex activeClassName="active">
                <img src="/img/logo.svg" />
              </Link>
            </div>
          </div>
          {this.props.auth.isAuthenticated
            ? <div className="right mr-2">
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Write</Tooltip>}>
                <Link to="/write">
                  <Icon name="add" className="Icon--menu" />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Bookmarks</Tooltip>}>
                <Link to="/bookmarks">
                  <Icon name="bookmarks" className="Icon--menu" />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Help</Tooltip>}>
                <Link to="/help">
                  <Icon name="help_outline" className="Icon--menu" />
                </Link>
              </OverlayTrigger>
            </div>
            : <div className="right mr-2">
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Help</Tooltip>}>
                <Link to="/help">
                  <Icon name="help_outline" className="Icon--menu" />
                </Link>
              </OverlayTrigger>
            </div>
          }
        </div>

        {this.props.children &&
          <div className="app-nav">
            {this.props.children}
          </div>
        }
      </header>
    );
  }
}

