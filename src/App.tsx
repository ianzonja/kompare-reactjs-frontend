import React from 'react';
import UserComponent from './userComponent';
import store from './store/store';
import { Breadcrumb, ConfigProvider, Flex, Layout } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import HeaderComponent from './components/HeaderComponent';

function App() {
  const { Header, Sider, Content } = Layout;

  return (
    <Flex gap="middle" wrap="wrap" style={{ height: "100%" }}>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', height: "10rem" }}>
          <HeaderComponent/>
        </Header>
        <Layout style={{ display: 'flex' }}>
          <Sider width={200}>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                borderRadius: '5px',
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Flex>
  );
}

export default App;
