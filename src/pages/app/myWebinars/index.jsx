import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@/components/ProTable';
import { useState } from 'react';
import { Button, Switch, Tabs } from 'antd';
import ScheduleWebinar from "../../../components/ScheduleWebinar";
const { TabPane } = Tabs;
export default function MyWebinars() {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Date and Time',
            dataIndex: 'dateTime',
        },
        {
            title: 'Organizer',
            dataIndex: 'organizer',
        },
        {
            title: 'Registrants',
            dataIndex: 'registrants',
        },
        {
            title: 'Meeting key',
            dataIndex: 'meetingKey',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
        },
    ];
    return (
        <PageHeaderWrapper>
            <Tabs defaultActiveKey="1" tabBarExtraContent={<ScheduleWebinar />}>
                <TabPane tab="Upcoming Webinars" key="1">
                    <ProTable
                        columns={columns}
                    // title={'Upcoming Webinars'}
                    // loading={}
                    // dataSource={}
                    // toolBarRender={() => [
                    // ]}
                    />
                </TabPane>
                <TabPane tab="Past Webinars" key="2">
                    <ProTable
                        columns={columns.slice(0,columns.length - 1)}
                    // title={'Upcoming Webinars'}
                    // loading={}
                    // dataSource={}
                    // toolBarRender={() => [
                    // ]}
                    />
                </TabPane>
            </Tabs>


        </PageHeaderWrapper>
    );
};