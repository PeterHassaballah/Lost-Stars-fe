import Link from 'next/link';

const Header = () => {
    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <Link href="/" style={linkStyle}>Home</Link>
                <Link href="/about" style={linkStyle}>About</Link>
                <Link href="/contact" style={linkStyle}>Contact</Link>
            </nav>
        </header>
    );
};

const headerStyle = {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff'
};

const navStyle = {
    display: 'flex',
    gap: '15px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default Header;
