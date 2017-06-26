import * as React from "react";
import * as Server from "../Server";

interface Props { onHandleInputChange?: any; User?: any }
interface Model {
    [key: string]: any;
    Id?: number;
    StartDate?: string;     //开始日期
    EndDate?: string;       //结束日期
    UnitName?: string;      //单位名称
    Post?: string;          //职务
}
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
        this.setState((prevState: State) => {
            let item = [{ Id: 0, StartDate: "", EndDate: "", UnitName: "", Post: "", }];
            try {
                let list = JSON.parse(this.props.User.works);
                if (list.length) {
                    item = list;
                }
            } catch (error) {
                console.error(error);
            }
            prevState.Model.Item = item;
        }, () => {
            this.props.onHandleInputChange("Work", this.state.Model);
        });
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
                <h1 className="tit-l-bor ft18 mt10">
                    <span className="ml10">工作经历</span>
                </h1>
            </div>
            <div className="form-horizontal">
                <table className="table table-hover table_bg-C">
                    <thead className="c39 ft14">
                        <tr>
                            <th>开始日期：</th>
                            <th>结束日期：</th>
                            <th>单位名称：</th>
                            <th>职务：</th>
                            <th className="center"><a onClick={this.onAdd} type="button" className="btn btn-add">添加</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Model.Item.map((x, i) =>
                            <tr key={x.Id.toString()}>
                                <td className="pos_r"> <input type="text" className="form-control" name="StartDate" value={x.StartDate} onChange={e => { this.handleChange(e, i) }} /><span className="icon-rili pos_a"></span></td>
                                <td className="pos_r"> <input type="text" className="form-control" name="EndDate"  value={x.EndDate} onChange={e => { this.handleChange(e, i) }} /><span className="icon-rili pos_a"></span></td>
                                <td> <input type="text" className="form-control" name="UnitName"  value={x.UnitName} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Post"  value={x.Post} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td className="text-right"><a type="button" className="btn btn-link" onClick={() => { this.onDelete(i) }}><span className="icon-delete3"></span> 删除</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
            ;
    }
}