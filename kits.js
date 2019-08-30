/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function () {
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000, 999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}

// 获取一个随机的16进制的颜色
kits.randomHexColor = function () {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  // 随机索引(0,15);
  let randomIndex = this.randomInt(0, 15);
  let hex = '';
  for (let i = 0; i < 6; i++) {
    hex += arr[randomIndex];
    randomIndex = this.randomInt(0, 15);
  }
  let hexColor = '#' + hex
  return hexColor;
}


// 获取一个随机的rgb格式的颜色
kits.randomRGBColor = function () {
  // 颜色是在0到255之间的随机整数；
  let r = this.randomInt(0, 255);
  let g = this.randomInt(0, 255);
  let b = this.randomInt(0, 255);
  let rgbColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  return rgbColor;
}

/**
 * @description    从localStorage里面根据指定的键获取一个数组
 * @param {string} key 存储在localStorage里面数据对应的键
 * @returns {Array}     将JSON字符串反序列化后的数组
*/
kits.getLocalDataArray = function (key) {
  let json = localStorage.getItem(key);
  let arr = JSON.parse(json);
  return arr = arr || [];
}

/**
 * @description  将一个数组(arr)以指定的键(key)存储到localStorage里面
 * @param  {string}  key   参数    localStorage里面根据key存储的数据
 * @param   {Array}  arr   参数  要存入localStorage的key里面的数据
*/
kits.saveLocalDataArray = function (key, arr) {
  let json = JSON.stringify(arr);
  localStorage.setItem(key, json);
}



/** 
 * @description  根据id修改localStorage里面的指定键(key)的数组数据
 * @param {number} id     根据你传入的id，找到localStorage里面的key对应的数据
 * @param {Object} data   把通过id找到的数据，修改为你传入的data
 * 
*/
kits.modifyLocalDataById = function (key, id, data) {
  let arr = kits.getLocalDataArray(key);
  arr.forEach((e, i) => {
    if (e.id == id) {
      // console.log(e);
      arr[i] = data;
    }
  })
  // 存储修改后的数据
  kits.saveLocalDataArray(key, arr);
}




/**
 * @description   根据对应的id从localStorage中指定键(key)的数组中删除一条数据
 * @param  {string}  key   参数    localStorage里面根据key存储的数据
 * @param  {number}  id    参数    根据你传入的id，找到localStorage里面的key对应的数据
 */

kits.deleteLocalDataById = function (key, id) {
  let arr = kits.getLocalDataArray(key);
  arr.forEach((e, i) => {
    if (e.id == id) {
      // console.log(e);
      arr.splice(i, 1);
    }
    kits.saveLocalDataArray(key, arr);
  })
}



/**
 * @description  向localStorage里面指定键(key)的数组数据追加一个数据对象（data）
 * @param {string} key   localStorage里面根据根据key存储的数据
 * @param {Object} data  你要追加到localstorage的数据对象
 */

kits.appendDataIntoArray = function (key, data) {
  let arr = kits.getLocalDataArray(key);
  arr.push(data);
  kits.saveLocalDataArray(key, arr);
}



