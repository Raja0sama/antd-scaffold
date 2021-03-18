import { Logout } from '@/models/user';
import Auth from '@/services/auth';
import { removeAuthority } from '@/utils/authority';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      Auth.logout();
      removeAuthority();
      history.replace(`/user/login`);
      return;
    }
    history.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
      currUser,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="profile">
            <SettingOutlined />
            Account settings
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          Sign out
        </Menu.Item>
      </Menu>
    );
    return currentUser ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <UserOutlined style={{ marginRight: 5 }} />
          <span className={`${styles.name} anticon`}>
            {currUser.firstName} {currUser.lastName}
          </span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(
  ({ user }) => ({
    currentUser: user.currentUser,
  }),
  { Logout },
)(AvatarDropdown);
