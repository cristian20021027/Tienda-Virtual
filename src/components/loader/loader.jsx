import styles from"./loader.module.css"
import logo from "../../../public/img/logo.png"
const Loader=()=>{
    return(
        <div className={styles.loadercontainer}>
            <div className={styles.logocontainer}>
                <div className={styles.logoglow}></div>
            <img src={logo} alt="Logo" className={styles.logo}/>
            </div>
            <div className={styles.loader}>
                <div></div>
            </div>
        </div>
    )
}
export default Loader;