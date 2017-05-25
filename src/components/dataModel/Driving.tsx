import * as React from "react";

interface Props { onHandleInputChange?: any; }
interface Model { [key: string]: any; $Valid?: Boolean; $ErrorMsg?: string; Driving?: any; Vehicle?: any; }
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
        this.props.onHandleInputChange("Driving", this.state.Model);
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
                <h1>驾照信息</h1>
            </div>
            <div className="form-horizontal">
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">有无驾照</label>
                    <div className="col-sm-8">
                        <label className="radio-inline">
                            <input type="radio" name="Driving" value="true" checked={this.state.Model.Driving == "true"} onChange={this.handleChange} />
                            有
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="Driving" value="false" checked={this.state.Model.Driving == "false"} onChange={this.handleChange} />
                            无
                            </label>
                    </div>
                </div>
                <div className="form-group col-xs-6">
                    <label className="col-sm-4 control-label">有无用车</label>
                    <div className="col-sm-8">
                        <label className="radio-inline">
                            <input type="radio" name="Vehicle" value="true" checked={this.state.Model.Vehicle == "true"} onChange={this.handleChange} />
                            有
                            </label>
                        <label className="radio-inline">
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