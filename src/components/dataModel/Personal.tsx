import * as React from "react";
import * as Server from "../Server";
import { Search } from "../public/Search";
import * as Nation from "../data/Nation.json";

interface Props { onHandleInputChange?: any; User?: any }
interface Model {
    // [key: string]: any;
    Name?: any;         //姓名
    Birthday?: any;     //出生日期
    Marriage?: any;     //婚姻状况
    Children?: any;     //有无子女
    Nation?: any;       //名族
    Face?: any;         //政治面貌
    PlaceOfOrigin?: any;//籍贯
    // Nickname?: any;     //职称
    Archives?: any      //档案所在地
}
interface State { Check: Model; Model: Model, Nation: any }

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
                }, Archives: {
                    $Valid: true,
                    $ErrorMsg: ""
                }
            },
            Model: {
                Name: "Name",
                Birthday: "",
                Marriage: "false",
                Children: "false",
                Nation: "",
                Face: "",
                PlaceOfOrigin: "",
                // Nickname: "",
                Archives: "",
            },
            Nation: Nation
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
        this.props.onHandleInputChange("Personal", this.state.Model);
    }
    componentDidMount() {
        // 获取完 服务器 数据 更新状态并且返回给 顶层状态
        this.setState((prevState: State) => {
            prevState.Model.Name = this.props.User.name_display;
            prevState.Model.Birthday = this.props.User.birth_dt;
            prevState.Model.Marriage = this.props.User.yx_mar_status;
            prevState.Model.Children = this.props.User.haschildren;
            prevState.Model.Nation = this.props.User.yx_ehtnic_descr;
            prevState.Model.Face = this.props.User.yx_political_sta_descr;
            prevState.Model.PlaceOfOrigin = this.props.User.native_place_chn;
            // prevState.Model.Nickname = this.props.User.jobtitle;
            prevState.Model.Archives = this.props.User.infofile;
        }, () => {
            this.onUpdateChange();
        });
        // console.log(this.props.User);
        // this.checkAll();
    }
    componentDidUpdate() {
    }
    
    handleChange(event: React.ChangeEvent<any>) {
        // Server.Verification.$Valid = true;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.onUpdateChange(name, value);
        // this.check(name, value);
        if (name == 'Birthday') {
            this.state.Check.Birthday.$Valid = Server.regularDate.test(value);
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
            // 个人信息
            case 'Name':
                Model.$Valid = value.length > 0;
                Model.$ErrorMsg = "姓名不可为空！";
                break;
            case 'Birthday':
                Model.$Valid = Server.regularDate.test(value);
                Model.$ErrorMsg = "出生日期格式有误！";
                break;
            // case 'Nation':
            //     Model.$Valid = value.length > 0;
            //     Model.$ErrorMsg = "名族不可为空！";
            //     break;
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
            default:
                break;
        }
        Model.$Valid ? Model.$ErrorMsg = "" : Model.$target = name;
        return Model;
    }
    render() {
        return <div className="container">
            <div className="header entry_ft">
                <h4>员工个人信息录入</h4>
            </div>
            <div className="page-header mt0">
                <h1 className="tit-l-bor ft18 mt10"><span className="ml10">个人信息</span></h1>
            </div>
            <div className="form-horizontal text-left">
                <div className={!this.state.Check.Name.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'} >
                    <label className="col-sm-4 control-label c39 ft14">姓名</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Name" defaultValue={this.props.User.name_display} onChange={this.handleChange} placeholder="输入您的姓名" />
                        <span className="required-symbol">*</span>
                    </div>
                </div>
                <div className={!this.state.Check.Birthday.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label c39 ft14">出生日期</label>
                    <div className="col-sm-8 pos_r">
                        <input type="text" className="form-control" name="Birthday" defaultValue={this.props.User.birth_dt} onChange={this.handleChange} placeholder="如：1998-01-01" />
                        {/*<span className="icon-rili pos_a"></span>*/}
                        <span className="required-symbol">*</span>

                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">婚姻状况</label>
                    <div className="col-sm-8">
                        <label className="radio-inline ft14">
                            <input type="radio" name="Marriage" value="true" defaultChecked={this.props.User.yx_mar_status == "true"} onChange={this.handleChange} />
                            已婚
                            </label>
                        <label className="radio-inline ft14">
                            <input type="radio" name="Marriage" value="false" defaultChecked={this.props.User.yx_mar_status == "false"} onChange={this.handleChange} />
                            未婚
                            </label>
                        <label className="radio-inline ft14">
                            <input type="radio" name="Marriage" value="leave" defaultChecked={this.props.User.yx_mar_status == "leave"} onChange={this.handleChange} />
                            离婚
                            </label>
                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">有无子女</label>
                    <div className="col-sm-8">
                        <label className="radio-inline ft14">
                            <input type="radio" name="Children" value="true" defaultChecked={this.props.User.haschildren == "true"} onChange={this.handleChange} />
                            有
                            </label>
                        <label className="radio-inline ft14">
                            <input type="radio" name="Children" value="false" defaultChecked={this.props.User.haschildren == "false"} onChange={this.handleChange} />
                            无
                            </label>
                    </div>
                </div>
                <div className={!this.state.Check.Nation.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label c39 ft14">民族</label>
                    <div className="col-sm-8">
                        {/*<input type="text" className="form-control" name="Nation" value={this.state.Model.Nation} onChange={this.handleChange} />
                        <span className="required-symbol">*</span>*/}

                        <Search selectValue={this.props.User.yx_ehtnic_descr} onHandleInputChange={(value: any) => {
                            this.onUpdateChange("Nation", value);
                        }} dataList={this.state.Nation} ></Search>
                        <i className="icon-angle-down pull-right"></i>
                        <span className="required-symbol">*</span>

                    </div>
                </div>
                <div className={!this.state.Check.Face.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label c39 ft14">政治面貌</label>
                    <div className="col-sm-8">
                        {/*<input type="text" className="form-control" name="Face" value={this.state.Model.Face} onChange={this.handleChange} />*/}
                        <select className="form-control" name="Face" defaultValue={this.props.User.yx_political_sta_descr} onChange={this.handleChange} >
                            <option value="其他" >其他</option>
                            <option value="预备党员" >预备党员</option>
                            <option value="党员" >党员</option>
                            <option value="团员" >团员</option>
                            <option value="群众" >群众</option>
                        </select>
                        <i className="icon-angle-down pull-right"></i>

                        <span className="required-symbol">*</span>

                    </div>
                </div>
                <div className={!this.state.Check.PlaceOfOrigin.$Valid ? 'form-group col-xs-6 has-error' : 'form-group col-xs-6'}>
                    <label className="col-sm-4 control-label c39 ft14">籍贯</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="PlaceOfOrigin" defaultValue={this.props.User.native_place_chn} onChange={this.handleChange} />
                        <span className="required-symbol">*</span>

                    </div>
                </div>
                {/*<div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">职称</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Nickname" value={this.state.Model.Nickname} onChange={this.handleChange} />
                    </div>
                </div>*/}
                <div className="form-group col-xs-12" style={{ paddingRight: " 45px" }}>
                    <label className="col-sm-2 control-label c39 ft14">档案所在地</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="Archives" defaultValue={this.props.User.infofile} onChange={this.handleChange} />
                        <span className="required-symbol">*</span>
                        <span className="ce85 ft14 white_space">档案所在地写档案存放机构全称或者相对应的详细地址；不清楚档案在哪的或者在自己手里一律写个人保管</span>
                    </div>
                </div>
            </div>
        </div>;
    }
}