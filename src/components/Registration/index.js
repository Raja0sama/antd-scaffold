import { Drawer, Form, Button, Select, DatePicker, notification, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import {
  AdminFormInputs,
  SecretaryFormInputs,
  OwnerFormInputs,
  CustomerFormInputs,
} from './AdminFormInputs';
import { connect } from 'umi';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAuthority } from '@/utils/authority';

const { Option } = Select;

const DrawerForm = ({ loading, visible, onClose, onSubmit, account }) => {
  // const [account, setaccount] = useState(undefined);

  const [options, setoptions] = useState([]);
  function onChange(value) {
    setaccount(value);
  }

  useEffect(() => {
    let opt = [];
    const auth = getAuthority()[0];
    if (auth == 'owner') opt = ['admin', 'owner', 'secretary', 'customer'];
    if (auth == 'admin') opt = ['secretary', 'customer'];
    if (auth == 'secretary') opt = ['customer'];

    setoptions(opt);
  }, []);

  const CB = (e) => {
    notification.success({
      message: account + ' account created',
    });
  };
  const ref = useRef();

  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              onClick={onClose}
              style={{
                marginRight: 8,
              }}
            >
              Cancel
            </Button>
            <Popconfirm
              title="Are you sure you want to continue?"
              onConfirm={() => ref.current.submit()}
              onCancel={() => console.log('Canceled')}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={loading} onClick={() => null} type="primary">
                Submit
              </Button>
            </Popconfirm>
          </div>
        }
      >
        <div>
          {false && (
            <Select
              showSearch
              style={{ width: 200, textTransform: 'capitalize', marginBottom: 10 }}
              placeholder="Select a Role"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options.map((e) => (
                <Option style={{ textTransform: 'capitalize' }} value={e}>
                  {e}
                </Option>
              ))}
            </Select>
          )}

          <Form
            ref={ref}
            onFinish={(e) => {
              onSubmit({ ...e, CB, authority: account }, account);
            }}
            layout="vertical"
            hideRequiredMark
          >
            {account == 'admin' && <AdminFormInputs disable prefixSelector={prefixSelector} />}
            {account == 'secretary' && (
              <SecretaryFormInputs disable prefixSelector={prefixSelector} />
            )}
            {account == 'owner' && <OwnerFormInputs disable prefixSelector={prefixSelector} />}
            {account == 'customer' && (
              <CustomerFormInputs disable prefixSelector={prefixSelector} />
            )}
          </Form>
        </div>
      </Drawer>
    </>
  );
};

const prefixSelector = (
  <Form.Item
    rules={[
      {
        required: true,
        message: 'Please Enter Country Code',
      },
    ]}
    name="prefix"
    noStyle
  >
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

export default connect(({ accounts }) => ({ loading: accounts.loading.creation }))(DrawerForm);
