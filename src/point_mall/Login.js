import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <p>
                        <label>아이디: </label>
                        <input type="text" name="username" id="username"></input>
                    </p>
                    <p>
                        <label>비밀번호: </label>
                        <input type="text" name="password" id="password"></input>
                    </p>
                    <button>로그인</button>
                </div>
            </div >
        );
    }
}

export default Login;