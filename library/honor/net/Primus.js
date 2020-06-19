const IO_DATA = {
    _commKey : null,		//res加密公钥所用到的key
    token : null,			//玩家token，在连接初始化时用于res生成公钥
    jwtToken : null,		//res加密之后的玩家token，数据交互以此token为主
    publicKey : null,		//res公钥
    URL : null,	//连接url
    encryptedString : null,	//res加密后的验证字符串
};

const cmd = {
    CONN_INIT : "conn::init",			//连接初始化，用来更新jwt token
    CONN_ERROR : "conn::error",			//服务端异常

    TEST_PING : "test::ping",			//测试用命令
    TEST_PONG : "test::pong",			//测试用命令

    APIACTIVITY : "api::activity"		//不中险
};

class IOPrimus {
    constructor(config, callback) {
        this.primus = null;
        this.callback = callback;
        this.isOpened = false;//连接是否已经初始化过

        this.init(config);
    }

    init (config){
        Object.assign(IO_DATA, config);

        this.generateCommKey();
        this.generateEncryptedString();

        try{
            this.connect();
        }catch(e){
            console.error(e);
        }
    }
    //生成commkey
    generateCommKey (){
        try{
            //默认32位编码
            IO_DATA._commKey = Date.now().toString() + Date.now().toString() + Date.now().toString().substring(0,6);
        }catch(e){
            Sail.DEBUG && console.log("初始化commKey失败",e);
        }
    }
    //生成encryptedString
    generateEncryptedString (){
        try{
            var params = "jwt=" + IO_DATA.token + "&commKey=" + IO_DATA._commKey;
            var jsencrypt = new JSEncrypt();
            jsencrypt.setPublicKey(IO_DATA.publicKey);
            IO_DATA.encryptedString = jsencrypt.encrypt(params);
        }catch(e){
            Sail.DEBUG && console.log("初始化encryptedString失败", e);
        }
    }
    onOpen (){
        //防止reconnect之后重复触发open，以下事件只绑定一次
        if(this.isOpened){ return; }
        this.isOpened = true;
        //触发open
        this.callback("io.open");

        this.primus.on('data', this.onData.bind(this));
        this.primus.on('error', function (data) { this.callback("io.error", data); }.bind(this));
        this.primus.on('reconnect', function () { this.callback("io.reconnect"); }.bind(this));
        this.primus.on('end', function () { this.callback("io.close"); }.bind(this));
    }
    onData (data){
        //解密
        var decryptstr = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(IO_DATA._commKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        var dataString = decryptstr.toString(CryptoJS.enc.Utf8);
        var parsedData = JSON.parse(dataString);

        //更新jwt token
        if(parsedData.cmd == cmd.CONN_INIT){
            IO_DATA.jwtToken = parsedData.res;
        }

        Sail.DEBUG && console.log("命令：" + parsedData.cmd + "\n<<<=====接收到'IO-Primus'数据, 时间:" + Date.now() + "\n" + dataString);
        this.callback(parsedData.cmd, parsedData.res || parsedData.rep, parsedData.code, parsedData.error || parsedData.msg);
    }
    connect  () {
        this.primus = Primus.connect(IO_DATA.URL, IO_DATA);

        this.primus.on('outgoing::url', function(url){
            url.query = 'login=' + IO_DATA.encryptedString;
            Sail.DEBUG && console.log("outgoing::url", url.query);
        });

        this.primus.on('open', this.onOpen.bind(this));
    }

    emit (cmd, params){
        //为data增加token
        var DATA_TEMPLATE = {
            "cmd" : cmd,
            "params" : {
                "jwt" : IO_DATA.jwtToken,
                "token" : IO_DATA.jwtToken
            },
            "status" : {
                "time" : Date.now()
            }
        };
        
        utils.extend(true, DATA_TEMPLATE, {params : params});

        var data = JSON.stringify(DATA_TEMPLATE);

        Sail.DEBUG && console.log("====>>发送命令：" + cmd + ", 时间:" + Date.now() + ", 命令类型：'IO-Primus'\n数据：" + data);

        //加密
        var encryptData = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(IO_DATA._commKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        //发送加密数据
        this.primus.write(encryptData.toString());
    }
    //手动断开连接
    end (){
        this.primus && this.primus.end();
    }
}

export default IOPrimus;