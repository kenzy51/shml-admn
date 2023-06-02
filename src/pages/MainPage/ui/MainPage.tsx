import { observer } from 'mobx-react-lite';
import { CompaniesComponent } from 'widgets/CompaniesComponent';
const MainPage = observer(() => {
  return (
    <div>
      <CompaniesComponent/>
    </div>
  )
});

export default MainPage;
