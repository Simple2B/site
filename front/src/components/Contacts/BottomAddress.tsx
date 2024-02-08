import classes from './Contacts.module.scss';
import { SocialLinks } from './SocialLinks';
import { address, germanyAddress } from '@/types/contacts';

export const BottomAddress = ({ isGermany }: { isGermany: boolean }) => {
  return (
    <address className={classes.contacts__address}>
      {isGermany ? (
        <>
          <p>{germanyAddress.street}</p>
          <p>{germanyAddress.city}</p>
          <p className={classes.address__street}>{germanyAddress.country}</p>
        </>
      ) : (
        <>
          <div className={classes.address__city}>
            <strong>{address.city}</strong>
          </div>
          <p className={classes.address__street}>{address.street}</p>
        </>
      )}

      <SocialLinks />
    </address>
  );
};
