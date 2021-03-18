import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Tag,
  Dropdown,
  Menu,
  Popconfirm,
} from 'antd';
import {
  DownOutlined,
  HomeOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { useEffect } from 'react';
import { useState } from 'react';
import { createABuilding, selectABuilding } from '@/models/buildings';
import { useRef } from 'react';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  let className = styles.right;
  const { theme, layout } = props;
  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar menu currUser={props.currUser} />
      <span>
        <Tag style={{ textTransform: 'capitalize' }} color={ENVTagColor[REACT_APP_ENV]}>
          {props.user.authority}
        </Tag>
      </span>
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(
  ({ settings, buildings, user }) => ({
    theme: settings.navTheme,
    layout: settings.layout,
    buildings: buildings.buildings,
    building: buildings.building,
    buildingsLoading: buildings.loading.buildings,
    buildingsCLoading: buildings.loading.creation,
    user: user.user,
  }),
  { selectABuilding, createABuilding },
)(GlobalHeaderRight);
