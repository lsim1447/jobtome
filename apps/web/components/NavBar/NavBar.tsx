import Link from "next/link";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <Link href="/">MyStore</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/create-product">Add Product</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
