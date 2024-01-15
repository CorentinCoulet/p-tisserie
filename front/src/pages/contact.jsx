import '../styles/contact.scss';

const Contact = () => {
    return (
        <form className="contact">
            <label>
                Your email*
                <input
                type="email"
                name="email"
                required
            />
            </label>
            <br />
            <label>
                Nom*
                <input
                type="text"
                name="name"
                required
                />
            </label>
            <br />
            <label>
                Prenom*
                <input
                type="text"
                name="surname"
                required
                />
            </label>
            <label>
                Sujet
                <input
                type="text"
                name="message"
                required
                />
            </label>
            <label>
                Votre message
            </label>
            <textarea />
            <button type="submit">Login</button>
        </form>  
    )
}

export default Contact;