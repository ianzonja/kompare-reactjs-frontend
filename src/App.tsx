import React, { useState } from 'react';
import store from './store/store';
import { Breadcrumb, ConfigProvider, Flex, Layout } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import HeaderComponent from './components/header/HeaderComponent';
import SidebarComponent from './components/sidebar/SidebarComponent';
import MainComponent from './components/main/MainComponent';

function App() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ConfigProvider theme={{ 
      components: {
        Button: {
          defaultBg: '#123123'
        }
      },
      token: { 
        colorPrimary: '#4B0082'
      } 
    }}>
      <Layout hasSider style={{minHeight: '100%'}}>
        <Sider
          width={300}
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, padding: 15 }}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <SidebarComponent sidebarCollapsed={collapsed}/>
        </Sider>
        <Layout style={{ marginLeft: collapsed  ? 80 : 300 }}>
          <Header style={{ padding: 15, alignItems: 'center', height: 'auto' }}>
            <HeaderComponent/>
          </Header>
          <Content style={{ height: '100%', padding: 15 }}>
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                height: '100%'
              }}
            >
              <MainComponent/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', padding: 15 }}>
            Created by Ian Žonja, (hopefully) future full-stack engineer @Kompare ❤
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
