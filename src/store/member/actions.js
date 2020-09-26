import axios from '@/libs/axios';


// 查询借记卡是否有效
export const memberCheckCard = (store, data) => axios('member/open/checkCard.json', data);

// 检查用户信息是否需要补充
export const memberCheckUser = (store, data) => axios('member/open/checkUser.json', data);

// 创建用户信息
export const memberCreateMember = (store, data) => axios('member/open/createMember.json', data);

// 身份证ocr校验
export const memberIdCardOcr = (store, data) => axios('member/open/idCardOcr.json', data);

// 身份证上传结果查询
export const memberIdcardRest = (store, data) => axios('member/open/idcardRest.json', data);

// 民生银行开户
export const memberOpenMSBank = (store, data) => axios('member/open/openMSBank.json', data);

// 上传用户身份证照片
export const memberUploadIdCard = (store, data) => axios('member/open/uploadIdCard.json', data, 'post',{
    'Content-Type': "multipart/form-data"
});