import css from "./Panel.module.scss";
import { useSidebar } from "../../store/ui/hooks";
import { useAppDispatch } from "../../store";
import { closeSidebar } from "../../store/ui/actions";
import icon2 from "../../assets/Profile.svg";
import { iconData } from "../../constants";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

function Panel() {
  const { open: sidebarIsOpen } = useSidebar();
  const dispatch = useAppDispatch()
  const node = useRef(null)
  useOnClickOutside(node, ()=>dispatch(closeSidebar()));

  
  return (
    <>
      <div className={css.icon_wrapper}>
        <div className={css.icon_item}>
          {iconData.map((item) => (
            <img
              key={item.img}
              className={css.icon}
              src={item.img}
              alt="Icon"
            />
          ))}
        </div>
      </div>
      <div ref={node} className={sidebarIsOpen ? css.active : css.menu_burger}>
        <div onClick={()=>dispatch(closeSidebar())} className={css.burger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={css.menu_author}>
          <img src={icon2} alt="author" />
          <div>
            <div className={css.autor_name}>Артем Иванов</div>
            <div className={css.author_auth}>Собственник</div>
          </div>
        </div>
        <div className={css.icon_items}>
          {iconData.map((item) => (
            <div key={item.img} className={css.icons}>
              <img className={css.icon} src={item.img} alt="Icon" />
              <div className={css.icon_title}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Panel;
