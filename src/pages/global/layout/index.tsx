import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PageALert from "../../../components/pageAlert";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import styles from "./layout.module.scss";
import useStore from "../../../store";
import { getSportFromSession } from "../../../utils/utils";
import { capitalize } from "lodash";
import Sports from "../../sports";

function Layout() {
  const { setTitle } = useStore();
  const sport = getSportFromSession();
  console.log(sport);

  useEffect(() => {
    setTitle(capitalize(sport.sport));
  }, [setTitle, sport.sport]);

  return (
    sport?.league ? (
      <main className={styles.page}>
        <Topbar className={styles.page__header} />
        <div className={styles.page__wrapper}>
          <Sidebar className={styles.page__sidebar} />
          <div className={styles.page__main}>
            <div className={styles.page__content}>
              <PageALert />
              <Suspense>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    ) : (
      <Sports />
    )
  );
}

export default Layout;
