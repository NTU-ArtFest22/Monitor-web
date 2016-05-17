const adjs = [
    '膽怯的',
    '監視的',
    '不安的',
    '侵犯的',
    '深層的',
    '多元的',
    '黑暗的',
    '中二的',
    '漂浮的',
    '跑步的',
    '偷看的',
    '孤獨的'
];

const ns = [
    '鏡頭',
    '心靈',
    '畫面',
    '互動',
    '尺度',
    '均豪',
    '關係',
    '裝置',
    '層面',
    '行為',
    '距離',
    '阿伯',
    '娃娃'
];

const randomlyChooseName = () => (
    adjs[Math.floor(Math.random() * adjs.length)] +
        ns[Math.floor(Math.random() * ns.length)]
);

export default randomlyChooseName;
