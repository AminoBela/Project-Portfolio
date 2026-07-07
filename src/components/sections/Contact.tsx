import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import { LinkedInIcon } from '../ui/BrandIcons';
import './Contact.css';

const EMAIL = 'abelaliabendjafar@gmail.com';
const PHONE_DISPLAY = '+33 7 52 07 89 99';
const PHONE_TEL = '+33752078999';

function CopyIndicator({ copied }: { copied: boolean }) {
  return (
    <span className="contact__action" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? 'check' : 'copy'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
        >
          {copied ? <Check size={15} className="contact__check" /> : <Copy size={15} />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Section id="contact" title={t('contact_title')}>
      <Reveal>
        <p className="contact__desc">
          {t('contact_desc_1')}
          <strong>{t('contact_desc_bold')}</strong>
          {t('contact_desc_2')}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="contact__grid">
          <li>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => copyToClipboard(EMAIL, 'email')}
              className="contact__item"
            >
              <Mail size={17} aria-hidden="true" />
              <span className="contact__info">
                <span className="contact__label">{t('contact_email_label')}</span>
                <span className="contact__value">{EMAIL}</span>
              </span>
              <CopyIndicator copied={copiedField === 'email'} />
            </a>
          </li>
          <li>
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={(e) => {
                e.preventDefault();
                copyToClipboard(PHONE_DISPLAY, 'phone');
              }}
              className="contact__item"
            >
              <Phone size={17} aria-hidden="true" />
              <span className="contact__info">
                <span className="contact__label">{t('contact_phone_label')}</span>
                <span className="contact__value">{PHONE_DISPLAY}</span>
              </span>
              <CopyIndicator copied={copiedField === 'phone'} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__item"
            >
              <LinkedInIcon size={17} />
              <span className="contact__info">
                <span className="contact__label">{t('contact_linkedin_label')}</span>
                <span className="contact__value">Amin Belalia</span>
              </span>
              <span className="contact__action" aria-hidden="true">
                <ArrowUpRight size={15} />
              </span>
            </a>
          </li>
          <li>
            <div className="contact__item contact__item--static">
              <MapPin size={17} aria-hidden="true" />
              <span className="contact__info">
                <span className="contact__label">{t('contact_location_label')}</span>
                <span className="contact__value">{t('contact_location_value')}</span>
              </span>
            </div>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
