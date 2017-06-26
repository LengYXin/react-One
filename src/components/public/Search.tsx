import * as React from "react";

interface Props { onHandleInputChange: any; dataList: any; selectValue: any }
//                                                                                                
interface Model { }
interface State { }

// 户口
export class Search extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        console.log("object", this.props);
        this.state = {
            selectValue: {
                name: this.props.selectValue || '--请选择--',
                value: 'Null'
            },
            display: "",
            search: "",
            dataList: this.props.dataList.map((x: any) => x)
        };

        this.handleChange = this.handleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.openSelect = this.openSelect.bind(this);
        this.onBlur = this.onBlur.bind(this);

    }
    componentDidMount() {

    }
    //关键字 修改事件 更新状态 子组件传递
    handleChange(value: string) {
        this.setState((prevState: any) => {
            prevState.search = value;
            prevState.dataList = this.props.dataList.filter((x: any) => {
                return value.length > 0 ? x.name.indexOf(value) != -1 : true;
            })
        });
        console.log("-------------------", value);
    }
    //选择事件更新状态  从 子组件获取
    selectChange(select: any) {
        this.setState((prevState: any) => {
            prevState.selectValue = select
        }, () => {
            this.setState((prevState: any) => {
                prevState.display = ""
            });
        });
        this.props.onHandleInputChange(select.name);
    }
    //显示 搜索 组件
    openSelect(event: React.MouseEvent<HTMLDivElement>) {
        if (this.state.display == "block") {
            this.setState((prevState: any) => {
                prevState.display = ""
            }, () => {
            });;
        } else {
            this.setState((prevState: any) => {
                prevState.display = "block"
            }, () => {
                // (this.refs.search as HTMLInputElement).focus();
            });
        }

    }
    onBlur() {
        // this.setState((prevState: any) => {
        //     prevState.display = ""
        // });
    }

    render() {
        return <div className="ui multiple search normal selection dropdown">
            <div className="form-control" onClick={e => { this.openSelect(e) }}>
                <span>{this.state.selectValue.name}</span>
            </div>
            <SearchBody
                onHandleInputChange={this.handleChange}
                onSelectChange={this.selectChange}
                dataList={this.state.dataList}
                display={this.state.display}>
            </SearchBody>
        </div>;
    }
}
interface PropsSearchBody { onHandleInputChange: any; onSelectChange: any; dataList: any; display: any }
/**
 * 搜索 组件
 */
class SearchBody extends React.Component<PropsSearchBody, any> {
    constructor(props: PropsSearchBody) {
        super(props);
        this.state = {
            search: "",
        };
        this.selectChange = this.selectChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {

    }
    componentDidUpdate() {
        if (this.props.display.length > 0) {
            (this.refs.search as HTMLInputElement).focus();
        }
    }
    // 关键词改变事件
    handleChange() {
        let value = (this.refs.search as HTMLInputElement).value;
        this.props.onHandleInputChange(value);
    }
    //选择事件  
    selectChange(select: any) {
        this.setState((prevState: any) => {
            prevState.selectValue = select
        }, () => {
            this.setState((prevState: any) => {
                prevState.display = ""
            });
        });
        this.props.onSelectChange(select);
    }
    //生成 列表
    renderSearch() {
        // let key = this.state.search;
        // let List: { name: string, value: any }[] = this.props.dataList.filter((x: { name: string, value: any }) => {
        //     return key.length > 0 ? true : x.name.indexOf(key) != -1;
        // });

        return <div className="menu transition " >
            {this.props.dataList.map((x) =>
                <div key={x.value} className="item " onClick={e => {
                    this.selectChange({ name: x.name, value: x.value })
                }} >
                    {x.name}
                </div>
            )}
        </div>
    }
    render() {
        return <div className="search-body" style={{ display: this.props.display }}>
            <input className="search" ref="search" onChange={this.handleChange} />
            {this.renderSearch()}
        </div>
            ;
    }
}