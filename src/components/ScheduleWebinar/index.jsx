import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class ScheduleWebinar extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer}>
                    Schedule a Webinar
                </Button>
                <Drawer
                    title="Schedule a Webinar"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[{ required: true, message: 'Please enter a title for your Webinar' }]}
                                >
                                    <Input placeholder="Please enter a title for your Webinar" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="dateTime"
                                    label="DateTime"
                                    rules={[{ required: true, message: 'Please choose a date and time' }]}
                                >
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        showTime={{ format: 'HH:mm' }}
                                        placeholder="Please choose a date and time"
                                    // getPopupContainer={trigger => trigger.parentElement}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="duration"
                                    label="Duration"
                                    rules={[{ required: true, message: 'Please enter the duration of the Webinar' }]}
                                >
                                    <Select placeholder="Please enter the duration of the Webinar">
                                        <Option value="30 mins">30 mins</Option>
                                        <Option value="1 hour">1 hour</Option>
                                        <Option value="1:30 hour">1:30 hours</Option>
                                        <Option value="2 hour">2 hours</Option>
                                        <Option value="2:30 hour">2:30 hours</Option>
                                        {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, i) =>
                                            <Option key={i} value={item + " hours"}>{item + " hours"}</Option>

                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="repeatType"
                                    label="Repeat Type"
                                    rules={[{ required: true, message: 'Please choose a Repeat Type' }]}
                                >
                                    <Select placeholder="Please choose a Repeat Type" >
                                        <Option value="once">Once</Option>
                                        <Option value="daily">Daily</Option>
                                        <Option value="weekly">Weekly</Option>
                                        <Option value="monthly">Monthly</Option>

                                    </Select>
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please entere a description for your Webinar',
                                //     },
                                // ]}
                                >
                                    <Input.TextArea rows={3} placeholder="Please entere a description for your Webinar" />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Drawer>
            </>
        );
    }
}
