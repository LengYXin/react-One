export const regularDate = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
export const regularPhone = /^1[34578]\d{9}$/;
export const regularEmail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;


export let Verification = {
    $Valid: true,
    $ErrorMsg: '个人信息未填写完整'
};
export let filter = (name: string, value: string) => {
    let Model = {
        $Valid: true,
        $ErrorMsg: ""
    };
    switch (name) {
        // 个人信息
        case 'Name':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "姓名不可为空！";
            break;
        case 'Birthday':
            Model.$Valid = regularDate.test(value);
            Model.$ErrorMsg = "出生日期格式有误！";
            break;
        case 'Nation':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "名族不可为空！";
            break;
        case 'Face':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "政治面貌不可为空！";
            break;
        case 'PlaceOfOrigin':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "籍贯不可为空！";
            break;
        case 'Archives':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "档案所在地不可为空！";
            break;
        // 户口信息
        case 'Category':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "户口类别不可为空！";
            break;
        case 'Location':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "户口所在地不可为空！";
            break;
        case 'Address':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "户口地址不可为空！";
            break;
        // 联系方式
        case 'Phone':
            Model.$Valid = regularPhone.test(value);
            Model.$ErrorMsg = "联系方式-手机格式有误！";
            break;
        case 'Mailbox':
            Model.$Valid = regularEmail.test(value);
            Model.$ErrorMsg = "联系方式-电子邮箱格式有误！";
            break;
        case 'PresentAddress':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "联系方式-现居住地不可为空！";
            break;
        case 'ContactsName':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "紧急联系人-联系人姓名不可为空！";
            break;
        case 'ContactsPhone':
            Model.$Valid = value.length > 0;
            Model.$ErrorMsg = "紧急联系人-电话不可为空！";
            break;
        default:
            break;
    }
    return Model;
}