import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Empty, Skeleton, Select, Button } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './index.less';
import { getAuthority } from '@/utils/authority';
import Emp from '@/assets/void.svg';
import { connect } from 'umi';
import { Option } from 'antd/lib/mentions';
import ScheduleWebinar  from "../../../components/ScheduleWebinar"
const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default connect((user) => ({ user: user.user }))((props) => {
  const intl = useIntl();
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  return (
    <PageContainer>
      <Card>
        {/* {props.user.user.authority == 'customer' && (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select parking space"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Basement</Option>
            <Option value="lucy">First Floor</Option>
            <Option value="tom">Roof</Option>
          </Select>
        )}

        <Empty image={Emp} imageStyle={{ height: 300 }} /> */}

        <div className={styles.homeItem}>
          <h3>Webinar</h3>
          <p>Organize a webinar, allow people to register, and present using screen sharing, audio, and webcam sharing.</p>
          <ScheduleWebinar />
        </div>
      </Card>
    </PageContainer>
  );
});
