// 请求地址：http://wthrcdn.etouch.cn/weather_mini
// 请求方法：get
// 请求参数：city（城市名）
// 响应内容：天气信息

// 1.点击回车
// 2.查询数据
// 3.渲染数据

var app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherList: [],
    },
    methods: {
        searchWeather: function() {
            //保存this
            var that = this
                // 调用接口
            axios.get("http://www.tianqiapi.com/api?version=v9&appid=82136948&appsecret=q3atkYkJ&city=" + this.city).then(function(response) {
                // console.log(response);
                that.weatherList = response.data.data.slice(0, 5);
                //slice 返回数组的指定部分，从第0个开始往后五个
            }).catch(function(err) {})
        },
        changeWeather: function(city) {
            this.city = city
            this.searchWeather()
        }
    }
})