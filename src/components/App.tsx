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
interface State { Model: Model; CheckThrough: any; User: any }
export class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            // Inspect   FillIn   Submit
            //验证手机        填写数据      提交完成
            CheckThrough: "Inspect",
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
            // 进入的用户基本信息
            User: {}
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
    onCheckThrough(obj: any, user?: any) {
        // 如果  需要拉取用户的情况下 毕竟等用户拉取完成后在进行 当前页面状态的更改
        if (user) {
            this.setState(prevState => ({
                User: user
            }), () => {
                this.setState(prevState => ({
                    CheckThrough: obj
                }));
            });
        } else {
            this.setState(prevState => ({
                CheckThrough: obj
            }));
        }
        console.log("user", user);
    }
    // 提升 的 数据回调事件
    onHandleInputChange(name: any, value: any) {
        this.setState(prevState => {
            prevState.Model[name] = value;
        });
        // console.info("提升 的 数据回调事件", value);
    }
    //提交数据
    onSubmit(state?: boolean) {
        console.log(this);
        const Personal = (this.refs.Personal as any).check();
        if (!Personal.$Valid) {
            return layer.open({
                content: Personal.$ErrorMsg
                , btn: '我知道了'
            });
        }
        const Registered = (this.refs.Registered as any).check();
        if (!Registered.$Valid) {
            return layer.open({
                content: Registered.$ErrorMsg
                , btn: '我知道了'
            });
        }
        const Contact = (this.refs.Contact as any).check();
        if (!Contact.$Valid) {
            return layer.open({
                content: Contact.$ErrorMsg
                , btn: '我知道了'
            });
        }

        const Education = (this.refs.Education as any).check();
        if (!Education.$Valid) {
            return layer.open({
                content: Education.$ErrorMsg
                , btn: '我知道了'
            });
        }
        return;
        // let xhr = new XMLHttpRequest();
        // xhr.onload = () => {
        //     let response = JSON.parse(xhr.response);
        //     if (response.code == 0) {
        //         setTimeout(() => {
        //             this.onCheckThrough("Submit");
        //             layer.closeAll();
        //         }, 1000);
        //     } else {
        //         layer.closeAll();
        //         layer.open({
        //             content: response.data,
        //             btn: '我知道了'
        //         });
        //     }
        // };
        // xhr.open('POST', "/api/user/save", true);
        // xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
        // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // // state = ture 为 提交数据   否则为保存草稿  保存草稿不需要验证输入
        // if (state) {
        //     this.check();
        //     if (Server.Verification.$Valid) {
        //         layer.open({ type: 2 });
        //         xhr.send(this.getModel(state));
        //     } else {
        //         layer.open({
        //             content: Server.Verification.$ErrorMsg
        //             , btn: '我知道了'
        //         });
        //     }
        // } else {
        //     layer.open({ type: 2 });
        //     xhr.send(this.getModel(state));
        // }

    }
    getModel(state?: boolean): string {
        let Model: any = {
            uniquecode: this.state.User.uniquecode,
            status: state,//保存状态
            //个人信息
            name_display: this.state.Model.Personal.Name,
            birth_dt: this.state.Model.Personal.Birthday,
            yx_mar_status: this.state.Model.Personal.Marriage,
            haschildren: this.state.Model.Personal.Children,
            yx_ehtnic_descr: this.state.Model.Personal.Nation,
            yx_political_sta_descr: this.state.Model.Personal.Face,
            native_place_chn: this.state.Model.Personal.PlaceOfOrigin,
            jobtitle: this.state.Model.Personal.Nickname,
            infofile: this.state.Model.Personal.Archives,
            //户口信息
            yx_hukou_type_descr: this.state.Model.Registered.Category,
            yx_hukou_zipcode: this.state.Model.Registered.Code,
            yx_contrib_area_descr: this.state.Model.Registered.Location,
            yx_hukou_address: this.state.Model.Registered.Address,
            // 联系方式
            family_phone: this.state.Model.Contact.HomePhone,
            mobile: this.state.Model.Contact.Phone,
            yx_juzhu_zipcode: this.state.Model.Contact.Code,
            email_address: this.state.Model.Contact.Mailbox,
            yx_juzhu_address: this.state.Model.Contact.PresentAddress,
            contact_name: this.state.Model.Contact.ContactsName,
            contact_phone: this.state.Model.Contact.ContactsPhone,
            //家人信息
            family: this.state.Model.Family.Item,
            //教育信息
            edu: this.state.Model.Education.Item,
            //驾照信息
            driving: this.state.Model.Driving.Driving,
            vehicle: this.state.Model.Driving.Vehicle,
            //工作信息
            works: this.state.Model.Work.Item,
            //文件
            files: this.state.Model.Files.Item
        };
        return JSON.stringify(Model);
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
                <SwiperSlide hash="pl"><Personal ref="Personal" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="rr"><Registered ref="Registered" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="ct"><Contact ref="Contact" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="fy"><Family ref="Family" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /> </SwiperSlide>
                <SwiperSlide hash="en"><Education ref="Education" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /> </SwiperSlide>
                <SwiperSlide hash="dl"><Driving ref="Driving" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="wk"><Work ref="Work" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="pp"><Files ref="Files" User={this.state.User} onHandleInputChange={this.onHandleInputChange} /></SwiperSlide>
                <SwiperSlide hash="sm">
                    <div className="container">
                        <div className="text-center foot_btn">
                            <button type="button" className="btn btn-danger w95" onClick={() => { this.onSubmit(true) }}>提交</button>
                            <button type="button" className="btn btn-danger w95" onClick={() => { this.onSubmit(false) }}>保存草稿</button>
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