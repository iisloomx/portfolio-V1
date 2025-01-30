import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
  padding: 6rem 0;
  background: var(--background);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: var(--text);
  margin-bottom: 3rem;
  text-align: center;
`;

const ContactForm = styled(motion.form)`
  max-width: 600px;
  margin: 0 auto;
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  box-shadow: 0 4px 6px var(--shadow);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--card-border);
  border-radius: 6px;
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--card-border);
  border-radius: 6px;
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-light);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Alert = styled(motion.div)`
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  background: ${props => props.success ? 'var(--success-bg, #dcfce7)' : 'var(--error-bg, #fee2e2)'};
  color: ${props => props.success ? 'var(--success-text, #166534)' : 'var(--error-text, #991b1b)'};
  border: 1px solid ${props => props.success ? 'var(--success-border, #bbf7d0)' : 'var(--error-border, #fecaca)'};
`;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    try {
      await emailjs.sendForm(
        'service_your_service_id', // Replace with your EmailJS service ID
        'template_your_template_id', // Replace with your EmailJS template ID
        form.current,
        'your_public_key' // Replace with your EmailJS public key
      );

      setAlert({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });
      form.current.reset();
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </SectionTitle>
        <ContactForm
          ref={form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {alert && (
            <Alert
              success={alert.type === 'success'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {alert.message}
            </Alert>
          )}
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="user_name"
              required
              placeholder="Your name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="user_email"
              required
              placeholder="Your email"
            />
          </FormGroup>
          <FormGroup>
            <Label>Message</Label>
            <TextArea
              name="message"
              required
              placeholder="Your message"
            />
          </FormGroup>
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
          </SubmitButton>
        </ContactForm>
      </Container>
    </ContactSection>
  );
};

export default Contact;
