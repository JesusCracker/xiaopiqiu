import React, { Component } from 'react';
import { Wrapper } from '@/utils/utils';
import { identImagePath } from '@/global';
import PropTypes from 'prop-types';
import types from './identification.less';

class Identification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.handleImage(dispatch);
  }


//生成32位uuid
  getUUID = (n = 32) => {
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < n; i += 1) {
      result += str[parseInt(Math.random() * str.length, 10)];
    }
    return result;
  };

  handleImage = (dispatch) => {
    const uuid = this.getUUID();
    localStorage.setItem('uuid',uuid)
 /*   dispatch({
      type: 'login/fetchIdentificationCode',
      payload: { uuid },
    });*/

    const src = `${identImagePath}/verificationCode?localIdentification=${uuid}`;
    this.setState({
      src,
    });
  };

  render() {
    const { src } = this.state;
    return (
      <Wrapper>
        <img src={src} alt="not found" className={types.identification} onClick={() => {
          this.handleImage();
        }} />
      </Wrapper>);
  }
}


Identification.propTypes = {
  src: PropTypes.string,
};

Identification.defaultProps = {
  src: '',
};


export default Identification;
