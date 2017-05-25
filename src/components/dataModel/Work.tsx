import * as React from "react";
import * as Server from "../Server";

interface Props { onHandleInputChange?: any; }
interface Model { [key: string]: any; Id?: number; StartDate?: string; EndDate?: string; UnitName?: string; Post?: string; }
interface State { check: Model; Model: { Item: Model[]; $Valid?: Boolean; $ErrorMsg?: string; } }

// 工作经历
export class Work extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Item: [{ Id: 0, StartDate: "", EndDate: "", UnitName: "", Post: "", }],
                $Valid: true,//验证通过状态
                $ErrorMsg: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        // this.onModelSubmit = this.onModelSubmit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    componentDidMount() {
        this.props.onHandleInputChange("Work", this.state.Model);
    }
    Id = 0;
    onAdd() {
        this.Id++;
        this.setState(prevState => {
            prevState.Model.Item.push({ Id: this.Id, StartDate: "", EndDate: "", UnitName: "", Post: "" });
        });
    }
    onDelete(index: number) {
        this.setState(prevState => {
            prevState.Model.Item.splice(index, 1);
        });
        this.props.onHandleInputChange("Work", this.state.Model);
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            prevState.Model.Item[index][name] = value;
        });
         if (['StartDate', 'EndDate'].indexOf(name) != -1) {
            if (Server.regularDate.test(value)) {
                target.classList.remove('has-error');
            } else {
                target.classList.add('has-error');
            }
        }
        this.props.onHandleInputChange("Work", this.state.Model);
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
                <h1>工作经历 <button onClick={this.onAdd} type="button" className="btn btn-success">添加</button></h1>
            </div>
            <div className="form-horizontal">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>开始日期：</th>
                            <th>结束日期：</th>
                            <th>单位名称：</th>
                            <th>职务：</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Model.Item.map((x, i) =>
                            <tr key={x.Id.toString()}>
                                <td> <input type="text" className="form-control" name="StartDate" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="EndDate" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="UnitName" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Post" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td className="text-right"><button type="button" className="btn " onClick={() => { this.onDelete(i) }}>删除</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
            ;
    }
}