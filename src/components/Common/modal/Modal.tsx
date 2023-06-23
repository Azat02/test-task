import css from './Modal.module.scss'
import { ReactNode, useRef } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

interface ModalProps {
    children: ReactNode;
    onDismiss?:()=>void
  }

function Modal({ children ,onDismiss}: ModalProps): JSX.Element {
  const node = useRef(null)
  useOnClickOutside(node,onDismiss)

  return (
    <div  className={css.modal}>
        <div ref={node} className={css.modal_wrapper}>
            {children}
        </div>
    </div>
  )
}

export default Modal