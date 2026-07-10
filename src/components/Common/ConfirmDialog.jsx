import Modal from './Modal';
import TextButton from './TextButton';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger'
}) => {
  const footer = (
    <>
      <TextButton onClick={onClose}>
        {cancelLabel}
      </TextButton>
      <TextButton variant={variant} onClick={onConfirm}>
        {confirmLabel}
      </TextButton>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      maxWidth="400px"
    >
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        {message}
      </p>
    </Modal>
  );
};

export default ConfirmDialog;
