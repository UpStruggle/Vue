/*
== 综合应用 音乐播放
	- 歌曲搜索
	- 歌曲播放
	- 歌曲封面
	- 歌曲评论
	- 播放动画
	- MV播放
*/

/*
	1. 歌曲搜索
		- 按下回车(v-on.enter)
		- 查询数据(axios接口v-model)
		- 渲染数据(v-for数组that)
	请求地址: https://autumnfish.cn/search
	prop: keywords

	2. 歌曲播放
		- 点击播放(v-on)
		- 歌曲地址获取(song's id)
		- 歌曲地址设置(v-bind)
	请求地址：https://autumnfish.cn/song/url
	prop: id
	响应内容：歌曲url地址

	3. 歌曲封面
	请求地址：https://autumnfish.cn/song/detail
	prop: ids
    响应内容：歌曲详情（包括封面信息）

	4. 歌曲评论
	请求地址：https://autumnfish.cn/comment/hot
	prop: {id}&type=0
	5. 播放动画
		- 监听音乐播放(v-on play)
		- 监听音乐暂停(v-on pause)
		- 操纵类名(v-bind 对象)
	6. MV播放
		- mv图标显示(v-if)
		- mv地址获取
		- 遮罩层
		- mv地址设置
	请求地址：https://autumnfish.cn/mv/url
	prop: id(mvid)
*/

var app = new Vue({
    el: "#wrap",
    data: {
        //查询关键字
        query: "",
        //歌曲名称
        musicList: [],
        //歌曲地址
        musicUrl: "",
        //歌曲封面
        musicCover: "",
        //歌曲评论
        hotComments: [],
        //动画播放状态
        isPlaying: false,
        //遮罩层的显示状态
        isShow: false,
        //mv地址
        mvUrl: "",
    },
    methods: {
        //歌曲搜索功能
        searchMusic: function() {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.query)
                .then(function(response) {
                    that.musicList = response.data.result.songs;
                    //console.log(response.data.result.songs);
                }, function(err) {});
        },
        //歌曲播放功能
        playMusic: function(musicId) {
            //console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function(response) {
                    //console.log(response);
                    that.musicUrl = response.data.data[0].url;
                }, function(err) {})

            //歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function(response) {
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function(err) {})

            //歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function(response) {
                    // console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments;
                }, function(err) {})
        },
        //动画效果
        play: function() {
            this.isPlaying = true;
        },
        pause: function() {
            this.isPlaying = false;
        },
        //mv播放功能
        playMV: function(mvid) {
            //console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function(response) {
                    //console.log(response);
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                }, function(err) {})
        },
        //隐藏mv
        hide: function(mvid) {
            this.isShow = false;
            this.mvUrl = '';
        }
    },
})