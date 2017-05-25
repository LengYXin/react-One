import * as React from "react";

interface Props { onHandleInputChange?: any; }
interface Model { [key: string]: any; $valid?: Boolean; }
interface State { check: Model; Model: { Item: Model[]; $Valid?: Boolean; $ErrorMsg?: string; } }

// 文件上传
export class Files extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            check: {}, Model: {
                Item: [],
                $Valid: true,//验证通过状态
                $ErrorMsg: ''
            }
        };
    }
    uploader: any;
    // 组件输出已经呈现给DOM后，该钩子就会运行
    componentDidMount() {
        this.props.onHandleInputChange("Files", this.state.Model);

        console.log("文件上传 加载", this);
        this.uploader = new plupload.Uploader({
            browse_button: this.refs.PluploadBtn,
            url: '/api/demo/upload'
        });
        this.uploader.init();
        this.uploader.bind('FilesAdded', (up: any, files: any[]) => {
            console.log(up);
            this.onUpdate(up.files);
            setTimeout(() => {
                this.uploader.start();
            }, 500);
        });
        //单个文件上传成功
        this.uploader.bind("FileUploaded", (up: any, file: any, res: any) => {
            res = JSON.parse(res.response);
            console.log("FileUploaded", res);
            file.url = res.data.url;
            this.onUpdate(up.files);
        });
        // 上传过程不断触发
        this.uploader.bind('UploadProgress', (up: any, file: any) => {
            console.log("UploadProgress", file);
            this.onUpdate(up.files);
        });
        // 全部上传成功
        this.uploader.bind('UploadComplete', (up: any, files: any) => {

        });
        // this.uploader.bind('UploadProgress', (up: any, file: any) => {
        // });
        // this.uploader.bind('Error', (up: any, err: any) => {
        // });


    }
    removeFile(id: any) {
        this.uploader.removeFile(id);
        this.onUpdate(this.uploader.files);
    }
    onUpdate(files: any) {
        this.setState(prevState => {
            prevState.Model.Item = files;
        });
        let item = this.state.Model.Item.map(x => {
            return { Name: x.name, Url: x.url || "", status: x.status };
        });
        let Valid = true, ErrorMsg = "文件未上传完成！";
        if (item.filter(x => x.status != 5).length > 0) {
            Valid = false;
        }
        let Model = {
            Item: item,
            $Valid: Valid,//验证通过状态
            $ErrorMsg: ErrorMsg
        };
        this.props.onHandleInputChange("Files", Model);
    }
    render() {
        return <div className="container text-left">
            <div className="page-header">
                <h1>文件上传 <button ref="PluploadBtn" type="button" className="btn btn-success">添加文件</button></h1>
            </div>
            {/*<div className="list-group text-left">
                <a href="javascript:void(0)" className="list-group-item ">
                    <h4 >文件 <button type="button" className="close" ><span>×</span></button></h4>

                </a>
            </div>*/}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th style={{ width: "50%" }}>文件名</th>
                        <th style={{ width: "30%" }}>上传进度</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.Model.Item.map((x, i) =>
                        <tr key={i.toString()}>
                            <td className="text-left">
                                <a href={x.url} target="_blank"> {x.name}</a>
                            </td>
                            <td >
                                <div className="progress">
                                    <div className="progress-bar" style={{ width: Math.ceil(x.loaded / x.size * 100.0) + "%", minWidth: '3rem' }} >
                                        {Math.ceil(x.loaded / x.size * 100.0) + "%"}
                                    </div>
                                </div>
                            </td>
                            <td className="text-right">
                                <button type="button" className="btn " onClick={() => { this.removeFile(x.id) }}>删除</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
            ;
    }
}