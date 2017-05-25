import * as React from "react";
import * as Server from "../Server";

interface Props { onHandleInputChange?: any; }
interface Model { [key: string]: any; $Valid?: Boolean; $ErrorMsg?: string; HomePhone?: any; Phone?: any; Code?: any; Mailbox?: any; PresentAddress?: any; ContactsName?: any; ContactsPhone?: any; }
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
                $Valid: true,//验证通过状态
                $ErrorMsg: '联系方式未填词完成！'
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.onHandleInputChange("Contact", this.state.Model);
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            prevState.Model[name] = value;
        });
        this.props.onHandleInputChange("Contact", this.state.Model);
        if (name == 'Phone') {
            this.state.Check[name] = Server.regularPhone.test(value);
        }
        if (name == 'Mailbox') {
            this.state.Check[name] = Server.regularEmail.test(value);
        }
    }

    render() {
        return <div>
            <div className="container  text-left">
                <div className="page-header">
                    <h1>联系方式</h1>
                </div>
                <div className="form-horizontal">
                    <div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label">家庭电话</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="HomePhone" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className={!this.state.Check.Phone ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                        <label className="col-sm-4 control-label">手机</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="Phone" onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label">邮政编码</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="Code" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className={!this.state.Check.Mailbox ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                        <label className="col-sm-4 control-label">电子邮箱</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="Mailbox" onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                    <div className="form-group col-xs-12" style={{ paddingRight: " 45px" }}>
                        <label className="col-sm-2 control-label">现居住地</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="PresentAddress" onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                            <span className="help-block">填写详细地址到门牌号</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container text-left">
                <div className="page-header">
                    <h1>紧急联系人</h1>
                </div>
                <div className="form-horizontal">
                    <div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label">联系人姓名</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="ContactsName" onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label className="col-sm-4 control-label">电话</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="ContactsPhone" onChange={this.handleChange} />
                            <span className="required-symbol">*</span>
                        </div>
                    </div>
                </div>
            </div></div>
            ;
    }
}