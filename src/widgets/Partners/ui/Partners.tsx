import { Button, notification, Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { partnerStore } from 'shared/stores/partners/model/partnerStore';
import { CreatePartner } from 'widgets/CreatePartner';
import { DeleteOutlined } from '@ant-design/icons';
import { PartnerType } from 'shared/stores/partners/api/partnersApi';
import { AssignTag } from 'widgets/AssignTagToPartner';
import { AddService } from 'widgets/AddServiceToPartner';

import { AppLink } from 'shared/ui/AppLink/AppLink';

import cls from './Partners.module.scss';

export const Partners = observer(() => {
  const [visible, setVisible] = useState(false);
  const [assign, setAssign] = useState(false);
  const [addService, setAddService] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  useEffect(() => {
    partnerStore.getAllPartners();
  }, []);

  const deletePartner = (partner: PartnerType) => {
    try {
      partnerStore.deletePartner(partner._id);
      notification.success({
        message: `${partner.title} была удалена успешно`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: PartnerType) => (
        <AppLink to={`../../partner/${record._id}`}>
          <span style={{ backgroundColor: record.background_color }}>
            {text}
          </span>
        </AppLink>
      ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Иконка',
      dataIndex: 'icon_url',
      key: 'icon_url',
      render: (text: string) => <img src={text} width={30} alt='Icon' />,
    },
    {
      title: '',
      key: 'actions',
      render: (record: PartnerType) => (
        <div className={cls.btns}>
          <DeleteOutlined onClick={() => deletePartner(record)} />
          <Button onClick={() => setAssign(true)}>Добавить тэг</Button>
          <Button onClick={() => setAddService(true)}>Добавить сервис</Button>
        </div>
      ),
    },
  ];

  const partners = partnerStore.partners.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <h2>Партнеры</h2>
      <div className={cls.buttons}>
        <Button onClick={() => setVisible(true)}>Создать</Button>
      </div>
      <CreatePartner visible={visible} setVisible={setVisible} />
      <AssignTag visible={assign} setVisible={setAssign} />
      <AddService visible={addService} setVisible={setAddService} />
      <div className={cls.wrapper}>
        <Table
          dataSource={partners}
          columns={columns}
          rowKey='_id'
          pagination={false}
        />
        <Pagination
          style={{marginTop:'1%'}}
          current={currentPage}
          pageSize={pageSize}
          total={partnerStore.partners.length}
          showSizeChanger
          onChange={(page) => setCurrentPage(page)}
          onShowSizeChange={(current, size) => setPageSize(size)}
        />
      </div>
    </div>
  );
});
``
