import * as React from "react";

interface Props { onHandleInputChange?: any; User?: any }
interface Model {
    [key: string]: any; $Valid?: Boolean; $ErrorMsg?: string;
    Driving?: any;      //有无驾照
    Vehicle?: any;      //有无用车
}
interface State { check: Model; Model: Model }

// 驾照
export class Driving extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Driving: "false",
                Vehicle: "false",
                $Valid: true,//验证通过状态
                $ErrorMsg: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        this.setState((prevState: State) => {
            prevState.Model.Driving = this.props.User.driving;
            prevState.Model.Vehicle = this.props.User.vehicle;
        }, () => {
            this.props.onHandleInputChange("Driving", this.state.Model);
        });
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            prevState.Model[name] = value;
        });
        this.props.onHandleInputChange("Driving", this.state.Model);
        this.check(name, value);
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
                <h1 className="tit-l-bor ft18 mt10">
                    <span className="ml10">驾照信息</span>
                </h1>
            </div>
            <div className="form-horizontal">
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">有无驾照</label>
                    <div className="col-sm-8">
                        <label className="radio-inline ft14">
                            <input type="radio" name="Driving" value="true" checked={this.state.Model.Driving == "true"} onChange={this.handleChange} />
                            有
                            </label>
                        <label className="radio-inline ft14">
                            <input type="radio" name="Driving" value="false" checked={this.state.Model.Driving == "false"} onChange={this.handleChange} />
                            无
                            </label>
                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label c39 ft14">有无用车</label>
                    <div className="col-sm-8">
                        <label className="radio-inline ft14">
                            <input type="radio" name="Vehicle" value="true" checked={this.state.Model.Vehicle == "true"} onChange={this.handleChange} />
                            有
                            </label>
                        <label className="radio-inline ft14">
                            <input type="radio" name="Vehicle" value="false" checked={this.state.Model.Vehicle == "false"} onChange={this.handleChange} />
                            无
                            </label>
                    </div>
                </div>
            </div>
        </div>
            ;
    }
}