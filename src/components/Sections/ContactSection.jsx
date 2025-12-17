import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';
import Button from '../UI/Button';

const ContactSection = () => {
    return (
        <motion.section
            id="contact"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="terminal-section contact-section"
        >
            <div className="container">
                <motion.h2 variants={childVariants} className="terminal-command">
                    &gt; Contact
                </motion.h2>
                <motion.p variants={childVariants} className="contact-intro">
                    Une idée, un projet, une opportunité ? N'hésitez pas à me contacter.
                </motion.p>
                <motion.div variants={childVariants} className="contact-buttons">
                    <Button href="mailto:abelaliabendjafar@gmail.com" primary large>
                        <i className="fas fa-envelope"></i> Envoyer un email
                    </Button>
                    <Button href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227" secondary large>
                        <i className="fab fa-linkedin"></i> Mon LinkedIn
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ContactSection;
