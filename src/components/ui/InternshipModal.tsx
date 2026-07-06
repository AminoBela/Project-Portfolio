import { Trans, useTranslation } from 'react-i18next';
import { GraduationCap, Target, Mail } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import './InternshipModal.css';

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MISSION_KEYS = [
  'modal_internship_mission_1',
  'modal_internship_mission_2',
  'modal_internship_mission_3',
  'modal_internship_mission_4',
] as const;

export default function InternshipModal({ isOpen, onClose }: InternshipModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="internship-title" closeLabel={t('banner_close')}>
      <header className="internship__header">
        <span className="internship__badge">{t('modal_internship_badge')}</span>
        <h2 id="internship-title">{t('modal_internship_title')}</h2>
        <p className="internship__subtitle">{t('modal_internship_subtitle')}</p>
      </header>

      <dl className="internship__facts">
        <div>
          <dt>{t('modal_internship_start')}</dt>
          <dd>{t('about_internship_date')}</dd>
        </div>
        <div>
          <dt>{t('modal_internship_duration')}</dt>
          <dd>{t('modal_internship_duration_value')}</dd>
        </div>
        <div>
          <dt>{t('alternance_rhythm_label')}</dt>
          <dd>{t('alternance_rhythm_value')}</dd>
        </div>
        <div>
          <dt>{t('modal_internship_location')}</dt>
          <dd>{t('modal_internship_location_value')}</dd>
        </div>
      </dl>

      <section className="internship__block">
        <h3>
          <GraduationCap size={16} /> {t('modal_internship_mobility_title')}
        </h3>
        <p>
          <Trans i18nKey="modal_internship_mobility_desc" components={{ strong: <strong />, br: <br /> }} />
        </p>
      </section>

      <section className="internship__block">
        <h3>
          <Target size={16} /> {t('modal_internship_missions_title')}
        </h3>
        <ul className="internship__missions">
          {MISSION_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </section>

      <div className="internship__actions">
        <Button variant="primary" href="mailto:abelaliabendjafar@gmail.com">
          <Mail size={16} /> {t('banner_cta')}
        </Button>
        <Button
          href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Button>
      </div>
    </Modal>
  );
}
