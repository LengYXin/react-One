import * as React from "react";
import * as Server from "../Server";

interface Props { onHandleInputChange?: any; User?: any }
interface Model {
    // [key: string]: any;
    Id?: number;
    SchoolNature?: string;  //学历性质
    StartDate?: string;     //开始日期
    EndDate?: string;       //结束日期
    SchoolName?: string;    //学校姓名
    Education?: string;     //学历
    Degree?: string         //学位
}
interface State { check: Model; Model: { Item: Model[]; $Valid?: Boolean; $ErrorMsg?: string; } }

// 教育经历
export class Education extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Item: [{ Id: 0, SchoolNature: "", StartDate: "", EndDate: "", SchoolName: "", Education: "", Degree: "" }],
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
            let item = [{ Id: 0, SchoolNature: "", StartDate: "", EndDate: "", SchoolName: "", Education: "", Degree: "" }];
            try {
                let list = JSON.parse(this.props.User.edu);
                if (list.length) {
                    item = list;
                }
            } catch (error) {
                console.error(error);
            }
            prevState.Model.Item = item;
        }, () => {
            this.props.onHandleInputChange("Education", this.state.Model);
        });
    }
    Id = 0;
    onAdd() {
        this.Id++;
        this.setState(prevState => {
            prevState.Model.Item.push({ Id: this.Id, SchoolNature: "", StartDate: "", EndDate: "", SchoolName: "", Education: "", Degree: "" });
        });
    }
    onDelete(index: number) {

        this.setState(prevState => {
            prevState.Model.Item.splice(index, 1);
        });
        this.props.onHandleInputChange("Education", this.state.Model);

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
        this.props.onHandleInputChange("Education", this.state.Model);
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
            case 'Item':
                if (value.length > 0) {
                    let val: Model = value[0];
                    if (!val.SchoolNature) {
                        Model.$Valid = false;
                        Model.$ErrorMsg = "没有填写学校性质！";
                    }
                    else if (!val.SchoolName) {
                        Model.$Valid = false;
                        Model.$ErrorMsg = "没有填写学校名称！";
                    }
                    else if (!val.Education) {
                        Model.$Valid = false;
                        Model.$ErrorMsg = "没有填写学历！";
                    }
                    else if (!val.Degree) {
                        Model.$Valid = false;
                        Model.$ErrorMsg = "没有填写学位！";
                    } else {
                        Model.$Valid = true;
                    }
                } else {
                    Model.$Valid = false;
                    Model.$ErrorMsg = "教育信息必须填写！";
                }

                break;
        }
        Model.$Valid ? Model.$ErrorMsg = "" : Model.$target = name;
        return Model;
    }
    render() {
        return <div className="container text-left">
            <div className="page-header">
                <h1 className="tit-l-bor ft18 mt10">
                    <span className="ml10">填写教育信息</span>
                </h1>
            </div>
            <div className="form-horizontal">
                <table className="table table-hover table_bg-C">
                    <thead className="c39 ft14">
                        <tr>
                            <th>学校性质：</th>
                            <th>开始日期：</th>
                            <th>结束日期：</th>
                            <th>学校名称：</th>
                            <th>学历：</th>
                            <th>学位：</th>
                            <th className="center"><a onClick={this.onAdd} type="button" className="btn btn-add">添加</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Model.Item.map((x, i) =>
                            <tr key={x.Id.toString()}>
                                <td> <input type="text" className="form-control" name="SchoolNature" value={x.SchoolNature} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td className="pos_r"> <input type="text" className="form-control" name="StartDate" value={x.StartDate} onChange={e => { this.handleChange(e, i) }} /><span className="icon-rili pos_a"></span></td>
                                <td className="pos_r"> <input type="text" className="form-control" name="EndDate" value={x.EndDate} onChange={e => { this.handleChange(e, i) }} /><span className="icon-rili pos_a"></span></td>
                                <td> <input type="text" className="form-control" name="SchoolName" value={x.SchoolName} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Education" value={x.Education} onChange={e => { this.handleChange(e, i) }} /></td>
                                <td> <input type="text" className="form-control" name="Degree" value={x.Degree} onChange={e => { this.handleChange(e, i) }} /></td>
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