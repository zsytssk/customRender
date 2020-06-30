loadLib('./js/bundle.js?v=' + CDN_VERSION);
var platform = {
    hideLoading: function () {},
    login: function () {},
    logout: function () {},
    getInfo: function () {
        return {
            isLogin: false,
            token: '',
            socket_url: 'ws://47.101.172.184:8101',
        };
    },
};
