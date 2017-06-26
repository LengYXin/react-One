import * as React from "react";
import * as Server from "../Server";


interface Props { onHandleInputChange?: any; User?: any }
interface Model {
    // [key: string]: any;
    Id?: number;
    Name?: string;      //姓名
    Relation?: string;  //关系
    Company?: string;   //单位
    Post?: string;      //职务
    Phone?: string      //联系方式
}
interface State { check: Model; Model: { Item: Model[]; $Valid?: Boolean; $ErrorMsg?: string; } }

// 家人
export class Family extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Item: [{ Id: 0, Name: "", Relation: "配偶", Company: "", Post: "", Phone: "" }],
                $Valid: true,//验证通过状态
                $ErrorMsg: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.filter = this.filter.bind(this);
        this.check = this.check.bind(this);
    }
    componentDidMount() {
        this.setState((prevState: State) => {
            let item = [{ Id: 0, Name: "", Relation: "配偶", Company: "", Post: "", Phone: "" }];
            try {
                let list = JSON.parse(this.props.User.family);
                if (list.length) {
                    item = list;
                }
            } catch (error) {
                console.error(error);
            }
            prevState.Model.Item = item;
        }, () => {
            this.props.onHandleInputChange("Family", this.state.Model);
        });
    }
    Id = 0;
    onAdd() {
        this.Id++;
        this.setState(prevState => {
            prevState.Model.Item.push({ Id: this.Id, Name: "", Relation: "配偶", Company: "", Post: "", Phone: "" });
        });
    }
    onDelete(index: number) {
        this.setState(prevState => {
            prevState.Model.Item.splice(index, 1);
        });
        this.props.onHandleInputChange("Family", this.state.Model);
    }
    handleChange(event: React.ChangeEvent<any>, index: number) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => {
            prevState.Model.Item[index][name] = value;

        });
        this.props.onHandleInputChange("Family", this.state.Model);
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

        }
        Model.$Valid ? Model.$ErrorMsg = "" : Model.$target = name;
        return Model;
    }
    render() {
        return <div className="container text-left">
            <div className="page-header">
                <h1 className="tit-l-bor ft18 mt10">
                    <span className="ml10">填写家庭成员</span>
                </h1>
            </div>
            <div className="form-horizontal">
                <table className="table table-hover table_bg-C">
                    <thead className="c39 ft14">
                        <tr>
                            <th>姓名：</th>
                            <th style={{width:"150px"}}>关系：</th>
                            <th>工作单位：</th>
                            <th>职务：</th>
                            <th>联系方式：</th>
                            <th className="center"><a onClick={this.onAdd} type="button" className="btn btn-add">添加</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Model.Item.map((x, i) =>
                            <tr key={x.Id.toString()}>
                                <td> <input type="text" className="form-control" name="Name" value={x.Name} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td>
                                    {/*<input type="text" className="form-control" name="Relation" value={x.Relation} onChange={e => { this.handleChange(e, i) }} />*/}
                                    <select className="form-control" name="Relation" value={x.Relation} onChange={e => { this.handleChange(e, i) }} >
                                        <option value="" >--请选择--</option>
                                        <option value="配偶" >配偶</option>
                                        <option value="其他" >其他</option>
                                        <option value="父母" >父母</option>
                                        <option value="兄弟姐妹" >兄弟姐妹</option>
                                        <option value="子女" >子女</option>
                                    </select>
                                </td>
                                <td> <input type="text" className="form-control" name="Company" value={x.Company} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Post" value={x.Post} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Phone" value={x.Phone} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td className="text-right"> <a type="button" className="btn btn-link" onClick={() => { this.onDelete(i) }}><span className="icon-delete3"></span> 删除</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
            ;
    }
}