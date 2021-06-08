import React, {useEffect, useState} from 'react';
import { Statistic, Card, Row, Col} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import {fetchDashboard} from '@/services/dashboard'

const DashBoard = () => {
  // 定义组件状态，状态改变
  let [data, setData] = useState({})

  useEffect(async () =>{
    const resData = await fetchDashboard()
    setData(resData)
  },[])
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={data.users_count}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}

            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数"
              value={data.goods_count}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowUpOutlined />}

            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数"
              value={data.order_count}
              precision={0}
              valueStyle={{ color: '#234abc' }}
              prefix={<ArrowDownOutlined />}

            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
