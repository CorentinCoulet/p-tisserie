import '../styles/login.scss';

const Login = () => (
    <form className="login">
        <label>
            Your email
            <input
            type="email"
            name="email"
            required
            />
        </label>
        <br />
        <label>
            Password
            <input
            type="password"
            name="password"
            required
            />
        </label>
        <br />
        <button type="submit">Log</button>
    </form>
)

export default Login;