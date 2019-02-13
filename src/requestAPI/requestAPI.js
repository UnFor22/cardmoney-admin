/**
 * @authors  yys (yangyongsheng@sudaizhijia.com)
 * @date     2018/05/24
 * @describe API接口封装类
 */

import axios from 'axios'
import Qs from 'qs'
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.timeout = 100000;

// const baseURL = 'https://main.kamicredit.com';
const baseURL = 'https://main.kamicard.com';
// const baseURL = 'https://main.pcuion.com';
//const baseURL = 'http://test-main.kamicredit.com:8081';
/* let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };*/ //添加请求头


//axios.defaults.headers.post['X-FRAME-OPTIONS'] = 'SAMEORIGIN';

// axios请求拦截器
axios.interceptors.request.use(config => {
   /* console.log(config);*/
  // config.headers({'Content-Type':'application/x-www-form-urlencoded'});
  // config.headers({"Access-Control-Allow-Origin": "*"});
  // config.withCredentials = true;
  // 在这里设置请求头与携带token信息
    /*config.headers({'Content-Type':'multipart/form-data'});*/
  return config
});

//axios响应拦截器
axios.interceptors.response.use(response => {

  // 在这里你可以判断后台返回数据携带的请求码
  if (response) {
    return response;
  }else {
    // 非200请求报错
    throw Error(response.data.msg || '服务异常')
  }
});
// export default axios;


/**
 * 发送网络请求
 * @param params  请求参数
 */

//可以办卡赚钱的银行列表
export const getNewHotBankList = params => {
  return axios.post(`${baseURL}/api.php/CreditPage/GetHotBankInfoList_new`,  {params: {}}).then(res => res.data);
};

//获取token
export const getToken = params => {
  return axios.post(`${baseURL}/api.php/base/accessAuth`, Qs.stringify(params)).then(res => res.data);
};

//密码登录
export const postUserLogin = params => {
  return axios.post(`${baseURL}/api.php/user/logins`, Qs.stringify(params)).then(res => res.data);
};

//发送验证码
export const postRegisterCode = params => {
  return axios.post(`${baseURL}/api.php/user/app_sms`, Qs.stringify({mobile:params.mobile,accessToken:params.accessToken,mid:params.mid,usid:params.usid,type:params.type})).then(res => res.data);
};

//落地页发送验证码
export const postCode = params => {
  return axios.post(`${baseURL}/api.php/user/app_sms`, Qs.stringify(params)).then(res => res.data);
};

//注册页校验验证码
export const checkRegisterCode = params => {
  return axios.post(`${baseURL}/api.php/user/checkcode`, Qs.stringify(params)).then(res => res.data);
};

//注册完成
export const postRegister = params => {
  return axios.post(`${baseURL}/api.php/user/register`, Qs.stringify(params)).then(res => res.data);
};

//找回密码-发送验证码
export const postFindPasswordCode = params => {
  return axios.post(`${baseURL}/api.php/user/resetpwdsms`, Qs.stringify({mobile:params.mobile,accessToken:params.accessToken,mid:params.mid,usid:params.usid})).then(res => res.data);
};

//找回密码
export const postFindPassword = params => {
  return axios.post(`${baseURL}/api.php/user/resetpwd`, Qs.stringify(params)).then(res => res.data);
};

//个人资料
export const getPersonalData = params => {
  return axios.post(`${baseURL}/api.php/user/getUserInfo`, Qs.stringify(params)).then(res => res.data);
};

//修改个人昵称
export const getPersonName = params => {
  return axios.post(`${baseURL}/api.php/user/upUser`, Qs.stringify(params)).then(res => res.data);
};

//获取信用卡
export const getCreditCard = params => {
  return axios.post(`${baseURL}/api.php/creditCardInfo/getcreditlist`, Qs.stringify(params)).then(res => res.data);
};

//获取储蓄卡
export const getDepositCard = params => {
  return axios.post(`${baseURL}/api.php/user/GetBankCardList`, Qs.stringify(params)).then(res => res.data);
};

//添加信用卡
export const getAddtCreditCard = params => {
  return axios.post(`${baseURL}/api.php/creditCardInfo/savecreditinfos`, Qs.stringify(params)).then(res => res.data);
};

//删除信用卡
export const postDeltCreditCard = params => {
  return axios.post(`${baseURL}/api.php/creditCardInfo/delCredit`, Qs.stringify(params)).then(res => res.data);
};

//添加储蓄卡
export const getAddtDepositCard = params => {
  return axios.post(`${baseURL}/api.php/userAuth/setSavingCard`, Qs.stringify(params)).then(res => res.data);
};

//删除储蓄卡
export const postDelDepositCard = params => {
  return axios.post(`${baseURL}/api.php/savingCardInfo/delCardInfo `, Qs.stringify(params)).then(res => res.data);
};

//获取通道列表
export const getGalleryList= params => {
  return axios.post(`${baseURL}/api.php/order/getPayList`, Qs.stringify(params)).then(res => res.data);
};

//身份未认证-添加储蓄卡(四要素认证)
export const getIdentity= params => {
  return axios.post(`${baseURL}/api.php/userAuth/debitCard_web`, Qs.stringify(params)).then(res => res.data);
};

//收款记录
export const getGatheringRecord= params => {
  return axios.post(`${baseURL}/api.php/trade/getTakeBackList`, Qs.stringify(params)).then(res => res.data);
};

//提交身份证照片
export const postCardPic = params=> {
  return axios.post(`${baseURL}/api.php/file/upload`, Qs.stringify(params),{headers:{'Content-Type':'multipart/form-data'}}).then(res => res.data);
};

//获取储蓄卡银行名
export const getDepositCardBank = params => {
  return axios.post(`${baseURL}/api.php/creditsBins/getcreditbankname`, Qs.stringify(params)).then(res => res.data);
};

//获取省份信息
export const getProvince = params => {
  return axios.post(`${baseURL}/api.php/ysBank/getProvice`, Qs.stringify(params)).then(res => res.data);
};
//获取城市信息
export const getCity = params => {
  return axios.post(`${baseURL}/api.php/ysBank/getCity`, Qs.stringify(params)).then(res => res.data);
};
//获取分行信息
export const getBank = params => {
  return axios.post(`${baseURL}/api.php/ysBank/getZBank`, Qs.stringify(params)).then(res => res.data);
};

/*
//移动端Face++身份验证服务
export const postLiteWeb= params => {
  return axios.post(`https://api.megvii.com/faceid/lite/get_token`, Qs.stringify(params)).then(res => res.data);
};
*/

//Face++身份验证--第一个接口
export const postToGetFaceToken = params => {
  return axios.post(`${baseURL}/api.php/user/getToken`,
                    Qs.stringify({
                          accessToken:params.accessToken,
                          mid:params.mid,
                          usid:params.usid,
                          fname:params.fname
                      })
                   ).then(res => res.data);
};

//置信度提交接口
export const postConfidenceCoefficient = params => {
  return axios.post(`${baseURL}/api.php/userAuth/faceCommit`, Qs.stringify(params)).then(res => res.data);
};




