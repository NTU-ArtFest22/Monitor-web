import React from 'react';
import classNames from 'classnames';

import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = ({ showChat, children, showLegalHint, closeLegalHint }) => (
  <div className="root-container">
    {children}
    <div className={classNames('chatroom', { 'showChat': showChat })}>
      <ChatList />
      <SendMsg />
    </div>

    <div className={classNames('legal-hint', { show: showLegalHint })} onClick={closeLegalHint}>
      <span>畫面禁止截圖或翻拍，如因自行截圖或翻拍產生任何糾紛後果自負。</span>
      <i className="material-icons">close</i>
    </div>
  </div>
);

export default App;
