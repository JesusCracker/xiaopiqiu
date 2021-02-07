import React, { PureComponent } from 'react';
import { Layout, Row, Col, Carousel, message } from 'antd';
import { bounce, fadeIn, fadeInLeft, fadeInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import styles from './index.less';
import Bmap from '../../utils/Bmap';
import scar from '../../assets/PC/pc-邀好友.png';
import red from '../../assets/PC/pc-领积分.png';
import task from '../../assets/PC/pc-抢红包.png';
import android from '../../assets/PC/android.png';
import 公众号 from '../../assets/PC/gzh.jpg';
import 头条 from '../../assets/PC/tt.png';
import 微信客服 from '../../assets/PC/kf.png';

const { Header, Footer, Sider, Content } = Layout;


const style = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce'),
  },
  fadeInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInLeft, 'bounce'),
  },
  fadeIn: {
    animation: 'x 4s',
    animationName: Radium.keyframes(fadeIn, 'bounce'),
  },
  fadeInLong: {
    animation: 'x 6s',
    animationName: Radium.keyframes(fadeIn, 'bounce'),
  },
  fadeInRight: {
    animation: 'x 5s',
    animationName: Radium.keyframes(fadeInRight, 'bounce'),
  },
  fadeInRightLong: {
    animation: 'x 10s',
    animationName: Radium.keyframes(fadeInRight, 'bounce'),
  },
  fadeInLeftLong: {
    animation: 'x 10s',
    animationName: Radium.keyframes(fadeInLeft, 'bounce'),
  },
};

class PC extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pos: null,
      dotPosition: 'right',
      index: 0,
    };
    this.crousel = React.createRef();
  }

  componentDidMount() {
    const { index } = this.state;
    this.crousel.goTo(index);
  }

  handlePositionChange = ({ target: { value: dotPosition } }) => this.setState({ dotPosition });

  handleScroll = (e) => {
    const { index } = this.state;
    /*    console.dir(index)
        console.dir(e.deltaY)*/
    if (e.deltaY >= 0) {
      if (index >= 0 && index <= 2) {
        this.setState({
          index: index + 1,
        });
        this.crousel.goTo(index);
      }
      if (index > 2) {
        this.setState({
          index: 2,
        });
        // message.error('已到页面尾部');
      }
    } else {

      if (index > 0) {
        this.setState({
          index: index - 1,
        });
      }
      this.crousel.goTo(index);

      if (index === 0) {
        this.setState({
          index: 0,
        });

      }
    }


  };

  render() {
    const { pos, dotPosition } = this.state;
    return (
      <div onWheel={e => this.handleScroll(e)}>
        <Carousel
          effect="fade"
          dotPosition={dotPosition}
          ref={node => {
            this.crousel = node;
          }}
        >
          <div>
            <div className={styles.defaultHeader}>
              <div className={styles.bannerImage}>
                <div className={styles.inner}>
                  <div className={styles.title}>
                    <StyleRoot>
                      <div className="test" style={style.bounce}>
                        小皮球APP
                      </div>
                    </StyleRoot>
                  </div>

                  <div className={styles.day}>
                    <StyleRoot>
                      <div className="test" style={style.fadeInLeft}>
                        随时随地抢红包，领积分
                      </div>
                    </StyleRoot>
                  </div>
                  <div className={styles.h} />

                  <div className={`${styles.download}`}>
                    <img src={android} alt="" />
                    <span> Android 下载</span>
                  </div>

                  <div className={styles.qrcode}>
                    <StyleRoot>
                      <div style={style.fadeIn}>
                        <img src={公众号} alt="" />
                      </div>
                    </StyleRoot>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Content className={`${styles.content} ${styles.setBlock}`}>
              <Row className={`${styles.rolStyle} ${styles.rolInfo}`}>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                  <StyleRoot>
                    <div style={style.fadeInLong}>
                      <div className={styles.blockArea}>
                        <img src={task} alt="" />
                        <h1>免费抢红包</h1>
                        <div>无论什么时候，无论你在哪里，你都可以免费抢超级大红包！</div>
                      </div>
                    </div>
                  </StyleRoot>
                </Col>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                  <StyleRoot>
                    <div style={style.fadeInLong}>
                      <div className={styles.blockArea}>
                        <img src={red} alt="" />
                        <h1>天天领积分</h1>
                        <div>每天轻松领积分，随时随地都都能领，好安逸！</div>
                      </div>
                    </div>
                  </StyleRoot>
                </Col>
                <Col xs={{ span: 5, offset: 2 }} lg={{ span: 6, offset: 1 }}>
                  <StyleRoot>
                    <div style={style.fadeInLong}>
                      <div className={styles.blockArea}>
                        <img src={scar} alt="" />
                        <h1>邀请朋友一起来</h1>
                        <div>邀请朋友一起来，领更多积分，抢更大的红包！</div>
                      </div>
                    </div>
                  </StyleRoot>
                </Col>
              </Row>
            </Content>
          </div>

          <div className={`${styles.setBlock} ${styles.foot}`}>
            <Row className={styles.footInfo}>

              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9 }}>
                <StyleRoot>
                  <div style={style.fadeInLeftLong}>
                    <div className={styles.connectUS}>
                      <div className={styles.title}>
                        <StyleRoot>
                          <div className="test" style={style.fadeInRight}>
                            联系我们
                          </div>
                        </StyleRoot>
                      </div>
                      <div className={styles.address}>四川省小皮球科技有限公司</div>
                      <div className={styles.address}>四川省成都市武侯区天府大道北段1677号金融梦工厂A座</div>
                      <div className={styles.qrcodeBlock}>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                          <Col span={12}>
                            <img src={公众号} alt="" className={styles.smImage} />
                            <div className={styles.intro}>小皮球公众号</div>
                          </Col>
                          <Col span={12}>
                            <img src={微信客服} alt="" className={styles.smImage} />
                            <div className={styles.intro}>小皮球微信客服</div>
                          </Col>
                        </Row>
                      </div>
                      <div className={styles.inn}>小皮球Copyright © 2020-2021 四川小皮球科技有限公司 | 蜀ICP备20021491号</div>
                    </div>
                  </div>
                </StyleRoot>
              </Col>

              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8 }}>
                <StyleRoot>
                  <div style={style.fadeInRightLong}>
                    <Bmap value={pos} onChange={pos => this.setState({ pos })} />
                  </div>
                </StyleRoot>

              </Col>
            </Row>
          </div>
        </Carousel>
      </div>

    );
  }
}

PC.propTypes = {};

export default PC;
