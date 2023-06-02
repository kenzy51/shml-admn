import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { companyStore, CompanyType } from 'shared/stores/company/model/companyStore';
import { Popconfirm, Card, Button, notification, Input, Pagination } from 'antd';
import { companyApi } from 'shared/stores/company/api/companyApi';
import cls from './Companies.module.scss';

export const CompaniesList = observer(() => {
  const [editingCompanyId, setEditingCompanyId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const innerHeight = window.innerHeight >= 900 ? 6 : 4;

  const pageSize = innerHeight;

  useEffect(() => {
    companyStore.getCompanies();
  }, []);

  const handleDelete = async (id: string, name?: string) => {
    try {
      await companyApi.deleteCompany(id, { is_deleted: true });
      companyStore.removeCompany(id);
      notification.success({
        message: `Компания ${name} была успешно удалена`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (company: CompanyType, newName: string) => {
    try {
      await companyApi.updateCompany(company._id, { name: newName });
      companyStore.updateCompany(company, newName);
      setEditingCompanyId('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCompanyId('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const companiesToRender = companyStore.companies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const renderCard = (company: CompanyType) => {
    if (editingCompanyId === company._id) {
      return (
        <Card key={company._id} className={cls.card}>
          <Input
            type='text'
            defaultValue={company.name}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit(company, e.currentTarget.value);
              } else if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
          />
          <div className={cls.buttons}>
            <Button danger onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button
              type='primary'
              onClick={() => handleEdit(company, (document.activeElement as HTMLInputElement)?.value)}
            >
              Save
            </Button>
          </div>
        </Card>
      );
    } else {
      return (
        <Card key={company._id} title={`Компания: ` + company.name} className={cls.card}>
          <div className={cls.buttons}>
            <Button onClick={() => setEditingCompanyId(company._id)}>Edit</Button>
            <Popconfirm
              title='Вы уверены что хотите удалить данную компанию?'
              onConfirm={() => handleDelete(company._id, company.name)}
            >
              <Button type='primary' danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </Card>
      );
    }
  };

  return (
    <><div className={cls.wrapper}>
      {companiesToRender.map((company) => renderCard(company))}
    </div><Pagination
      className={cls.pagination}
      current={currentPage}
      pageSize={pageSize}
      total={companyStore.companies.length}
      onChange={handlePageChange} /></>
  );
});

