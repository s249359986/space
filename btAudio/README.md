#btAudio

### 方法
1. play      instance.data("api").play(seconds);t 事件（秒）
2. pause      instance.data("api").pause();
3. setSrc     instance.data("api").setSrc(src);src 音乐源
4. setUnmuted     instance.data("api").setUnmuted();关闭静音
5. setMuted      instance.data("api").setMuted();设置静音

### 事件
1. onended 音乐播放完后触发。（暂定时不触发）
2. onplay 音乐开始播放触发。
3. onpause 音乐开始播放触发。
4. oncanplay 可以播放音频
5. ontimeupdate 播放进度(当前时间/总时间，this)

