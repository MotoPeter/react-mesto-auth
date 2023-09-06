//компонент подвала сайта
function Footer() {
	return (
		<footer className="footer">
			<p className="footer__copyright">
        //получение текущего года
				© {new Date().getFullYear()} Mesto Russia
			</p>
		</footer>
	);
}

export default Footer;
