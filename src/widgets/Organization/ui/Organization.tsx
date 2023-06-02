import { Breadcrumb, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router';
import { companyStore, CompanyType } from 'shared/stores/company/model/companyStore';
import { useTranslation } from 'react-i18next';
import { CompanyEvents } from 'widgets/CompanyEvents/indext';

export const Organization = observer(() => {
  const {companyId} = useParams()
  const [company, setCompany] = useState<CompanyType | null>(null);
  const navigate = useNavigate()
  const { t } = useTranslation('events')

  useEffect(() => {
    const loadCompany = async () => {
      const loadedCompany:any = await companyStore.getCompanyById(companyId);
      setCompany(loadedCompany);
    };
    loadCompany();
    return () => {
      setCompany(null); 
    }
  }, [companyId]);

  return (
    <div>
      {company ? (
        <><Breadcrumb>
          <Breadcrumb.Item onClick={()=> navigate('/')}>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Organizations</Breadcrumb.Item>
          <Breadcrumb.Item>{company.name}</Breadcrumb.Item>
        </Breadcrumb><div>
          <h1>{company.name}</h1>
          <p>ID: {company._id}</p>
          <p>Deleted: {company.is_deleted ? 'Yes' : 'No'}</p>
          <Tabs items={[
            {
              key: '1',
              label: t('events'),
              children: <CompanyEvents companyId={companyId} />,
            }
          ]}/>
        </div></>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
});