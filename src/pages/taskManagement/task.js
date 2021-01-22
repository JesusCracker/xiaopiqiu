import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Card} from 'antd';

class Task extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam consectetur corporis earum error explicabo fugit incidunt iste, iure laborum maxime molestias, mollitia nulla optio pariatur quam quo, repellat voluptates.
        </Card>
      </PageHeaderWrapper>
    );
  }
}

Task.propTypes = {};

export default Task;
