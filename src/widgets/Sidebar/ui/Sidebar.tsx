import { ReactNode, useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { ButtonSize } from 'shared/ui/Button/types';
import { useTranslation } from 'react-i18next';
import { SidebarProps } from './types';
import SelectLanguage from 'shared/ui/selectLanguages/SelectLanguage';
import { Menu, MenuItemProps } from 'antd';
import { companyStore } from 'shared/stores/company/model/companyStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import { clsx } from 'clsx';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { NotificationOutlined, ShopOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { AppLinkTheme } from 'shared/ui/AppLink/types';
import { RoutePath } from 'app/providers/router/config/routeConfig';

import cls from './Sidebar.module.scss';

export const Sidebar = observer(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [companyMenuItems, setCompanyMenuItems] = useState([]);
  const { t } = useTranslation('main');
  const navigate = useNavigate();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    children?: ReactNode,
    type?: 'group' | any,
    companyId?:string
  ): any {
    return {
      key,
      children,
      label,
      type,
      onClick: ()=> {
        if(companyId && navigate){
          navigate(`/organization/${companyId}`)
        }
      }
    } as MenuItemProps;
  }
  useEffect(() => {
    const fetchCompanies = async () => {
      await companyStore.getCompanies();
      const companies = companyStore.companies.filter((company) => !company.is_deleted);
      const companyMenuItems: any = companies.map((company) =>
        getItem(
          company.name,
          company._id,
          null,
          null,
          company._id
        )
      );
      setCompanyMenuItems(companyMenuItems);
    };
    fetchCompanies();
  }, []);

  const items: any[] = [
    getItem(
      `${collapsed ? '' : t('companies')}`, 
      'sub4', 
      companyMenuItems,
      null,)
  ];

  return (
    <div
      className={clsx(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <Button
        data-testid='sidebar-toggle'
        onClick={onToggle}
        className={cls.collapseBtn}
        size={ButtonSize.L}>
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.items}>
        <div className={cls['main']} onClick={() => navigate('/')}  style={{cursor:'pointer'}}>
          <ShopOutlined
            onMouseEnter={(e: Event | any) => e.target.style.color = 'blue'}
            onMouseLeave={(e: Event | any) => e.target.style.color = 'black'}/>
          <h4 style={{marginLeft:'1.5%', marginBottom:'-1%'}}>События</h4>
          {/* <Menu style={collapsed ? {width:'20px' }: {width:'150px'}} mode='vertical' items={items}  /> */}
        </div >
        <div className={cls['menuItems']} style={{marginTop:'4%'}}>
          {/* <AppLink to={'/users'} className={cls.linkItem}>
            <div className={cls.chat} style={{marginTop:'6%'}}>
              <UserOutlined />
              {collapsed ? '' : t('users')}
            </div>
          </AppLink> */}
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePath.USER_NOTIFICATION}
            className={cls.links}
          >
            <NotificationOutlined />
            {collapsed ? '' : t('userNotification')}
          </AppLink>
        </div>
      </div>
      <div className={cls.select}>
        <SelectLanguage collapsed={collapsed} />
      </div>
    </div>
  );
});
