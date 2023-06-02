import React from 'react';
import {List} from 'antd'
export const Comments = () => {
  return (
    <List
      itemLayout='horizontal'
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            description='Ant Design, a design language for background applications, is refined by Ant UED Team'
          />
        </List.Item>
      )}
    />
  );
};
