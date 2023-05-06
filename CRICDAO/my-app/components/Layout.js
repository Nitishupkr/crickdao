import styles from '../styles/Home.module.css';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';

const Layout = ({ children }) => {
    return (
        <>
        <Meta />

            <div className={styles.container}>

                <Header />
                <div className={styles.main}>
                    {children}
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Layout