import css from "./Team.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import UserItem from "./UserItem";
import Search from "./TeamHeader";

export interface IUser {
  name: string;
  email: string;
  permissions: string[];
  image: string;
  id: number;
}

function Team() {
  const [data, setData] = useState<IUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://localhost:3000/users");
        setData(response.data);
      } catch (error: any) {
        //todo
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={css.wrapper}>
      <div className={css.team}>
        <Search />
        <div>
          {data &&
            data.map((user: IUser) => (
              <UserItem user={user} key={user.email} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
