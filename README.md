forked from onthedesk/3DLottery  
# 3DLotteryBB
简易的年会抽奖程序  
开发了必中模式来方便调试   

必中模式  
用法： 维护 js/config.js 中 staff_abslute 数组，填入你希望中奖的员工或员工们，然后将 abslute 变量值改为1。 从第一次抽奖开始，数组中的员工都会先于其他人先后中奖，直到他们都中完奖后才会继续抽取普通员工。  
注：开启必中模式后会在Conf.title变量后添加字符串“调试模式“来提醒开发者现在处于调试模式下  
![debugmode](/images/debugmode.png)    


### 如何使用: 
1. 打包下载
2. 设置图片,并配置js/config.js
3. 在浏览器中打开index.html，进入演示模式即可


### 功能说明：
1. 空格和回车键均可以开始或暂停抽奖
2. 一次抽出一个人，直至全部抽中
3. 没有实现伪随机，采用的"击鼓传花"的原理

### 致谢
1. 使用了混淆后的DB_rotateRollingBanner,作者不详,向作者致谢




