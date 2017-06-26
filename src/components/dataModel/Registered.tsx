import * as React from "react";
import * as Server from "../Server";
import { Search } from "../public/Search";
import * as Locations from "../data/Location.json";
interface Props { onHandleInputChange?: any; User?: any }
//                                                                                                
interface Model {
    // [key: string]: any; $Valid?: Boolean; $ErrorMsg?: string;
    Category?: any;     //类别     
    Code?: any;         //邮编  
    Location?: any;     //所在地
    Address?: any;      //地址
}
interface State { check: Model; Model: Model, Location: any }

// 户口
export class Registered extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Category: "",
                // Code: "",
                Location: "",
                Address: "",
                // $Valid: true,//验证通过状态
                // $ErrorMsg: ''
            },
            Location: Locations
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
        this.props.onHandleInputChange("Registered", this.state.Model);
    }
    componentDidMount() {
        this.setState((prevState: State) => {
            prevState.Model.Category = this.props.User.yx_hukou_type_descr;
            // prevState.Model.Code = this.props.User.yx_hukou_zipcode;
            prevState.Model.Location = this.props.User.yx_contrib_area_descr;
            prevState.Model.Address = this.props.User.yx_hukou_address;

        }, () => {
            this.onUpdateChange();
        });
    }
    handleChange(event: React.ChangeEvent<any>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.onUpdateChange(name, value);
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
            default:
                break;
        }
        Model.$Valid ? Model.$ErrorMsg = "" : Model.$target = name;
        return Model;
    }
    render() {
        return <div className="container text-left">
            <div className="page-header">
                <h1 className="tit-l-bor ft18 mt10"><span className="ml10">户口信息</span></h1>
            </div>
            <div className="form-horizontal">
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">户口类别</label>
                    <div className="col-sm-8">
                        {/*<input type="text" className="form-control" name="Category" value={this.state.Model.Category} onChange={this.handleChange} />*/}
                        <select className="form-control" name="Category" defaultValue={this.props.User.yx_hukou_type_descr} onChange={this.handleChange} >
                            <option value="本市农村" >本市农村</option>
                            <option value="本市城镇" >本市城镇</option>
                            <option value="港澳台" >港澳台</option>
                            <option value="外埠农村" >外埠农村</option>
                            <option value="外埠城镇" >外埠城镇</option>
                            <option value="外籍" >外籍</option>
                        </select>
                        <i className="icon-angle-down pull-right"></i>
                        <span className="required-symbol">*</span>
                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">户口所在地</label>
                    <div className="col-sm-8">
                        {/*<input type="text" className="form-control" name="Location" value={this.state.Model.Location} onChange={this.handleChange} />*/}
                        <Search selectValue={this.props.User.yx_contrib_area_descr} onHandleInputChange={(value: any) => {
                            this.onUpdateChange("Location", value);
                        }} dataList={this.state.Location} ></Search>
                        <i className="icon-angle-down pull-right"></i>
                        <span className="required-symbol">*</span>
                    </div>
                </div>
                {/*<div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">邮政编码</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Code" value={this.state.Model.Code} onChange={this.handleChange} />
                    </div>
                </div>*/}
                <div className="form-group col-xs-12" style={{ paddingRight: "45px" }}>
                    <label className="col-sm-2 control-label c39 ft14">户口地址</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="Address" defaultValue={this.props.User.yx_hukou_address} onChange={this.handleChange} />
                        <span className="required-symbol">*</span>
                        <span className="ce85 ft14 white_space">录入的户口地址必须和您的户口本上的地址保存一致</span>
                    </div>
                </div>
            </div>
        </div>;
    }
}