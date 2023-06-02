import React, { Key } from 'react';
import { Card, Divider, Image, List, Typography } from 'antd';
import { CampType } from 'shared/stores/camp/api/campApi';

const { Title, Paragraph } = Typography;

interface Props {
  camp: CampType;
}

export const CampInfo = ({ camp }: Props) => {
  return (
    <Card>
      <Title level={2}>{camp.name}</Title>
      <Paragraph>{camp.description}</Paragraph>
      <Image src={camp.icon_url} alt='Camp icon' width={100} preview={false} />
      <Image src={camp.img_url} alt='Camp image' width={100} preview={false} />
      <Divider>Zones</Divider>
      <List
        dataSource={camp.zone_ids}
        renderItem={(eachZone: string, index: Key) => (
          <List.Item key={index}>
            <Typography.Text>{eachZone}</Typography.Text>
          </List.Item>
        )}
      />
    </Card>
  );
};

