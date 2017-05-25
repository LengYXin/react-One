import * as React from "react";

import { SwiperSlide } from "./SwiperSlide";

//检查组件
export class Inspect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { Phonecheck: false, Phone: "18611711111" };
        this.handleChange = this.handleChange.bind(this);
        this.onInspect = this.onInspect.bind(this);
    }
    componentDidMount() {
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
        if (!this.state.Phonecheck && /^1[34578]\d{9}$/.test(this.state.Phone)) {
            layer.open({ type: 2 });
            setTimeout(() => {

                this.props.onCheckThrough("FillIn");
                layer.closeAll();

            }, 2000);

        } else {
            layer.open({
                content: '请输入正确的手机号'
                , btn: '我知道了'
            });
        }

    }
    render() {

        return <SwiperSlide className="swiper-slide swiper-conter">
            <div className="container">
                <div className="text-center">
                    <h1>员工信息录入</h1>
                </div>
                <div className="form-horizontal">
                    <h4>验证手机号</h4>

                    <div className={this.state.Phonecheck ? 'form-group row has-error' : 'form-group row'}>
                        <label className="col-lg-4 control-label">手机号</label>
                        <div className="col-lg-4">
                            <input type="text" className="form-control" name="phone" value={this.state.Phone} onChange={this.handleChange} />
                            {
                                this.state.Phonecheck &&
                                <span className="help-block">请输入正确的手机号</span>
                            }
                        </div>
                    </div>
                    <div className="form-group row text-center">
                        <button type="submit" className="btn btn-primary" onClick={this.onInspect}>检查手机号</button>
                    </div>
                </div>
            </div>
        </SwiperSlide>
            ;
    }
}