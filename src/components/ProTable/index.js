import React from 'react';
import { Button, Card, Empty } from 'antd';
import ProTable from '@ant-design/pro-table';
import voidd from '@/assets/void.svg';

export default (props) => {
  if (props.dataSource && props.dataSource.length == 0) {
    return (
      <Card>
        <Empty
          image={voidd}
          imageStyle={{
            height: 300,
          }}
          description={<span>No Record Found for {props.title}.</span>}
        >
          <Button onClick={() => props.setDrawer(true)} type="primary">
            Create Now
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <ProTable
      columns={props.columns}
      dataSource={props.dataSource}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      showSorterTooltip={false}
      search={false}
      dateFormatter="string"
      headerTitle={props.title}
      pagination={{
        pageSize: 10,
        locale: 'en-US',
        showTotal: false,
      }}
      options={false}
      toolBarRender={props.toolBarRender}
    />
  );
};
