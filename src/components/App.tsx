import * as React from "react";
import * as Server from "./Server";

import { SwiperContainer } from "./SwiperContainer";
import { SwiperSlide } from "./SwiperSlide";
import { Inspect } from "./Inspect";
import { Personal } from "./dataModel/Personal";
import { Registered } from "./dataModel/Registered";
import { Contact } from "./dataModel/Contact";
import { Family } from "./dataModel/Family";
import { Education } from "./dataModel/Education";
import { Driving } from "./dataModel/Driving";
import { Work } from "./dataModel/Work";
import { Files } from "./dataModel/Files";
interface Props { [key: string]: any; }
interface Basics { [key: string]: any; $Valid?: Boolean; $ErrorMsg?: string; }
interface Model { [key: string]: any; Personal: Basics, Registered: Basics, Contact: Basics, Family: Basics, Education: Basics, Driving: Basics, Work: Basics, Files: Basics, }
interface State { Model: Model; CheckThrough: any; }
export class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            // Inspect   FillIn   Submit
            //验证手机        填写数据      提交完成
            CheckThrough: "FillIn",
            // 保存需要提交的数据  通过提升状态传递
            Model: {
                Personal: {},//个人信息
                Registered: {},//户口信息
                Contact: {},//联系方式
                Family: {},//家人信息
                Education: {},//教育信息
                Driving: {},//驾照信息
                Work: {},//工作信息
                Files: {},//文件
            },
        };
        this.onCheckThrough = this.onCheckThrough.bind(this);
        this.onHandleInputChange = this.onHandleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // 组件输出已经呈现给DOM后，该钩子就会运行。
    componentDidMount() {

        console.log("SwiperSlide", this);
    }
    // 改变当前 状态 
    onCheckThrough(obj: any) {
        this.setState(prevState => ({
            CheckThrough: obj
        }));
    }
    // 提升 的 数据回调事件
    onHandleInputChange(name: any, value: any) {
        this.setState(prevState => {
            prevState.Model[name] = value;
        });
        // console.info("提升 的 数据回调事件", this.state.Model);
    }
    //提交数据
    onSubmit() {
        console.log(this);
        this.check();
        if (Server.Verification.$Valid) {
            layer.open({ type: 2 });
            setTimeout(() => {
                this.onCheckThrough("Submit");
                layer.closeAll();
                // this.forceUpdate();
            }, 2000);
        } else {
            layer.open({
                content: Server.Verification.$ErrorMsg
                , btn: '我知道了'
            });
        }
    }
    //检查所有参数
    check() {
        Server.Verification.$Valid = true;
        for (let key in this.state.Model) {
            if (this.state.Model.hasOwnProperty(key)) {
                let eles = this.state.Model[key];
                for (let key in eles) {
                    if (eles.hasOwnProperty(key)) {
                        let ele = eles[key];
                        let Model = Server.filter(key, ele);
                        if (Server.Verification.$Valid) {
                            Server.Verification.$ErrorMsg = Model.$ErrorMsg;
                            Server.Verification.$Valid = Model.$Valid;
                        } else {

                        }
                    }
                }
            }
        }
    }
    render() {
        // 验证
        if (this.state.CheckThrough == "Inspect") {
            return <SwiperContainer CheckThrough={this.state.CheckThrough}>
                <Inspect onCheckThrough={this.onCheckThrough}></Inspect>
            </SwiperContainer>;
        }
        //填写
        if (this.state.CheckThrough == "FillIn") {
            return <SwiperContainer CheckThrough={this.state.CheckThrough}>
                <SwiperSlide hash="pl"><Personal onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="rr"><Registered onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="ct"><Contact onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="fy"><Family onHandleInputChange={this.onHandleInputChange} /> </SwiperSlide>
                <SwiperSlide hash="en"><Education onHandleInputChange={this.onHandleInputChange} /> </SwiperSlide>
                <SwiperSlide hash="dl"><Driving onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="wk"><Work onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="pp"><Files onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="sm">
                    <div className="container">
                        <div className="row col-lg-6 col-lg-offset-3 text-center">
                            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.onSubmit}>提交</button>
                        </div>
                    </div>
                </SwiperSlide>
            </SwiperContainer>;
        }
        //提交
        if (this.state.CheckThrough == "Submit") {
            return <SwiperContainer CheckThrough={this.state.CheckThrough}>
                <SwiperSlide>
                    <h1>提交成功！</h1>
                </SwiperSlide>
            </SwiperContainer>;
        }

    }
}