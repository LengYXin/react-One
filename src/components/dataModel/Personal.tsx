import * as React from "react";
import * as Server from "../Server";

interface Props { onHandleInputChange?: any; }
interface Model { [key: string]: any; Name?: any; Birthday?: any; Marriage?: any; Children?: any; Nation?: any; Face?: any; PlaceOfOrigin?: any; Nickname?: any; Archives?: any }
interface State { Check: Model; Model: Model }

// 个人信息
export class Personal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            Check: {
                Name: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, Birthday: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, Marriage: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, Children: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, Nation: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, Face: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, PlaceOfOrigin: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, Nickname: {
                    $Valid: true,
                    $ErrorMsg: ""
                }, Archives: {
                    $Valid: true,
                    $ErrorMsg: ""
                }
            },
            Model: {
                Name: "Name",
                Birthday: "2016-01-01",
                Marriage: "false",
                Children: "false",
                Nation: "",
                Face: "",
                PlaceOfOrigin: "",
                Nickname: "",
                Archives: "",
            }
        };
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        this.props.onHandleInputChange("Personal", this.state.Model);
        this.checkAll();
    }
    componentDidUpdate() {
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // Server.Verification.$Valid = true;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            prevState.Model[name] = value;
        }, () => {
            // this.checkAll();
        });
        this.props.onHandleInputChange("Personal", this.state.Model);
        // this.check(name, value);
        if (name == 'Birthday') {
            this.state.Check.Birthday.$Valid = Server.regularDate.test(value);
        }
    }
    check(name: string, value: string) {
        let checkVal = true;
        this.setState(prevState => {
            prevState.Check[name] = Server.filter(name, value);
        });

    }
    // 检查所有属性是否 通过，不通过跳出 给父组件传递 错误消息
    checkAll() {
        for (let key in this.state.Model) {
            if (this.state.Model.hasOwnProperty(key)) {
                if (['$Valid', '$ErrorMsg', 'Children', 'Marriage', 'Nickname'].indexOf(key) != -1) {
                } else {
                    let ele = this.state.Model[key];
                    let Model = Server.filter(key, ele);
                    if (Server.Verification.$Valid) {
                        Server.Verification.$ErrorMsg = Model.$ErrorMsg;
                        Server.Verification.$Valid = Model.$Valid;
                    } else {

                    }
                }
            };
        }
    }

    render() {
        return <div className="container">
            <div className="header">
                <h1>员工个人信息录入</h1>
            </div>
            <div className="page-header">
                <h1>个人信息</h1>
            </div>
            <div className="form-horizontal text-left">
                <div className={!this.state.Check.Name.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'} >
                    <label className="col-sm-4 control-label">姓名</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Name" value={this.state.Model.Name} onChange={this.handleChange} placeholder="输入您的姓名" />
                        <span className="required-symbol">*</span>
                    </div>
                </div>
                <div className={!this.state.Check.Birthday.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label">出生日期</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Birthday" value={this.state.Model.Birthday} onChange={this.handleChange} placeholder="如：1998-01-01" />
                        <span className="required-symbol">*</span>

                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">婚姻状况</label>
                    <div className="col-sm-8">
                        <label className="radio-inline">
                            <input type="radio" name="Marriage" value="true" checked={this.state.Model.Marriage == "true"} onChange={this.handleChange} />
                            已婚
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="Marriage" value="false" checked={this.state.Model.Marriage == "false"} onChange={this.handleChange} />
                            未婚
                            </label>
                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">有无子女</label>
                    <div className="col-sm-8">
                        <label className="radio-inline">
                            <input type="radio" name="Children" value="true" checked={this.state.Model.Children == "true"} onChange={this.handleChange} />
                            有
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="Children" value="false" checked={this.state.Model.Children == "false"} onChange={this.handleChange} />
                            无
                            </label>
                    </div>
                </div>
                <div className={!this.state.Check.Nation.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label">民族</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Nation" onChange={this.handleChange} />
                        <span className="required-symbol">*</span>

                    </div>
                </div>
                <div className={!this.state.Check.Face.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label">政治面貌</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Face" onChange={this.handleChange} />
                        <span className="required-symbol">*</span>

                    </div>
                </div>
                <div className={!this.state.Check.PlaceOfOrigin.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label">籍贯</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="PlaceOfOrigin" onChange={this.handleChange} />
                        <span className="required-symbol">*</span>

                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">职称</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Nickname" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group col-xs-12" style={{ paddingRight: " 45px" }}>
                    <label className="col-sm-2 control-label">档案所在地</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="Archives" onChange={this.handleChange} />
                        <span className="required-symbol">*</span>
                        <span className="help-block">档案所在地写档案存放机构全称或者相对应的详细地址；不清楚档案在哪的或者在自己手里一律写个人保管</span>
                    </div>
                </div>
            </div>
        </div>;
    }
}