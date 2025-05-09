import styles from "../../styles/pages_styles/Home.module.css"
import Header from "../layout/Header";
function Home(){
    return(
        <div>
            <Header />
            <h1 className={styles.test}>Hello World</h1>
            </div>
    )
}

export default Home;