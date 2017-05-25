
import * as React from "react";
export class SwiperContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    swiper: any;
    // 组件输出已经呈现给DOM后，该钩子就会运行
    componentDidMount() {
        this.initSwiper();
        console.log("SwiperContainer 加载", this);
    }
    componentWillUnmount() {
        this.swiper.destroy(false, true);
        console.log("SwiperContainer 销毁", this);
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        this.initSwiper();
    }
    initSwiper() {
        // debugger
        if (this.swiper) {
            this.swiper.destroy(false, true);
        }
        if (this.props.CheckThrough == "FillIn") {
            // this.swiper = new Swiper(this.refs.swiperContainer, {
            //     direction: 'vertical',
            //     hashnav: true,
            //     hashnavWatchState: true,
            //     pagination: this.refs.swiperPagination,
            //     paginationType: 'progress',
            //     nextButton: this.refs.swiperButtonNext,
            //     prevButton: this.refs.swiperButtonPrev,
            //     roundLengths: true, //防止文字模糊
            //     mousewheelControl: true,
            // });
        }
    }
    render() {
        return <div ref="swiperContainer" className={this.props.CheckThrough + ' swiper-container'}>
            <div className="swiper-wrapper">
                {this.props.children}
            </div>
            {this.props.CheckThrough == "FillIn" &&
                <div ref="swiperPagination" className="swiper-pagination"></div>
            }
            {this.props.CheckThrough == "FillIn" &&
                <div ref="swiperButtonPrev" className="swiper-button-prev"></div>
            }
            {this.props.CheckThrough == "FillIn" &&
                <div ref="swiperButtonNext" className="swiper-button-next"></div>
            }

        </div>;
    }
}