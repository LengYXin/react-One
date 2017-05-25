import * as React from "react";

interface Props { onHandleInputChange?: any; }
//                                                                            类别             邮编        所在地           地址
interface Model { [key: string]: any; $Valid?: Boolean; $ErrorMsg?: string; Category?: any; Code?: any; Location?: any; Address?: any; }
interface State { check: Model; Model: Model }

// 户口
export class Registered extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Category: "",
                Code: "",
                Location: "",
                Address: "",
                $Valid: true,//验证通过状态
                $ErrorMsg: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        this.props.onHandleInputChange("Registered", this.state.Model);
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            prevState.Model[name] = value;
        });
        this.props.onHandleInputChange("Registered", this.state.Model);
        // this.check(name, value);
    }
    check(name: any, value: any) {
        this.setState(prevState => {
            // console.log(prevState);
            prevState.check[name] = true;
        });
    }
    render() {
        return <div className="container text-left">
            <div className="page-header">
                <h1>户口信息</h1>
            </div>
            <div className="form-horizontal">
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">户口类别</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Category" onChange={this.handleChange} />
                        <span className="required-symbol">*</span>
                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">户口所在地</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Location" onChange={this.handleChange} />
                        <span className="required-symbol">*</span>
                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">邮政编码</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Code" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group col-xs-12" style={{ paddingRight: "45px" }}>
                    <label className="col-sm-2 control-label">户口地址</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="Address" onChange={this.handleChange} />
                        <span className="required-symbol">*</span>
                        <span className="help-block">录入的户口地址必须和您的户口本上的地址保存一致</span>
                    </div>
                </div>
            </div>
        </div>;
    }
}