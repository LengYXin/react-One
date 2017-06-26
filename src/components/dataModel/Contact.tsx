import * as React from "react";
import * as Server from "../Server";

interface Props { onHandleInputChange?: any; User?: any }
interface Model {
    // [key: string]: any; $Valid?: Boolean; $ErrorMsg?: string;
    HomePhone?: any;        //家庭电话
    Phone?: any;            //手机
    Code?: any;             //邮政编码
    Mailbox?: any;          //电子邮箱
    PresentAddress?: any;   //现居住地
    ContactsName?: any;     //紧急联系人姓名
    ContactsPhone?: any;    //紧急联系人电话
}
interface State { Check: Model; Model: Model }

// 联系方式
export class Contact extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            Check: {
                Phone: true,
                Mailbox: true
            }, Model: {
                HomePhone: "",
                Phone: "",
                Code: "",
                Mailbox: "",
                PresentAddress: "",
                ContactsName: "",
                ContactsPhone: "",
                // $Valid: true,//验证通过状态
                // $ErrorMsg: '联系方式未填词完成！'
            }
        };
        this.filter = this.filter.bind(this);
        this.check = this.check.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUpdateChange = this.onUpdateChange.bind(this);
    }
    // 更新顶层状态
    onUpdateChange(name?: any, value?: any) {
        if (name) {
            this.setState((prevState: any) => {
                prevState.Model[name] = value;
            }, () => {
                // this.checkAll();
            });
        }
        this.props.onHandleInputChange("Contact", this.state.Model);
    }
    componentDidMount() {
        this.setState((prevState: State) => {
            prevState.Model.HomePhone = this.props.User.family_phone;
            prevState.Model.Phone = this.props.User.mobile;
            // prevState.Model.Code = this.props.User.yx_juzhu_zipcode;
            prevState.Model.Mailbox = this.props.User.email_address;
            prevState.Model.PresentAddress = this.props.User.yx_juzhu_address;
            prevState.Model.ContactsName = this.props.User.contact_name;
            prevState.Model.ContactsPhone = this.props.User.contact_phone;

        }, () => {
            this.onUpdateChange();
        });
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.onUpdateChange(name, value);
        if (name == 'Phone') {
            this.state.Check[name] = Server.regularPhone.test(value);
        }
        if (name == 'Mailbox') {
            this.state.Check[name] = Server.regularEmail.test(value);
        }
    }
    // 验证输入
    check(name?: string) {
        this.filterModel = { $target: "", $Valid: true, $ErrorMsg: "" };
        Server.check(this.state.Model, this.filterModel, this.filter);
        return this.filterModel;
    }
    filterModel = { $target: "", $Valid: true, $ErrorMsg: "" };
    filter(name: string, value: string) {
        let Model = {
            $Valid: true,
            $ErrorMsg: "",
            $target: ""
        };
        switch (name) {
            // 联系方式
            case 'Phone':
                Model.$Valid = Server.regularPhone.test(value);
                Model.$ErrorMsg = "联系方式-手机格式有误！";
                break;
            case 'Mailbox':
                Model.$Valid = Server.regularEmail.test(value);
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
        Model.$Valid ? Model.$ErrorMsg = "" : Model.$target = name;
        return Model;
    }
    render() {
        return <div>
            <div className="container  text-left">
                <div className="page-header">
                    <h1 className="tit-l-bor ft18 mt10"><span className="ml10">联系方式</span></h1>
                </div>
                <div className="form-horizontal">
                    <div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label c39 ft14">家庭电话</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="HomePhone" defaultValue={this.props.User.family_phone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className={!this.state.Check.Phone ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                        <label className="col-sm-4 control-label c39 ft14">手机</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="Phone" defaultValue={this.props.User.mobile} onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                    {/*<div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label c39 ft14">邮政编码</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="Code" value={this.state.Model.Code} onChange={this.handleChange} />
                        </div>
                    </div>*/}
                    <div className={!this.state.Check.Mailbox ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                        <label className="col-sm-4 control-label c39 ft14">电子邮箱</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="Mailbox" defaultValue={this.props.User.email_address} onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                    <div className="form-group col-xs-12" style={{ paddingRight: " 45px" }}>
                        <label className="col-sm-2 control-label c39 ft14">现居住地</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="PresentAddress" defaultValue={this.props.User.yx_juzhu_address} onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                            <span className="ce85 ft14 white_space">填写详细地址到门牌号</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container text-left">
                <div className="page-header">
                    <h1 className="tit-l-bor ft18"><span className="ml10">紧急联系人</span></h1>
                </div>
                <div className="form-horizontal">
                    <div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label c39 ft14">联系人姓名</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="ContactsName" defaultValue={this.props.User.contact_name} onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label c39 ft14">电话</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="ContactsPhone" defaultValue={this.props.User.contact_phone} onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                </div>
            </div></div>
            ;
    }
}