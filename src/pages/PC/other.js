import React, { useEffect, useState } from 'react';
import styles from './other.less';
import { FullSlip, SlipItem } from 'react-fullslip';
import { useSelector, useDispatch, shallowEqual } from 'dva';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { bounce, fadeIn, fadeInLeft, fadeInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import android from '@/assets/PC/android.png';
import 公众号 from '@/assets/PC/gzh.jpg';
import { Col, Layout, message, Row } from 'antd';
import { imgUrlPath } from '@/global';
import task from '@/assets/PC/pc-抢红包.png';
import red from '@/assets/PC/pc-领积分.png';
import scar from '@/assets/PC/pc-邀好友.png';
import 微博 from '@/assets/PC/xpq_vlog.png';
import Bmap from '@/utils/Bmap';

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
const options = {
  navigation: false, //默认true
  //activeClass: 'active1', //默认active
  duration: 2000, //默认1000
  transverse: false, //默认纵向false
  navImage: [], //默认无图片
  arrowNav: true, //默认无箭头 false
};
const pageHeight = document.body.offsetHeight;

const Other = props => {
  const dispatch = useDispatch();
  const [defaultParams, setDefaultParams] = useState({
    page: 1,
    limit: 10,
  });
  const [pos, setPos] = useState(null);
  const { latestVersionInfo } = useSelector(({ appDownload }) => appDownload);

  useEffect(() => {
    dispatch({
      type: 'appDownload/fetchAppList',
      payload: defaultParams,
    });
  }, []);

  const download = () => {
    dispatch({
      type: 'appDownload/app',
      payload: defaultParams,
    }).then(res => {
      if (res.data && res.status === 1) {
        if (res.data && res.data.length === 0) {
          message.error('当前没有apk文件', 1);
          return false;
        }
        message.success('准备下载...', 1, () => {
          const path = imgUrlPath + res.data[0].apkSrc;
          const form = document.createElement('form');
          form.action = path;
          document.getElementsByTagName('body')[0].appendChild(form);
          form.submit();
        });
      } else {
        message.error(res.message, 1);
      }
    });
  };

  return (
    <div className={styles.others}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>小皮球-让您的积分更值钱</title>
      </Helmet>
      <div className={styles.first} style={{ height: pageHeight }}>
        <div className={styles.defaultHeader}>
          <div className={styles.bannerImage}>
            <div className={styles.inner}>
              <div className={styles.title}>
                <StyleRoot>
                  <div className="test" style={style.bounce}>
                    小皮球平台
                  </div>
                </StyleRoot>
              </div>

              <div className={styles.day}>
                <StyleRoot>
                  <div className="test" style={style.fadeInLeft}>
                    登录小皮球领每日红包
                  </div>
                </StyleRoot>
              </div>
              <div className={styles.h} />

              <div className={`${styles.download}`} onClick={() => download()}>
                <img src={android} alt="" />
                <span>APP安卓版下载</span>
              </div>
              <div className={`${styles.version}`}>
                <p className={styles.ol}>
                  最新版本：
                  {latestVersionInfo && 'version' in latestVersionInfo
                    ? `v${latestVersionInfo.version}`
                    : '暂无'}
                </p>
                <p className={styles.spe}>
                  更新时间：
                  {latestVersionInfo && 'createDate' in latestVersionInfo
                    ? moment(latestVersionInfo.createDate).format('YYYY-MM-DD HH:mm')
                    : '暂无'}
                </p>
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
      <FullSlip {...options}>
        <SlipItem>
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
        </SlipItem>
        <SlipItem>
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
                      <div className={styles.address}>四川省成都市高新区环球中心E3-312</div>
                      <div className={styles.qrcodeBlock}>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                          <Col span={12}>
                            <img src={公众号} alt="" className={styles.smImage} />
                            <div className={styles.intro}>小皮球公众号</div>
                          </Col>
                          <Col span={12}>
                            <img src={微博} alt="" className={styles.smImage} />
                            <div className={styles.intro}>小皮球微博</div>
                          </Col>
                        </Row>
                      </div>
                      <div className={styles.inn}>
                        小皮球Copyright © 2020-2021 四川小皮球科技有限公司 | 蜀ICP备20021491号
                      </div>
                    </div>
                  </div>
                </StyleRoot>
              </Col>

              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8 }}>
                <StyleRoot>
                  <div style={style.fadeInRightLong}>
                    <Bmap value={pos} onChange={pos => setPos({ pos })} />
                  </div>
                </StyleRoot>
              </Col>
            </Row>
          </div>
        </SlipItem>
        {/* <SlipItem style={{ backgroundColor: '#FFEC8B' }}>
          page3
        </SlipItem>*/}
      </FullSlip>
    </div>
  );
};

export default Other;
