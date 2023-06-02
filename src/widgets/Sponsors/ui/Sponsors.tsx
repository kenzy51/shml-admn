import { Row, Col, Card, Avatar, Button } from 'antd';
import { useState } from 'react';
import { CreateSponsor } from 'widgets/CreateSponsor';

export const Sponsors = ({event}:any) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div>
      <h2>Sponsors</h2>
      <Button onClick={()=> setIsVisible(true)} type='primary' style={{marginBottom:'3%'}}> Создать спонсора</Button>
      <Row gutter={[16, 16]}>
        {event.sponsors.map((sponsor:any, index:any) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card cover={<img src={sponsor.picture.url} alt={sponsor.picture.title} />}>
              <Card.Meta
                title={sponsor.name}
                description={
                  <>
                    <p>Instagram: {sponsor.contacts.instagram}</p>
                    <p>Email: {sponsor.contacts.email}</p>
                    <p>Phone: {sponsor.contacts.phone}</p>
                  </>
                }
                avatar={<Avatar src={sponsor.picture.url} />}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <CreateSponsor isVisible={isVisible} setIsVisible={setIsVisible}/>
    </div>
  );
};
