import * as React from "react";

interface Props { onHandleInputChange?: any; }
interface Model { [key: string]: any; Id?: number; Name?: string; Relation?: string; Company?: string; Post?: string; Phone?: string }
interface State { check: Model; Model: { Item: Model[]; $Valid?: Boolean; $ErrorMsg?: string; } }

// 家人
export class Family extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Item: [{ Id: 0, Name: "", Relation: "", Company: "", Post: "", Phone: "" }],
                $Valid: true,//验证通过状态
                $ErrorMsg: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }
    componentDidMount() {
        this.props.onHandleInputChange("Family", this.state.Model);
    }
    Id = 0;
    onAdd() {
        this.Id++;
        this.setState(prevState => {
            prevState.Model.Item.push({ Id: this.Id, Name: "", Relation: "", Company: "", Post: "", Phone: "" });
        });
    }
    onDelete(index: number) {
        this.setState(prevState => {
            prevState.Model.Item.splice(index, 1);
        });
        this.props.onHandleInputChange("Family", this.state.Model);
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            prevState.Model.Item[index][name] = value;

        });
        this.props.onHandleInputChange("Family", this.state.Model);
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
                <h1>填写家庭成员 <button onClick={this.onAdd} type="button" className="btn btn-success">添加</button></h1>
            </div>
            <div className="form-horizontal">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>姓名：</th>
                            <th>关系：</th>
                            <th>工作单位：</th>
                            <th>职务：</th>
                            <th>联系方式：</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.Model.Item.map((x, i) =>
                            <tr key={x.Id.toString()}>
                                <td> <input type="text" className="form-control" name="Name" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Relation" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Company" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Post" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Phone" onChange={e => { this.handleChange(e, i) }} /></td>
                                <td className="text-right"> <button type="button" className="btn " onClick={() => { this.onDelete(i) }}>删除</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
            ;
    }
}