import { Form, Col, Row, Input } from 'antd';

export function AdminFormInputs(props) {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="empId"
            label="Employee Id"
            rules={[
              {
                required: true,
                message: 'Please enter Employee ID.',
              },
            ]}
          >
            <Input placeholder="Please enter Employee ID." />
          </Form.Item>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please enter First name',
              },
            ]}
          >
            <Input placeholder="Please First user name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please enter Last name',
              },
            ]}
          >
            <Input placeholder="Please Last user name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={props.prefixSelector}
              placeholder={'Enter Phone Number Here.'}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter Email Address',
              },
            ]}
          >
            <Input placeholder="Please enter Email Address" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please enter Address',
              },
            ]}
          >
            <Input placeholder="Please enter Address" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
export function SecretaryFormInputs(props) {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please enter First name',
              },
            ]}
          >
            <Input placeholder="Please First user name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please enter Last name',
              },
            ]}
          >
            <Input placeholder="Please Last user name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={props.prefixSelector}
              placeholder={'Enter Phone Number Here.'}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter Email Address',
              },
            ]}
          >
            <Input placeholder="Please enter Email Address" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please enter Address',
              },
            ]}
          >
            <Input placeholder="Please enter Address" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
export function OwnerFormInputs(props) {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please enter First name',
              },
            ]}
          >
            <Input placeholder="Please First user name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please enter Last name',
              },
            ]}
          >
            <Input placeholder="Please Last user name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter Email Address',
              },
            ]}
          >
            <Input placeholder="Please enter Email Address" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
export function CustomerFormInputs(props) {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="aptNumber"
            label="Appartment Number"
            rules={[
              {
                required: true,
                message: 'Please enter Appartment Number',
              },
            ]}
          >
            <Input placeholder="Please enter Appartmenet Number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please enter First name',
              },
            ]}
          >
            <Input placeholder="Please First user name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please enter Last name',
              },
            ]}
          >
            <Input placeholder="Please Last user name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={props.prefixSelector}
              placeholder={'Enter Phone Number Here.'}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter Email Address',
              },
            ]}
          >
            <Input placeholder="Please enter Email Address" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
