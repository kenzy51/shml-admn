import { observer} from 'mobx-react-lite'
import { PartnerDetail } from 'widgets/PartnerDetail';


const PartnerPage = observer(() => {
  return (
    <div>
      <PartnerDetail/>
    </div>
  );
});

export default PartnerPage;
