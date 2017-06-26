import * as React from "react";

import { SwiperSlide } from "./SwiperSlide";

//检查组件
export class Inspect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { Phonecheck: false, Phone: "13345678901" };
        this.handleChange = this.handleChange.bind(this);
        this.onInspect = this.onInspect.bind(this);
    }
    Code = "";
    componentDidMount() {
        this.Code = this.GetQueryString("code");
    }
    componentWillUnmount() {
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => ({
            Phone: value,
            Phonecheck: value.length > 0 && !/^1[34578]\d{9}$/.test(value)
        }));
    }
    onInspect() {
        // if (!this.state.Phonecheck && /^1[34578]\d{9}$/.test(this.state.Phone)) {
        if (this.Code) {
            layer.open({ type: 2 });
            // var req = new Request(URL, { method: 'GET', cache: 'reload', });
            // fetch("/api/user/checkMobile",{
            //     method:"GET",
            //     cache: 'reload',
            //     body:JSON.stringify({
            //         mobile:this.state.Phone
            //     })
            // }).then(x => {
            //     console.log("object",x);
            //     setTimeout(() => {
            //         this.props.onCheckThrough("FillIn");
            //         layer.closeAll();
            //     }, 1000);
            // }).catch(x => {

            // });
            // setTimeout(() => {

            // }, 2000);
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                console.log(response);
                if (response.code == 0 && response.data.toString().indexOf('不存在') == -1) {
                    response.data.uniquecode = this.Code;
                    setTimeout(() => {
                        this.props.onCheckThrough("FillIn", response.data);
                        layer.closeAll();
                    }, 1000);
                } else {
                    layer.closeAll();
                    layer.open({
                        content: "offer" + response.data,
                        btn: '我知道了'
                    });
                }

            };
            ///xhr.open('GET', "/api/user/find?code=" + this.Code);
            xhr.open('GET', "/api/user/findByUniquecode?uniquecode=" + this.Code);
            xhr.send();

        } else {
            layer.open({
                content: 'offer不存在！',
                btn: '我知道了'
            });
        }

    }
    // 获取openid
    GetQueryString(name: any) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return r[2];
        return null;
    }
    render() {

        return <SwiperSlide className="swiper-slide swiper-conter">
            <div className="container minH500">
                <div className="header entry_login">
                    <h4>欢迎来到易鑫</h4>
                </div>
                <div className="form-hor-Login">
                    {/*<div className='form-group row'>
                        <div className="col-lg-4 help-block text-r c39 ft16">手机号：<span className="ce85 text-vsub">*</span></div>
                        <div className="col-lg-4">
                            <input type="text" className="form-control" name="phone" placeholder="请输入您留给HR的手机号"
                                value={this.state.Phone} onChange={this.handleChange} />

                        </div>
                        <div className="col-lg-4 text-l">
                            {
                                this.state.Phonecheck &&
                                <span className={this.state.Phonecheck ? 'help-block ft16 ce85' : 'help-block ft16'}>请输入正确的手机号</span>
                            }
                        </div>
                    </div>*/}

                    <div className="form-group row text-center">
                        <button type="submit" className="btn btn-danger" onClick={this.onInspect}>进入</button>
                    </div>
                </div>
            </div>
        </SwiperSlide>
            ;
    }
}