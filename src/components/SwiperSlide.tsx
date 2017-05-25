import * as React from "react";
export interface Props { className?: string; hash?: string }
export class SwiperSlide extends React.Component<Props, any> {
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        if (this.props.className) {
            return <div className={this.props.className} data-hash={this.props.hash}>
                {this.props.children}
            </div>;
        }
        return <div className="swiper-slide " data-hash={this.props.hash}>
            {this.props.children}
        </div>;
    }
}