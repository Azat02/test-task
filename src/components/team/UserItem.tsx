import axios from "axios";
import { useRef, useState } from "react";
import { accessList } from "../../constants";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import AccessForm from "../Common/accessForm";
import Modal from "../Common/modal/Modal";
import { IUser } from "./Team";
import css from "./Team.module.scss";

function UserItem({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false);
  const [succes, setSucces] = useState(false);
  const [listIsOpen, setListIsOpen] = useState(false);
  const node = useRef(null);
  useOnClickOutside(node, () => setOpen(false));
  
  const [access, setAccess] = useState(
    accessList.reduce((acc: { [key: string]: boolean }, cur) => {
      if (user.permissions.find((item) => item === cur)) {
        acc[cur] = true;
      } else {
        acc[cur] = false;
      }
      return acc;
    }, {})
  );

  const handleDelete = async () => {
    setOpen(false);
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/${user.id}`
      );
      console.log(response.data);
    } catch (error) {}
    setSucces(true);
  };
  const closeWindow = () => {
    setSucces(false);
  };

  const updateUser = async (newAccess: { [key: string]: boolean }) => {
    setAccess(newAccess);
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, {
        ...user,
        permissions: Object.keys(newAccess).filter((item)=>newAccess[item]),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className={css.user}>
        <div className={css.member}>
          <img className={css.user_img} src={user.image} alt={user.name} />
        </div>
        <div className={css.user_detail}>
          <div className={css.user_data}>
            <div className={css.user_title}>{user.name}</div>
            <div className={css.user_email}>{user.email}</div>
          </div>
          <div className={css.user_rights}>
            {user.permissions.map((permission) => (
              <div key={permission} className={css.user_rights_item}>
                {permission}
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={css.user_change}
        >
          <span className={css.user_dots}></span>
          <span className={css.user_dots}></span>
          <span className={css.user_dots}></span>
        </div>
        <div ref={node} className={css.modal_change}>
          {open && (
            <div className={css.change_wrapper}>
              <div
                onClick={() => setListIsOpen(true)}
                className={css.change_detail}
              >
                Изменить права доступа
              </div>
              <div className={css.change_detail}>Отправить код повторно</div>
              <div onClick={handleDelete} className={css.change_delete}>
                Удалить
              </div>
            </div>
          )}
          {succes && (
            <Modal>
              <div className={css.send_text}>Пользователь успешно удален</div>
              <button onClick={closeWindow} className={css.send_btn}>
                Закрыть
              </button>
            </Modal>
          )}
          {
            <AccessForm
              onChange={(v) => updateUser(v)}
              access={access}
              isOpen={listIsOpen}
              setOpen={setListIsOpen}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default UserItem;
