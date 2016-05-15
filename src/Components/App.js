import React from 'react';
import classNames from 'classnames';

import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = ({ showChat, children, showLegalHint, closeLegalHint, windowLoaded }) => (
  <div className="root-container">
    {children}
    <div className={classNames('chatroom', { 'showChat': showChat })}>
      <a className="logo" target="_blank" href="https://www.facebook.com/NTUartfest/photos/a.165603326811433.29577.157551030949996/1057585507613206/?type=3&theater">
        <img src="/logo.png" />
      </a>
      <ChatList />
      <SendMsg />
    </div>

    <div className={classNames('legal-hint', { show: showLegalHint })} onClick={closeLegalHint}>
      <span>畫面禁止截圖或翻拍，如因自行截圖或翻拍產生任何糾紛後果自負。</span>
      <i className="material-icons">close</i>
    </div>

    {/*<img className={classNames('banner', { loaded: windowLoaded })} src="/banner.png" />*/}
  </div>
);

export default App;
