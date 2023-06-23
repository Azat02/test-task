import React, { useMemo, useRef } from "react";
import { accessList } from "../../../constants";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import css from "./index.module.scss";

interface IProps {
  onChange: (access: { [key: string]: boolean }) => void;
  access: {
    [key: string]: boolean;
  };
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}

export default function AccessForm({
  onChange,
  access,
  isOpen,
  setOpen,
}: IProps) {
  const node = useRef(null);
  useOnClickOutside(node, () => setOpen(false));

  const allAreChecked = useMemo(() => {
    return Object.keys(access).every((item) => access[item]);
  }, [access]);

  return (
    <>
      {isOpen && (
        <div ref={node} className={css.list_wrapper}>
          <ul className={css.list_ul}>
            <li className={css.list_li}>
              <input
                id="allAccess"
                type="checkbox"
                checked={allAreChecked}
                onChange={() => {
                  onChange(
                    accessList.reduce(
                      (acc: { [key: string]: boolean }, cur) => {
                        acc[cur] = !allAreChecked;
                        return acc;
                      },
                      {}
                    )
                  );
                }}
              />
              <label htmlFor="allAccess">Все</label>
            </li>
            {accessList.map((item) => (
              <li key={item} className={css.list_li}>
                <input
                  id={item}
                  type="checkbox"
                  checked={access[item]}
                  onChange={() => {
                    const newAccess = {
                      ...access,
                      [item]: !access[item],
                    };
                    onChange(newAccess);
                  }}
                />
                <label htmlFor={item}>{item}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
