import React, { useState } from "react";
import Modal from "../Common/modal/Modal";
import css from "./Team.module.scss";
import cross from "../../assets/cross.svg";
import down from "../../assets/down.svg";
import axios from "axios";
import AccessForm from "../Common/accessForm";
import { accessList } from "../../constants";
import { useAppDispatch } from "../../store";
import { openSidebar } from "../../store/ui/actions";

function Search() {
  const [invite, setInvite] = useState(false);
  const [listIsOpen, setListIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [send, setSend] = useState(false)
  const dispatch = useAppDispatch()
  const [access, setAccess] = useState(
    accessList.reduce((acc: { [key: string]: boolean }, cur) => {
      acc[cur] = false;
      return acc;
    }, {})
  );

  const handlePostRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users',  {
        "name": "Аzat",
        "email": inputValue,
        "permissions": 
          Object.keys(access).filter((item) => access[item])
        ,
        "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        id:Date.now()
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setInvite(false);
    setSend(true)
  };

  const closeWindow = () => {
    setSend(false)
  }
  return (
    <div>
      <div className={css.search}>
        <div className={css.menu}>
          <div onClick={()=>dispatch(openSidebar({data:null, open:true}))} className={css.burger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {
            
          }
          <div className={css.menu_title}>Права доступа</div>
        </div>
        <div className={css.team_title}>Команда</div>
        <input
          className={css.team_input}
          type="text"
          placeholder="Поиск по Email"
        />
        <button onClick={() => setInvite(true)} className={css.team_btn}>
          Добавить пользователя
        </button>
        {invite && (
          <Modal onDismiss={() => setInvite(false)}>
            <div onClick={() => setInvite(false)} className={css.close_window}>
              <img src={cross} alt="Close" />
            </div>
            <div className={css.invite}>Отправьте приглашение</div>
            <input
              className={css.window_input}
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <div onClick={() => setListIsOpen(true)} className={css.acces}>
              <div className={css.acces_title}>Выберите права доступа</div>
              <img src={down} alt="" />
              <AccessForm onChange={(v)=>setAccess(v)} access={access} isOpen={listIsOpen} setOpen={setListIsOpen}/>
       
            </div>
            <button type='submit' onClick={handlePostRequest} className={css.send_btn}>Отправить приглашение</button>
          </Modal>
        )}
        {
          send && (
            <Modal>
              <div className={css.send_text}>Приглашение отправлено на почту <br /> {inputValue}</div>
              <button onClick={closeWindow} className={css.send_btn}>Закрыть</button>
            </Modal>
          )
        }
      </div>
    </div>
  );
}

export default Search;
